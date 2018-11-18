const { ServiceProvider } = require('@adonisjs/fold')
const Backup = require('../src/Backup')

class BackupProvider extends ServiceProvider {
  register() {
    this.app.singleton('Providers/Backup', () => {
      const Config = this.app.use('Adonis/Src/Config')
      return new Backup(Config)
    })

  }

  boot() {
    // optionally do some initial setup
  }
}

module.exports = BackupProvider
