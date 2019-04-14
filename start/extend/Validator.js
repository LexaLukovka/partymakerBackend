const Validator = use('Validator')
const Database = use('Database')
const User = use('App/Models/User')

const notEmptyFn = async (data, field, message, args, get) => {
  const value = get(data, field)

  const [table, column] = args
  const row = await Database.table(table).where({ [field]: value, [column]: null }).first()

  if (row) {
    if (message) throw message
    throw `Column ${column} should't be empty in row where ${field}: ${value} in table ${table} `
  }
}


const existsFn = async (data, field, message, args, get) => {
  const value = get(data, field)
  if (!value) {
    /**
     * skip validation if value is not defined. `required` rule
     * should take care of it.
     */
    return
  }

  const [table, column] = args
  const row = await Database.table(table).where(column, value).first()

  if (!row) {
    throw message
  }
}

const emailExistsFn = async (data, field, message, args, get) => {
  const value = get(data, field)
  if (!value) return

  const user = await User.findBy({ email: data.email })
  if (!user) throw message
}

Validator.extend('emailExists', emailExistsFn)

Validator.extend('exists', existsFn)

Validator.extend('notEmpty', notEmptyFn)
