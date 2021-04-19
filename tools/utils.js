const { readdir } = require('fs').promises
const { resolve } = require('path')

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(dirents.map((dirent) => {
    const res = resolve(dir, dirent.name)
    return dirent.isDirectory() ? getFiles(res) : res
  }))
  return Array.prototype.concat(...files)
}

// recursively get all files in the given dir
module.exports = {
  getFiles
}