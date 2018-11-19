/* eslint-disable import/no-unresolved,import/no-extraneous-dependencies */
const autoBind = require('auto-bind')
const NE = require('node-exceptions')
const fs = require('fs')
const uniqid = require('uniqid')

class Backup {
  constructor(Config) {
    autoBind(this)
    this.json = {}
    this.path = Config.get('backup.json.path')
    this.currentTable = null
  }

  _readFile(name) {
    const file = `${this.path}/${name}.json`

    if (fs.existsSync(file)) {
      this.json = JSON.parse(fs.readFileSync(file))
    }
  }

  table(name) {
    this._readFile(name)
    this.currentTable = name
    return this
  }

  set(data, key = uniqid()) {
    this.json = {
      ...this.json,
      [key]: data
    }
    this._save()
    return key
  }

  get(key) {
    return this.json[this.currentTable][key]
  }

  remove(key) {
    delete this.json[key]
    this._save()
  }

  _save() {
    if (!this.currentTable) {
      throw NE.RuntimeException('currentTable is empty. Please set table() value before using set() or get()')
    }
    const file = `${this.path}/${this.currentTable}.json`
    return fs.writeFileSync(file, JSON.stringify(this.json), 'utf8')
  }

}

module.exports = Backup
