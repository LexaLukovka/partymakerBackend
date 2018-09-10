/* eslint-disable radix,object-shorthand */
const difference = require('lodash/difference')
const intersection = require('lodash/intersection')

const Group = use('App/Models/Group')
const Place = use('App/Models/Place')
const Picture = use('App/Models/Picture')

class GroupController {
  // noinspection JSUnusedGlobalSymbols
  async index({ request }) {
    const { cursor, ...params } = request.all()

    const total = await Group.total() // count parties

    const parties = await Group
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
      await Group.makeUsingPlace(place, {
        admin_id: auth.user.id,
        title: req.title,
        description: req.description,
        start_time: req.start_time,
      })
    } else {
      await Group.make({
        admin_id: auth.user.id,
        address: req.address,
        title: req.title,
        description: req.description,
        start_time: req.start_time,
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
    const group = await Group
      .query()
      .with('admin')
      .with('address')
      .with('place')
      .with('pictures')
      .where('id', params.id)
      .first()

    return {
      status: 200,
      data: group,
    }
  }

  // noinspection JSUnusedGlobalSymbols
  async update({ request, auth, params }) {

    const req = request.all()

    await Group.update(params.id, {
      title: req.title,
      description: req.description,
      start_time: req.start_time,
    })

    const group = await Group.find(params.id)

    if (req.address) await group.address().update(req.address)

    if (req.pictures) {
      const oldPicturesModels = (await group.pictures().fetch()).toJSON()
      const oldPictures = oldPicturesModels.map(picture => picture.url)

      const toAdd = difference(req.pictures, oldPictures)
      const toRemove = difference(oldPictures, intersection(req.pictures, oldPictures))

      const toRemoveModels = await Picture.remove(toRemove)
      const toAddModels = await Picture.add(toAdd)

      await group.pictures().attach(toAddModels.map(p => p.id))
      await group.pictures().detach(toRemoveModels.map(p => p.id))

      await Picture.clean()
    }

    return {
      message: `Group ${group.title} updated `,
    }
  }

  // noinspection JSUnusedGlobalSymbols
  async destroy({ params }) {
    const group = await Group.find(params.id)

    group.delete()

    return {
      message: `Group ${group.id} ${group.title} deleted`,
    }
  }
}

module.exports = GroupController

