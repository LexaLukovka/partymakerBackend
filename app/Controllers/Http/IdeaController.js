/* eslint-disable radix,no-empty-function */
const autoBind = require('auto-bind')
const Idea = use('App/Models/Idea')
const IdeaRepository = use('App/Repositories/Idea')

/**
 * Resourceful controller for interacting with ideas
 */
class IdeaController {

  constructor() {
    this.idea = new IdeaRepository()
    autoBind(this)
  }

  /**
   * Show a list of all ideas.
   * GET ideas
   */
  async index({ request }) {
    const { page, limit } = request.all()

    const ideas = await this.idea.paginate({
      page: page || 1,
      limit: limit || 10,
    })

    return ideas
  }

  /**
   * Create/save a new idea.
   * POST ideas
   */
  async store({ request, response, auth }) {
    const req = request.all()

    const idea = await this.idea.create({ ...req, admin: auth.user })

    return response.created({
      created: !!idea,
      idea: await this.idea.find(idea.id)
    })
  }

  /**
   * Display a single idea.
   * GET ideas/:id
   */
  async show({ request, auth, params, response }) {

    const ideaModel = await this.idea.find(params.id)

    if (!ideaModel) return response.notFound()

    const rating = await ideaModel.rating().avg('rating as rating')

    const idea = ideaModel.toJSON()
    if (rating[0] && rating[0].rating) {
      idea.rating = parseFloat(rating[0].rating.toFixed(1))
    } else {
      idea.rating = null
    }

    return idea
  }

  /**
   * Update idea details.
   * PUT or PATCH ideas/:id
   */
  async update({ params, request, auth, response }) {
    const req = request.all()
    const idea = await Idea.find(params.id)

    if (!idea) return response.notFound()

    const updatedIdea = await this.idea.edit(idea, { ...req, admin: auth.user })

    return {
      updated: !!updatedIdea,
      idea: await this.idea.find(updatedIdea.id)
    }
  }

  /**
   * Delete a idea with id.
   * DELETE ideas/:id
   */
  async destroy({ params, request, auth, response }) {
    const idea = await Idea.find(params.id)

    if (!idea) return response.notFound()

    const title = `Place ${idea.title} deleted`

    await idea.delete()

    return { title }
  }
}

module.exports = IdeaController
