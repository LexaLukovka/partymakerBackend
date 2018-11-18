/* eslint-disable import/no-unresolved,import/no-extraneous-dependencies */
const autoBind = require('auto-bind')
const NE = require('node-exceptions')
const fs = require('fs')
const { promisify } = require('util')
const uniqid = require('uniqid')

const writeFile = promisify(fs.writeFile)

class Backup {

  constructor(Config) {
    autoBind(this)
    this.path = Config.get('backup.json.path')
    this._readFile()
  }

  _readFile() {
    this.json = JSON.parse(fs.readFileSync(this.path))
  }

  set(data, key = uniqid()) {
    this.json[key] = data
    this._save()
    return key
  }

  get(key) {
    return this.json[key]
  }

  remove(key) {
    delete this.json[key]
    this._save()
  }

  _save() {
    return writeFile(this.path, JSON.stringify(this.json), 'utf8')
  }

}

module.exports = Backup
