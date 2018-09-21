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
      .where(params)
      .orderBy('updated_at', 'DESC')
      .paginate(page, limit)
  }

  find(id) {
    return Group
      .query()
      .with('admin')
      .with('address')
      .with('place')
      .where('id', id)
      .first()
  }

  async create(data) {
    let addressModel

    if (data.address) {
      addressModel = await this.address.create(data.address)
    }

    const group = await Group.create({
      title: data.title,
      admin_id: data.admin.id,
      place_id: data.place_id,
      address_id: data.address && addressModel.id,
      start_time: data.start_time,
      description: data.description,
    })

    await group.users().attach([data.admin_id])

    return group
  }

  async edit(groupModel, data) {
    let addressModel

    if (data.address) addressModel = await this.address.create(data.address)

    groupModel.merge({
      title: data.title,
      place_id: data.place_id,
      address_id: data.address && addressModel.id,
      start_time: data.start_time,
      description: data.description,
    })
    await groupModel.save()

    if (data.pictures) {
      await this.picture.update(data.pictures)
    }

    return groupModel
  }
}

module.exports = GroupRepository
