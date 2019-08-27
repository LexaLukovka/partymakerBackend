'use strcit'

class Entertainment {

  static create(user) {
    return user.is_superadmin
  }

  static edit(user) {
    return user.is_superadmin
  }

  static delete(user) {
    return user.is_superadmin
  }
}

module.exports = Entertainment
