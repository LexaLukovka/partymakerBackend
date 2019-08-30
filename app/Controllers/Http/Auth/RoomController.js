
/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/**
 * Resourceful controller for interacting with rooms
 */
class RoomController {
  /**
   * Show a list of all rooms.
   * GET /rooms
   *
   * @param {object} ctx
   */
  async index({ auth }) {
    return auth.user.rooms()
      .with('place')
      .fetch()
  }
}

module.exports = RoomController
