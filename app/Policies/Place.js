'use strcit'

class Place {

  static create(user) {
    debugger
    return user.is_superadmin || user.is_active
  }

  static edit(user, place) {
    return user.is_superadmin || user.id === place.admin_id
  }

  static delete(user, place) {
    return user.is_superadmin || user.id === place.admin_id
  }
}

module.exports = Place
