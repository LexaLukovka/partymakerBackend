/* eslint-disable radix */
const Group = use('App/Models/Group')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  async index({ params }) {
    const group = await Group.find(params.group_id)

    return {
      admin: await group.admin().first(),
      data: await group.users().orderBy('id', 'desc').fetch()
    }
  }

  async store({ params, auth }) {
    const group = await Group.find(params.group_id)
    await group.users().attach([auth.user.id])

    return {
      group_id: group.id,
      message: `${auth.user.name} joined the group`
    }
  }

  async show({ params, auth }) {
    const group = await Group.find(params.group_id)
    if (params.id === 'isMember') {
      return {
        isMember: await group.isOnParty(auth.user.id)
      }
    }

    return {
      isMember: await group.isOnParty(params.id)
    }
  }

  async destroy({ params, request, response, auth }) {
    const group = await Group.find(params.group_id)
    if (!await group.isOnParty(auth.user.id)) {
      return response.status(403).json({
        message: `${auth.user.name} was not on group`
      })
    }
    await group.users().detach([auth.user.id])

    return {
      group_id: group.id,
      message: `${auth.user.name} left the group`
    }
  }
}

module.exports = UserController
