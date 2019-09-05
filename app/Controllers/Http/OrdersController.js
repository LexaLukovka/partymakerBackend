const randomString = require('randomstring')
const Order = use('App/Models/Order')
const Event = use('Event')

/**
 * Resourceful controller for interacting with orders
 */
class OrdersController {

  /**
   * Find order by token
   * GET /order/:token
   *
   * @param {object} ctx
   */
  async token({ params: { token } }) {
    return Order.findBy({ token })
  }

  /**
   * Display a single order.
   * GET /orders/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    return Order
      .query()
      .with('room', (builder) => builder.with('place').with('users'))
      .where({ id: params.id })
      .first()
  }

  /**
   * Create/save a new order.
   * POST orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth, room }) {

    const order = await Order.create({
      ...request.all(),
      token: randomString.generate()
    })

    Event.fire('ws:room', room.id, 'order:updated', order)
    Event.fire('order:created', { order, auth })

    return response.created(order)
  }
}

module.exports = OrdersController
