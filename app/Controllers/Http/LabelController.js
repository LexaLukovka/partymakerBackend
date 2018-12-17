const Label = use('App/Models/Label')

/**
 * Resourceful controller for interacting with labels
 */
class LabelController {
  /**
   * Show a list of all labels.
   * GET labels
   */
  async index() {
    return Label.all()
  }

  /**
   * Create/save a new label.
   * POST labels
   */
  async store({ request, response, auth }) {
    const { title } = request.all()

    if (auth.user.cannot('create', Label)) {
      return response.forbidden()
    }
    const label = await Label.create({ title })

    return response.created({ title: label })
  }

  /**
   * Display a single label.
   * GET labels/:id
   */
  async show({ params }) {
    return Label.findByOrFail('title', decodeURI(params.id))
  }

  /**
   * Update label details.
   * PUT or PATCH labels/:id
   */
  async update({ params, request, response, auth }) {
    const { title } = request.all()
    const label = await Label.findByOrFail('title', decodeURI(params.id))

    if (auth.user.cannot('edit', label)) {
      return response.forbidden()
    }

    label.merge({ title })

    await label.save()

    return response.accepted({ title: label })
  }

  /**
   * Delete a label with id.
   * DELETE labels/:id
   */
  async destroy({ params, response, auth }) {
    const label = await Label.findByOrFail('title', decodeURI(params.id))

    if (auth.user.cannot('delete', label)) {
      return response.forbidden()
    }

    await label.delete()

    return response.deleted()
  }
}

module.exports = LabelController
