'use strcit'

class Event {

  static create(user) {
    return user.superadmin || user.active
  }

  static edit(user, event) {
    return user.superadmin || user.active || user.id === event.admin_id
  }

  static delete(user, event) {
    return user.superadmin || user.active || user.id === event.admin_id
  }
}

module.exports = Event
