/* eslint-disable max-len */
const Order = use('App/Models/Order')
const Message = use('App/Models/Message')

/**
 * Resourceful controller for interacting with orders
 */
class OrdersController {

  async _load(token) {
    return Order
      .query()
      .with('room', (builder) => builder.with('place').with('users'))
      .where({ token })
      .first()
  }

  /**
   * Find order by token
   * GET /order/:token
   *
   * @param {object} ctx
   */
  async token({ params: { token } }) {
    return this._load(token)
  }

  /**
   * Confirm order
   * POST /order/:token/confirm
   *
   * @param {object} ctx
   */
  async confirm({ params: { token } }) {
    const order = await Order.findBy({ token })
    order.merge({ state: 'confirmed' })
    await order.save()

    Message.create({
      text: 'Организатор подтвердил ваш заказ, Приятного отдыха',
      user_id: 1,
      room_id: order.room_id,
    })

    return this._load(token)
  }

  /**
   * Reject order
   * POST /order/:token/reject
   *
   * @param {object} ctx
   */
  async reject({ params: { token } }) {
    const order = await Order.findBy({ token })
    order.merge({ state: 'rejected' })
    await order.save()
    const room = await order.room().fetch()
    const place = await room.place().fetch()

    Message.create({
      text: `Ваша заявка была отклонена.\nПоробуйте связаться с организатором что бы выянить причину отказа\n\nтел: ${place.phone || ''}`,
      user_id: 1,
      room_id: room.id,
    })

    return this._load(token)
  }

}

module.exports = OrdersController
