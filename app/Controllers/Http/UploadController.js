'use strict'

const Helpers = use('Helpers')
const Env = use('Env')

function generateName(extension) {
  return `${new Date().getTime()}.${extension}`
}

class UploadController {
  // noinspection JSUnusedGlobalSymbols
  async store({ request }) {
    const profilePics = request.file('image', {
      types: ['image'],
      allowedExtensions: ['jpg', 'png', 'jpeg']
    })

    const name = generateName(profilePics.subtype)
    await profilePics.move(Helpers.publicPath('uploads'), { name })

    if (!profilePics.moved()) return [profilePics.error()]

    return { url: `http://localhost:3333/uploads/${name}` }
    // return { url: `${Env.get('APP_URL')}/uploads/${name}` }
  }
}

module.exports = UploadController
