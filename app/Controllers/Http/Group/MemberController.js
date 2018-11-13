/* eslint-disable radix */
const Group = use('App/Models/Group')
const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with group members
 */
class MemberController {
  /**
   * Show a list of all group members.
   * GET users
   */
  async index({ params, response }) {
    const group = await Group.find(params.group_id)
    if (!group) return response.notFound({ message: 'group not found!' })

    return group.users()
      .orderBy('id', 'desc')
      .fetch()
  }

  /**
   * add new current user to the group.
   * POST users
   */
  async store({ params, auth, request, response }) {
    const group = await Group.find(params.group_id)
    if (!group) return response.notFound({ message: 'group not found!' })
    await group.users()
      .attach(auth.user.id)

    return response.created({ message: 'users added to the group' })
  }

  /**
   * Display a single member.
   * GET users/:id
   */
  async show({ params, auth, response }) {
    const group = await Group.find(params.group_id)
    if (!group) return response.notFound({ message: 'group not found!' })

    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'user does not exist!' })

    if (!await group.isMember(params.id)) {
      return response.forbidden({ message: `${user.name} is not member of ${group.title}` })
    }

    return user
  }

  /**
   * remove member from the group.
   * DELETE users/:id
   */
  async destroy({ params, request, response }) {
    const group = await Group.find(params.group_id)
    if (!group) return response.notFound({ message: 'group not found!' })

    const user = await User.find(params.id)
    if (!user) return response.notFound({ message: 'user does not exist!' })

    if (!await group.isMember(params.id)) {
      return response.forbidden({ message: `${user.name} is not member of ${group.title}` })
    }

    if (group.admin_id !== params.id) {
      return response.forbidden({ message: `Only admin of the ${group.title} can delete members` })
    }

    const res = await group.users()
      .detach([params.id])

    return {
      message: res,
    }
  }
}

module.exports = MemberController
