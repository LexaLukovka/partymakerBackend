const Mail = use('Mail')
const Env = use('Env')

class PasswordResetMail {

  _generateLink() {
    const IS_DEV = Env.get('NODE_ENV') !== 'production'
    return IS_DEV ? Env.get('FRONTEND_URL') : Env.get('APP_URL')
  }

  _makeResetPasswordLink(token) {
    const base = this._generateLink(token)
    return `${base}/auth/password/reset/${token}`
  }

  async send({ email, token }) {
    const data = { email, link: this._makeResetPasswordLink(token) }

    await Mail.send('emails.forgot', data, (message) => {
      message
        .to(email)
        .from('password_reset@partymaker.zp.ua')
        .subject('Click the link to reset password!')
    })
  }
}

module.exports = new PasswordResetMail()
