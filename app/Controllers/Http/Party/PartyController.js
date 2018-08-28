/* eslint-disable radix,object-shorthand */
const difference = require('lodash/difference')
const intersection = require('lodash/intersection')

const Party = use('App/Models/Party')
const Place = use('App/Models/Place')
const Picture = use('App/Models/Picture')

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
      data: parties,
    }
  }

  // noinspection JSUnusedGlobalSymbols
  async store({ request, auth }) {
    const req = request.all()

    if (req.place_id) {
      const place = await Place.find(req.place_id)
      await Party.makeUsingPlace(place, {
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
      success: true,
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
      data: party,
    }
  }

  // noinspection JSUnusedGlobalSymbols
  async update({ request, auth, params }) {

    const req = request.all()

    await Party.update(params.id, {
      title: req.title,
      type: req.type,
      telegram_url: req.telegram_url,
      description: req.description,
      people_max: req.people_max,
      people_min: req.people_min,
      start_time: req.start_time,
      private_party: req.private_party,
    })

    const party = await Party.find(params.id)

    if (req.address) await party.address().update(req.address)

    if (req.pictures) {
      const oldPicturesModels = (await party.pictures().fetch()).toJSON()
      const oldPictures = oldPicturesModels.map(picture => picture.url)

      const toAdd = difference(req.pictures, oldPictures)
      const toRemove = difference(oldPictures, intersection(req.pictures, oldPictures))

      const toRemoveModels = await Picture.remove(toRemove)
      const toAddModels = await Picture.add(toAdd)

      await party.pictures().attach(toAddModels.map(p => p.id))
      await party.pictures().detach(toRemoveModels.map(p => p.id))

      await Picture.clean()
    }

    return {
      message: `Party ${party.title} updated `,
    }
  }

  // noinspection JSUnusedGlobalSymbols
  async destroy({ params }) {
    const party = await Party.find(params.id)

    party.delete()

    return {
      message: `Party ${party.id} ${party.title} deleted`,
    }
  }
}

module.exports = PartyController

