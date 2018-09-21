const Group = use('App/Models/Group')

class GroupController {
  async index({ request, params }) {
    const groups = await Group
      .query()
      .with('admin')
      .with('address')
      .with('pictures')
      .where('admin_id', params.id)
      .orderBy('updated_at', 'DESC')
      .fetch()

    return {
      status: 200,
      data: groups
    }
  }
}

module.exports = GroupController
