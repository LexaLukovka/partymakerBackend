'use strcit'

class Message {

  static create(user) {
    return user.is_superadmin || user.is_active
  }

  static edit(user, message) {
    return user.is_superadmin || user.id === message.user_id
  }

  static delete(user, message) {
    return user.is_superadmin || user.id === message.user_id
  }
}

module.exports = Message
