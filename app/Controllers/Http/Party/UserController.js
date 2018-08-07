/* eslint-disable radix */
const Party = use('App/Models/Party')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  // noinspection JSUnusedGlobalSymbols
  async index({ params }) {
    const party = await Party.find(params.party_id)
    return party.users().fetch()
  }

  async store({ params, auth, response }) {
    const party = await Party.find(params.party_id)

    if (await party.isOnParty(auth.user.id)) {
      return response.status(403).json({
        status: 403,
        success: false,
        message: `${auth.user.name} already joined party`
      })
    }

    await party.users().attach([auth.user.id])

    return {
      status: 200,
      success: true,
      message: `${auth.user.name} joined the party`
    }
  }

  async destroy({ params, request, response, auth }) {

    const party = await Party.find(params.party_id)

    if (parseInt(params.id) !== auth.user.id) {
      return response.status(403).json({
        status: 403,
        success: false,
        message: 'you cannot remove other users from party'
      })
    }

    if (!await party.isOnParty(auth.user.id)) {

      return response.status(403).json({
        status: 403,
        success: false,
        message: `${auth.user.name} was not on party`
      })
    }

    await party.users().detach([auth.user.id])

    return {
      status: 200,
      success: true,
      message: `${auth.user.name} left the party`
    }
  }

  async parties({ request, auth, params }) {
    const parties = await Party
      .query()
      .with('admin')
      .with('address')
      .with('pictures')
      .where('admin_id', params.id)
      .orderBy('updated_at', 'DESC')
      .fetch()

    return {
      status: 200,
      data: parties
    }
  }
}

module.exports = UserController
