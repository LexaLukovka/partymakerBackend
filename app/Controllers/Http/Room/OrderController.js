'use strict'

const Ws = use('Ws')
const Order = use('App/Models/Order')
const Sms = use('Sms')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with orders
 */
class OrderController {
  /**
   * Show a list of all orders.
   * GET orders
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({ request }) {
    const { page, limit } = request.all()
    return Order.query().paginate({ page, limit })
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
    const fields = request.all()
    const order = await Order.create(fields)
    const place = await room.place().fetch()
    await room.notify(`${auth.user.name} заказал ${place.title} на ${order.date} ${order.time}`)

    const topic = Ws.getChannel('room:*').topic(`room:${room.id}`)
    if (topic) topic.broadcast('order:created', order)

    Sms.send({ text: 'Test message', phone: '+380683188524' })

    return response.created(order)
  }

  /**
   * Display a single order.
   * GET orders/:id
   *
   * @param {object} ctx
   */
  async show({ params }) {
    return Order.findOrFail(params.id)
  }

  /**
   * Update order details.
   * PUT or PATCH orders/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, response, params, room }) {
    const order = await Order.findOrFail(params.id)
    const form = request.all()
    order.merge(form)
    await order.save()

    Ws.getChannel('room:*')
      .topic(`room:${room.id}`)
      .broadcast('order:updated', order)

    return response.updated(order)
  }

  /**
   * Delete a order with id.
   * DELETE orders/:id
   *
   * @param {object} ctx
   * @param {Response} ctx.response
   */
  async destroy({ params, response, auth, room }) {
    const order = await Order.findOrFail(params.id)
    await room.notify(`${auth.user.name} удалил заказ`)
    await order.delete()


    Ws.getChannel('room:*')
      .topic(`room:${room.id}`)
      .broadcast('order:deleted', order)

    return response.deleted()
  }
}

module.exports = OrderController
