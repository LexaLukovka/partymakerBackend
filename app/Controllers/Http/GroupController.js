/* eslint-disable radix,object-shorthand */
const Group = use('App/Models/Group')
const GroupRepository = use('App/Repositories/Group')

class GroupController {

  constructor() {
    this.group = new GroupRepository()
    this.index = this.index.bind(this)
    this.store = this.store.bind(this)
    this.show = this.show.bind(this)
    this.update = this.update.bind(this)
    this.destroy = this.destroy.bind(this)
  }

  /**
   * Show a list of all groups.
   * GET groups
   */
  async index({ request }) {
    const { page, limit, ...params } = request.all()

    return this.group.paginate({
      page: page || 1,
      limit: limit || 10,
      params,
    })
  }

  /**
   * Create/save a new group.
   * POST groups
   */
  async store({ request, auth, response }) {
    const req = request.all()
    const data = { admin: auth.user, ...req }

    const group = await this.group.create(data)

    return response.created(group)
  }

  /**
   * Display a single group.
   * GET groups/:id
   */
  async show({ request, auth, params }) {
    const group = await Group
      .query()
      .with('admin')
      .with('address')
      .with('place')
      .with('event')
      .where('id', params.id)
      .first()

    return group
  }

  /**
   * Update group details.
   * PUT or PATCH groups/:id
   */
  async update({ request, auth, response, params }) {
    const req = request.all()
    const group = await Group.find(params.id)

    if (!group) return response.notFound()

    if (auth.user.cannot('edit', group)) return response.forbidden()

    await this.group.edit(group, req)

    return group
  }

  /**
   * Delete a group with id.
   * DELETE groups/:id
   */
  async destroy({ params, response, auth }) {
    const group = await Group.find(params.id)

    if (!group) return response.notFound()
    if (auth.user.cannot('delete', group)) return response.forbidden()

    group.delete()

    return group
  }
}

module.exports = GroupController

