'use strcit'

class Room {

  static create(user) {
    return user.is_superadmin || user.is_active
  }

  static edit(user, room) {
    return user.is_superadmin || user.id === room.admin_id
  }

  static delete(user, room) {
    return user.is_superadmin || user.id === room.admin_id
  }

  static removeGuest(user, room) {
    return user.id === room.admin_id
  }

}

module.exports = Room
