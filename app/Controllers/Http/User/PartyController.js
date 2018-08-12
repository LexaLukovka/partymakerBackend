const Party = use('App/Models/Party')

class PartyController {
  async index({ request, auth }) {
    const parties = await Party
      .query()
      .with('admin')
      .with('address')
      .with('pictures')
      .where('admin_id', auth.user.id)
      .orderBy('updated_at', 'DESC')
      .fetch()

    return {
      status: 200,
      data: parties
    }
  }
}

module.exports = PartyController
