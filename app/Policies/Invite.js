
class Invite {

  static create(user) {
    return user.is_superadmin || user.is_active
  }

  static edit(user, invite) {
    return user.is_superadmin || user.id === invite.admin_id
  }

  static delete(user, invite) {
    return user.is_superadmin || user.id === invite.admin_id
  }

}

module.exports = Invite
