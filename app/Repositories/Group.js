const isEmpty = require('lodash/isEmpty')

const Group = use('App/Models/Group')
const AddressRepository = use('App/Repositories/Address')
const PictureRepository = use('App/Repositories/Picture')

class GroupRepository {

  constructor() {
    this.address = new AddressRepository()
    this.picture = new PictureRepository()

    this.paginate = this.paginate.bind(this)
    this.find = this.find.bind(this)
    this.create = this.create.bind(this)
    this.edit = this.edit.bind(this)
  }

  paginate({ page, limit, params }) {
    return Group.query()
      .with('admin')
      .with('address')
      .with('place')
      .with('event')
      .where(params)
      .orderBy('updated_at', 'DESC')
      .paginate(page, limit)
  }

  find(id) {
    return Group
      .query()
      .with('admin')
      .with('address')
      .with('event')
      .with('place')
      .where('id', id)
      .first()
  }

  async create(data) {
    let addressModel

    if (data.address) {
      addressModel = await this.address.create(data.address)
    }

    const isValid = [data.place_id, data.event_id, data.address].filter(v => isEmpty(v)).length > 1

    if (!isValid) {
      throw new Error('you should choose between place_id,event_id or address and leave only one')
    }

    const group = await Group.create({
      title: data.title,
      admin_id: data.admin.id,
      place_id: data.place_id,
      event_id: data.event_id,
      invite_url: data.invite_url,
      address_id: data.address && addressModel.id,
      date: data.date,
      description: data.description,
    })

    await group.users().attach([data.admin.id])

    return this.find(group.id)
  }

  async edit(group, data) {
    let addressModel

    if (data.address) addressModel = await this.address.create(data.address)

    group.merge({
      title: data.title,
      place_id: data.place_id,
      event_id: data.event_id,
      address_id: data.address && addressModel.id,
      date: data.date,
      description: data.description,
    })
    await group.save()

    if (data.pictures) {
      await this.picture.update(data.pictures)
    }

    return this.find(group.id)
  }
}

module.exports = GroupRepository
