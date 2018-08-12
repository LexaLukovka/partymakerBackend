/* eslint-disable radix */
const Party = use('App/Models/Party')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  async index({ params }) {
    const party = await Party.find(params.party_id)

    return {
      admin: await party.admin().first(),
      data: await party.users().orderBy('id', 'desc').fetch()
    }
  }

  async store({ params, auth, response }) {
    const party = await Party.find(params.party_id)
    await party.users().attach([auth.user.id])

    return {
      party_id: party.id,
      message: `${auth.user.name} joined the party`
    }
  }

  async show({ params, auth }) {
    const party = await Party.find(params.party_id)
    if (params.id === 'isMember') {
      return {
        isMember: await party.isOnParty(auth.user.id)
      }
    }

    return {
      isMember: await party.isOnParty(params.id)
    }
  }

  async destroy({ params, request, response, auth }) {
    const party = await Party.find(params.party_id)
    if (!await party.isOnParty(auth.user.id)) {
      return response.status(403).json({
        message: `${auth.user.name} was not on party`
      })
    }
    await party.users().detach([auth.user.id])

    return {
      party_id: party.id,
      message: `${auth.user.name} left the party`
    }
  }
}

module.exports = UserController
