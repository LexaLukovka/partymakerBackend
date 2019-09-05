'use strict'

const epocthaAPI = require('epochta-client')


class Sms {
  constructor(Config) {
    this.Config = Config
    this.client = epocthaAPI({
      publicKey: Config.get('sms.publicKey'),
      privateKey: Config.get('sms.privateKey'),
    })
  }

  send({ sender = this.Config.get('sms.sender'), text, phone }) {
    this.client.sendSMS({ sender, text, phone })

    return this
  }
}

module.exports = Sms
