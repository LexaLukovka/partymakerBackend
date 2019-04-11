'use strcit'

class Asset {

  static create(user) {
    return user.is_superadmin || user.is_active
  }

  static delete(user, place) {
    return user.is_superadmin || user.id === place.admin_id
  }
}

module.exports = Asset
