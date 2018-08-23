const PlaceRating = use('App/Models/PlaceRating')

class RatingController {

  async index({ auth, params }) {
    const result = await PlaceRating.query().where({
      user_id: auth.user.id,
      place_id: params.place_id,
    }).first()

    return {
      data: result ? result.rating : null,
    }
  }

  async store({ params, auth, request }) {
    const { rating } = request.all()

    const result = await PlaceRating.query().where({
      user_id: auth.user.id,
      place_id: params.place_id,
    }).first()

    if (result) {
      await PlaceRating.query().where({
        user_id: auth.user.id,
        place_id: params.place_id,
      }).update({ rating })
    } else {
      await PlaceRating.create({
        user_id: auth.user.id,
        place_id: params.place_id,
        rating,
      })
    }

    return {
      message: 'rating was updated',
    }
  }

}

module.exports = RatingController
