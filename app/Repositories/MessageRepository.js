const Message = use('App/Models/Message')

class MessageRepository {

  paginate(room_id, { page, limit }) {
    return Message.query()
      .with('asset')
      .with('place')
      .orderBy('created_at', 'DESC')
      .where({ room_id })
      .paginate(page, limit)
  }

  find(id) {
    return Message.query()
      .with('asset')
      .with('place')
      .where({ id })
      .first()
  }
}

module.exports = MessageRepository
