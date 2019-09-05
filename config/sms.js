const Env = use('Env')

module.exports = {
  sender: 'Partymaker',
  publicKey: Env.get('EPOCHTA_SMS_PUBLIC_KEY'),
  privateKey: Env.get('EPOCHTA_SMS_PRIVATE_KEY'),
}
