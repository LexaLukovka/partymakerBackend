const Mail = use('Mail')
const Env = use('Env')

class ActivationMail {

  _generateLink(token) {
    const IS_DEV = Env.get('NODE_ENV') !== 'production'
    const base = IS_DEV ? Env.get('APP_URL') : Env.get('FRONTEND_URL')

    return `${base}/auth/activate/${token}`
  }

  _generateLinkForgotPassword(token) {
    const IS_DEV = Env.get('NODE_ENV') !== 'production'
    const base = IS_DEV ? Env.get('APP_URL') : Env.get('FRONTEND_URL')

    return `${base}/auth/resetPassword/${token}`
  }


  async send({ user, token }) {
    const data = {
      name: user.name,
      link: this._generateLink(token)
    }

    await Mail.send('emails.welcome', data, (message) => {
      message.to(user.email).from('activation@partymaker.zp.ua').subject('Please activate your account!')
    })
  }

  async sendForgotPassword({ email, token }) {
    const data = {
      email,
      link: this._generateLinkForgotPassword(token)
    }

    await Mail.send('emails.forgotPassword', data, (message) => {
      message.to(email).from('activation@partymaker.zp.ua').subject('Please confirm your email!')
    })
  }
}

module.exports = new ActivationMail()
