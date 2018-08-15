/* eslint-disable radix,object-shorthand */
const Party = use('App/Models/Party')
const Picture = use('App/Models/Picture')
const Address = use('App/Models/Address')

class PartyController {
  // noinspection JSUnusedGlobalSymbols
  async index({ request }) {
    const { cursor, ...params } = request.all()

    const total = await Party.total() // count parties

    const parties = await Party
      .query()
      .with('admin')
      .with('address')
      .with('pictures')
      .where('id', '>', parseInt(cursor) || 0)
      .where(params)
      .limit(10)
      .orderBy('updated_at', 'DESC')
      .fetch()

    return {
      status: 200,
      cursor,
      total,
      data: parties
    }
  }

  // noinspection JSUnusedGlobalSymbols
  async store({ request, auth }) {
    const {
      title,
      type,
      address,
      pictures,
      district,
      telegram_url,
      description,
      start_time,
      people_max,
      people_min,
      private_party,
    } = request.all()

    const addressModel = await Address.create({
      address: address.address,
      district,
      lng: address.lng,
      lat: address.lat,
      placeId: address.placeId,
    })

    const imagePromises = pictures.map(async picture => (await Picture.create({ url: picture })).id)
    const images = await Promise.all(imagePromises)

    const party = await Party.create({
      title,
      type,
      status: 'сбор участников',
      admin_id: auth.current.user.id,
      address_id: addressModel.id,
      primary_picture: pictures[0],
      telegram_url,
      start_time,
      description,
      people_max,
      people_min,
      private_party,
    })

    await party.users().attach([auth.user.id])
    await party.pictures().attach(images)

    return {
      status: 200,
      message: `${title} created`,
      success: true
    }
  }

  // noinspection JSUnusedGlobalSymbols
  async show({ request, auth, params }) {
    const party = await Party
      .query()
      .with('admin')
      .with('address')
      .with('pictures')
      .where('id', params.id)
      .first()

    return {
      status: 200,
      data: party
    }
  }

  // noinspection JSUnusedGlobalSymbols
  async update({ request, auth, params }) {

    const partyValues = request.only([
      'title',
      'type',
      'telegram_url',
      'description',
      'people_max',
      'people_min',
      'start_time',
      'private_party'
    ])

    await Party.query().where('id', params.id).update(partyValues)

    const party = await Party.find(params.id)

    const { address, district } = request.only(['address', 'district'])

    if (address) {
      await party.address().update({
        address: address.address,
        lat: address.lat,
        lng: address.lng,
        placeId: address.placeId,
      })
    }

    if (district) {
      await party.address().update({ district })
    }

    return {
      message: `Party ${party.title} updated `
    }
  }

}

module.exports = PartyController

