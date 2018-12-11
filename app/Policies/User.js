'use strcit'

class User {

  static create(user) {
    return user.superadmin
  }

  static edit(user, currentUser) {
    return user.superadmin || user.id === currentUser.id
  }

  static delete(user, currentUser) {
    return user.superadmin || user.id === currentUser.id
  }
}

module.exports = User
