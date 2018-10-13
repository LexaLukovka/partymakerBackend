'use strict'

const Helpers = use('Helpers')

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
    await profilePics.moveAll(Helpers.publicPath('uploads'), { name })

    if (!profilePics.moved()) return [profilePics.error()]

    return { url: `/uploads/${name}` }
  }
}

module.exports = UploadController
