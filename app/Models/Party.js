const Model = use('Model')
const Address = use('App/Models/Address')
const Picture = use('App/Models/Picture')

class Party extends Model {
  static get hidden() {
    return ['address_id', 'user_id', 'place_id']
  }

  static castDates(key, value) {
    return value.toISOString()
  }

  admin() {
    return this.belongsTo('App/Models/User', 'admin_id', 'id')
  }

  place() {
    return this.belongsTo('App/Models/Place')
  }

  address() {
    return this.belongsTo('App/Models/Address', 'address_id', 'id')
  }

  users() {
    return this.belongsToMany('App/Models/User')
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

    const images = await Picture.add(data.pictures)

    const addressModel = await Address.create({
      address: data.address.address,
      district: data.address.district,
      lng: data.address.lng,
      lat: data.address.lat,
      placeId: data.address.placeId,
    })

    const party = await Party.create({
      title: data.title,
      type: data.type,
      status: 'сбор участников',
      admin_id: data.admin_id,
      address_id: addressModel.id,
      primary_picture: data.pictures[0],
      telegram_url: data.telegram_url,
      start_time: data.start_time,
      description: data.description,
      people_max: data.people_max,
      people_min: data.people_min,
      private_party: data.private_party,
    })

    await party.users()
      .attach([data.admin_id])
    await party.pictures()
      .attach(images)
  }

  static async makeUsingPlace(place, data) {

    const images = await Picture.add(data.pictures)

    const party = await Party.create({
      title: data.title,
      type: data.type,
      status: 'сбор участников',
      admin_id: data.admin_id,
      place_id: place.id,
      primary_picture: data.pictures[0],
      telegram_url: data.telegram_url,
      start_time: data.start_time,
      description: data.description,
      people_max: data.people_max,
      people_min: data.people_min,
      private_party: data.private_party,
    })

    await party.users()
      .attach([data.admin_id])
    await party.pictures()
      .attach(images)
  }
}

module.exports = Party
