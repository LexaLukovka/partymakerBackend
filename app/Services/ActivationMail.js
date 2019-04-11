const Mail = use('Mail')
const Env = use('Env')

class ActivationMail {

  _generateLink() {
    const IS_DEV = Env.get('NODE_ENV') !== 'production'
    return IS_DEV ? Env.get('FRONTEND_URL') : Env.get('APP_URL')
  }

  _makeActivationLink(token) {
    const base = this._generateLink(token)
    return `${base}/auth/activate/${token}`
  }

  async send({ user, token }) {
    const data = {
      name: user.name,
      link: this._makeActivationLink(token)
    }

    await Mail.send('emails.welcome', data, (message) => {
      message
        .to(user.email)
        .from('activation@partymaker.zp.ua')
        .subject('Please activate your account!')
    })
  }
}

module.exports = new ActivationMail()
