/* eslint-disable func-names */
const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersRegistered(() => {
  /**
   * extends Response object
   * adds custom response presets
   */
  require('./extend/Response')

  /**
   * extends Validator object
   * adds custom validations rules
   */
  require('./extend/Validator')
})

hooks.after.providersBooted(() => {
  const User = use('App/Models/User')
  const Validator = use('Validator')

  const emailExistsFn = async (data, field, message, args, get) => {
    const value = get(data, field)
    if (!value) return

    const user = await User.findBy({ email: data.email })
    if (!user) throw message
  }

  Validator.extend('emailExists', emailExistsFn)
})
