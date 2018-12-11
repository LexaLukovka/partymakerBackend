'use strcit'

class Event {

  static create(user) {
    return user.admin
  }

  static edit(user, event) {
    return user.admin || user.id === event.admin_id
  }

  static delete(user, event) {
    return user.admin || user.id === event.admin_id
  }
}

module.exports = Event
