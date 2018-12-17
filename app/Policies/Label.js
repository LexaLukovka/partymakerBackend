'use strcit'

class Label {

  static create(user) {
    return user.superadmin
  }

  static edit(user, place) {
    return user.superadmin || user.id === place.admin_id
  }

  static delete(user, place) {
    return user.superadmin || user.id === place.admin_id
  }
}

module.exports = Label
