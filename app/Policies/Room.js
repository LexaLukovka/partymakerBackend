'use strcit'

class Room {

  static viewAll(user) {
    return user.is_superadmin
  }

  static create(user) {
    return user.is_superadmin || user.is_active
  }

  static edit(user, room) {
    return user.is_superadmin || user.id === room.admin_id
  }

  static removeGuest(user, room) {
    return room.contains(user)
  }

}

module.exports = Room
