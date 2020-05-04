/**
 * format function comes from http://stackoverflow.com/a/18405800
 */
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

/**
 * Determines if the given object is of type string
 */
function isString(obj) {
    return Object.prototype.toString.call(obj) == '[object String]';
}

function isObject(obj) {
    // http://jsperf.com/isobject4
    return obj !== null && typeof obj === 'object';
}

function isFunc(obj) {
    return typeof obj === 'function';
}

/**
 * Get a random number between min/max
 */
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Recursively copies the properties of an object
 * Note that I don't simply serialize/deserialize...because I wanted to write a recursive func--actually didn't really look into why not use JSON.stringify/parse to get 'er done...TODO...
 */
function copy (obj) {
	// if (Utils.isDate(obj)) {
		// return new Date(obj.getTime());
	// } else if (Utils.isRegExp(obj)) {
		// var result = new RegExp(obj.source, obj.toString().match(/[^\/]*$/)[0]);
		// result.lastIndex = obj.lastIndex;
		// return result;
	//} else 
	if (Array.isArray(obj)) {
		var copyArray = [];
		for (var i = 0, len = obj.length; i < len; i++) {
			copyArray.push(copy(obj[i]));
		}
		return copyArray;
	} else if (isObject(obj)) {
		var copyObj = {};
		for (var prop in obj) {
			copyObj[prop] = copy(obj[prop]);
		}
		return copyObj;
	}
	return obj;
}

/**
 * Given a key, provide a way to interface with a locally stored array, as if it's a document db collection
 */
var db = {
    /**
     * Used to determine a unique id for any given record to the db
     */
    seedId: 0,
    newId: function () {
        return ++this.seedId;
    },

    /**
     * Returns all items in this stored collection
     * @returns {Array}
     */
    get: function (key) {
        return window.localStorage[key] != null ? JSON.parse(window.localStorage[key]) : [];
    },

    /** 
     * If type is string, do string comparison, otherwise compare "id" column if exists
     * @returns {foundItem} or null
     */
    getById: function (key, id) {
        var matches = this.get(key).filter(function (item) { return this._idBelongsToItem(id, item); }.bind(this));
        return matches.length > 0 ? matches[0] : null;
    },

    /**
     * Sets the given collection to the given array value
     */
    set: function (key, items) {
        window.localStorage[key] = JSON.stringify(items);
    },

    /**
     * Adds the given item to the collection, if it doesn't already exist within
     * Note that an "id" property is automatically added, unless it already exists or if the item is not an object
     * @returns {bool} indicating whether the item was added or not
     */
    add: function (key, item) {
        var exists = this.getById(key, item) != null;
        if (exists) {
            return false;
        }
        var items = this.get(key);
        if (isObject(item) && item.id == undefined) {
            item.id = db.newId();
        }
        items.push(item);
        this.set(key, items)
        return true;
    },

    /**
     * Finds the given item in the collection and deletes it--algorithm basically sets 
     * the collection value to be every item, except the given item
     * @returns {bool} indicating whether the item was deleted or was already deleted
     */
    remove: function (key, id) {
        var items = this.get(key);
        var newItems = [];
        var length = items.length;
        var currentItem;
        id = /\d+/.test(id) ? parseInt(id) : id; //if id is an integer, convert accordingly. Otherwise leave it the fuck alone!
        for (i = 0; i < length; i++) {
            currentItem = items[i];
            if (!this._idBelongsToItem(id, currentItem)) {
                newItems.push(currentItem);
            }
        }
        this.set(key, newItems);
    },

    /**
    * @returns {bool} indicating whether the two given items are the same
    */
    _idBelongsToItem: function (id, item) {
        return item === id || (item.id != null && item.id === id);
    }
};