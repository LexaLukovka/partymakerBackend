const Party = use('App/Models/Party')
const Picture = use('App/Models/Picture')
const Location = use('App/Models/Location')

class PartyController {
  // noinspection JSUnusedGlobalSymbols
  async store({ request, auth }) {
    const { icon, form, finishForm } = request.all()

    if (!finishForm.pictures) finishForm.pictures = []

    const address = await Location.create(form.from)

    const imagePromises = finishForm.pictures.map(async picture =>
      (await Picture.create({ url: picture })).id)
    const images = await Promise.all(imagePromises)

    const party = await Party.create({
      user_id: auth.current.user.id,
      icon: icon.icon,
      address_id: address.id,
      district: form.district,
      time: form.time,
      after: form.after,
      before: form.before,
      description: form.description,
      checked: finishForm.checked,
      primary_picture: finishForm.primary_picture,
    })

    await party.pictures().attach(images)

    return { success: true }
  }
}

module.exports = PartyController
