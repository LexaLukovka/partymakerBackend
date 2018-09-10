const Model = use('Model')
const Address = use('App/Models/Address')

class Group extends Model {
  static get hidden() {
    return ['address_id', 'user_id', 'place_id']
  }

  getStartTime(value) {
    return (new Date(value)).toString()
  }

  admin() {
    return this.belongsTo('App/Models/User', 'admin_id', 'id')
  }

  address() {
    return this.belongsTo('App/Models/Address', 'address_id', 'id')
  }

  users() {
    return this.belongsToMany('App/Models/User')
  }

  place() {
    return this.belongsTo('App/Models/Place')
  }

  pictures() {
    return this.belongsToMany('App/Models/Picture')
  }

  async isOnParty(user_id) {
    const users = await this.users().fetch()
    return !!users.toJSON().find(user => user.id === user_id)
  }

  static async total() {
    const { total } = (await this.query().count('* as total'))[0]
    return total
  }

  static async make(data) {
    const addressModel = await Address.create({
      address: data.address.address,
      lng: data.address.lng,
      lat: data.address.lat,
      placeId: data.address.placeId,
    })

    const group = await Group.create({
      title: data.title,
      admin_id: data.admin_id,
      address_id: addressModel.id,
      start_time: data.start_time,
      description: data.description,
    })

    await group.users().attach([data.admin_id])
  }

  static async makeUsingPlace(place, data) {
    const group = await Group.create({
      title: data.title,
      admin_id: data.admin_id,
      place_id: place.id,
      start_time: data.start_time,
      description: data.description,
    })
    await group.users().attach([data.admin_id])
  }

  static async update(id, values) {
    return Group.query().where('id', id).update(values)
  }
}

module.exports = Group
