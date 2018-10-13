'use strcit'

class User {

  static create(user) {
    return user.admin
  }

  static edit(user, currentUser) {
    return user.admin || user.id === currentUser.id
  }

  static delete(user, currentUser) {
    return user.admin || user.id === currentUser.id
  }
}

module.exports = User
