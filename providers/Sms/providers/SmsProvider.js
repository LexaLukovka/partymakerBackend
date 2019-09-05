const { ServiceProvider } = require('@adonisjs/fold')


class SmsProvider extends ServiceProvider {
  register() {
    this.app.singleton('Adonis/Addons/Sms', () => {
      const Config = this.app.use('Adonis/Src/Config')
      return new (require('../src/Sms'))(Config)
    })
  }

  boot() {

  }
}

module.exports = SmsProvider

