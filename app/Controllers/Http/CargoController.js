const Cargo = use('App/Models/Cargo')
const Picture = use('App/Models/Picture')
const Location = use('App/Models/Location')

class CargoController {

  // noinspection JSUnusedGlobalSymbols
  async index({ request }) {
    const { page, limit, all } = request.all()

    const query = Cargo.query()
      .with('user')
      .with('from')
      .with('to')
      .with('pictures')

    if (all) return query.fetch()
    return query.orderBy('created_at', 'desc').paginate(page, limit)
  }

  // noinspection JSUnusedGlobalSymbols
  async store({ request, auth }) {
    const data = request.all()

    if (!data.pictures) data.pictures = []

    const from = await Location.create(data.from)
    const to = await Location.create(data.to)

    const imagePromises = data.pictures.map(async picture =>
      (await Picture.create({ url: picture })).id)
    const images = await Promise.all(imagePromises)

    const cargo = await Cargo.create({
      title: data.title,
      from_id: from.id,
      to_id: to.id,
      primary_picture: data.primary_picture,
      weight: data.weight,
      dimensions: data.dimensions,
      volume: data.volume,
      description: data.description,
      transport_type: data.transport_type,
      payment: data.payment,
      distance: data.distance,
      crosses_border: data.crosses_border,
      user_id: auth.current.user.id,
    })

    await cargo.pictures().attach(images)

    return { success: true }
  }

  async show({ auth, params }) {
    if (auth.user.id !== Number(params.id)) { return { error: 'You cannot see someone else\'s profile' } }

    return auth.user
  }

  // async update() {
  //
  // }
  //
  // async destroy() {
  //
  // }
}

module.exports = CargoController
