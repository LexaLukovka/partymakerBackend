'use strcit'

class Room {

  static create(user) {
    return user.superadmin || user.active
  }

  static edit(user, room) {
    return user.superadmin || user.id === room.admin_id
  }

  static delete(user, place) {
    return user.superadmin || user.id === place.admin_id
  }
}

module.exports = Place
