'use strcit'

class Place {

  static create(user) {
    return user.superadmin || user.active
  }

  static edit(user, place) {
    return user.superadmin || user.id === place.admin_id
  }

  static delete(user, place) {
    return user.superadmin || user.id === place.admin_id
  }
}

module.exports = Place
