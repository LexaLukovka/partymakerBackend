'use strict'

const Entertainment = use('App/Models/Entertainment')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with entertainments
 */
class EntertainmentController {
  /**
   * Show a list of all entertainments.
   * GET entertainments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index() {
    return Entertainment.query()
      .with('places')
      .fetch()
  }

  /**
   * Create/save a new entertainment.
   * POST entertainments
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const fields = request.all()
    const entertainment = await Entertainment.create(fields)
    return response.created(entertainment)
  }

  /**
   * Display a single entertainment.
   * GET entertainments/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    return Entertainment.findOrFail(params.id)
  }

  /**
   * Update entertainment details.
   * PUT or PATCH entertainments/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response, entertainment }) {
    const fields = request.all()
    entertainment.merge({ fields })
    await entertainment.save()
    return response.updated(entertainment)
  }

  /**
   * Delete a entertainment with id.
   * DELETE entertainments/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ entertainment, response }) {
    await entertainment.delete()
    return response.deleted()
  }
}

module.exports = EntertainmentController
