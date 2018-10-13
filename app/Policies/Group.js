'use strcit'

class Group {

  static create(user) {
    return user.admin
  }

  static edit(user, group) {
    return user.admin || user.id === group.admin_id
  }

  static delete(user, group) {
    return user.admin || user.id === group.admin_id
  }
}

module.exports = Group
