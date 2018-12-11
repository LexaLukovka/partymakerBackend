'use strcit'

class Event {

  static create(user) {
    return user.superadmin
  }

  static edit(user, event) {
    return user.superadmin || user.id === event.admin_id
  }

  static delete(user, event) {
    return user.superadmin || user.id === event.admin_id
  }
}

module.exports = Event
