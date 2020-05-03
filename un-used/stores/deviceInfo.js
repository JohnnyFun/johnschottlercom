import {writable} from 'svelte/store'

const store = writable(getDeviceInfo())
console.log(store, store.set)
window.addEventListener('resize', () => store.set(getDeviceInfo())) 

function getDeviceInfo() {
  return {
    width: window.innerWidth
  }
}

export default store