/* eslint-disable no-empty-function */
const Food = use('App/Models/Food')

/**
 * Resourceful controller for interacting with foods
 */
class FoodController {
  /**
   * Show a list of all foods.
   * GET foods
   */
  async index({ params }) {
    const foodList = await Food.query()
      .where('party_id', params.party_id)
      .fetch()

    return {
      status: 200,
      data: foodList,
    }
  }

  /**
   * Render a form to be used for creating a new food.
   * GET foods/create
   */
  async create({ request, response, view }) {
  }

  /**
   * Create/save a new food.
   * POST foods
   */
  async store({ request, response }) {
  }

  /**
   * Render a form to update an existing food.
   * GET foods/:id/edit
   */
  async edit({ params, request, response, view }) {
  }

  /**
   * Update food details.
   * PUT or PATCH foods/:id
   */
  async update({ params, request, response }) {
  }

  /**
   * Delete a food with id.
   * DELETE foods/:id
   */
  async destroy({ params, request, response }) {
  }
}

module.exports = FoodController
