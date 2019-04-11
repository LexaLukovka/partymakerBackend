'use strict'

const Env = use('Env')

const Helpers = use('Helpers')

function generateName(extension) {
  return `${new Date().getTime()}.${extension}`
}

class UploadController {
  async store({ request }) {
    const profilePics = request.file('asset', {
      types: ['image'],
      allowedExtensions: ['jpg', 'png', 'jpeg']
    })

    const name = generateName(profilePics.subtype)

    await profilePics.move(Helpers.publicPath('uploads'), { name })

    if (!profilePics.move()) return [profilePics.error()]

    return { url: `${Env.get('HOST')}/uploads/${name}` }
  }
}

module.exports = UploadController
