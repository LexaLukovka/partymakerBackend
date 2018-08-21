/* eslint-disable radix,object-shorthand */
const Party = use('App/Models/Party')
const Place = use('App/Models/Place')

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
      .with('place')
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
    const req = request.all()

    if (req.place_id) {
      const place = await Place.find(req.place_id)
      Party.makeUsingPlace(place, {
        admin_id: auth.user.id,
        title: req.title,
        type: req.type,
        pictures: req.pictures,
        telegram_url: req.telegram_url,
        description: req.description,
        start_time: req.start_time,
        people_max: req.people_max,
        people_min: req.people_min,
        private_party: req.private_party,
      })
    } else {
      await Party.make({
        admin_id: auth.user.id,
        address: req.address,
        title: req.title,
        type: req.type,
        pictures: req.pictures,
        telegram_url: req.telegram_url,
        description: req.description,
        start_time: req.start_time,
        people_max: req.people_max,
        people_min: req.people_min,
        private_party: req.private_party,
      })
    }

    return {
      status: 200,
      message: `${req.title} created`,
      success: true
    }
  }

  // noinspection JSUnusedGlobalSymbols
  async show({ request, auth, params }) {
    const party = await Party
      .query()
      .with('admin')
      .with('address')
      .with('place')
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
      'private_party',
    ])

    await Party.query()
      .where('id', params.id)
      .update(partyValues)

    const party = await Party.find(params.id)

    const { address, district } = request.only(['address', 'district'])

    if (address) {
      await party.address()
        .update({
          address: address.address,
          lat: address.lat,
          lng: address.lng,
          placeId: address.placeId,
        })
    }

    if (district) {
      await party.address()
        .update({ district })
    }

    return {
      message: `Party ${party.title} updated `
    }
  }

  // noinspection JSUnusedGlobalSymbols
  async destroy({ params }) {
    const party = await Party.find(params.id)

    party.delete()

    return {
      message: `Party ${party.id} ${party.title} delete `
    }
  }
}

module.exports = PartyController

