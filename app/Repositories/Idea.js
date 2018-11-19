/* eslint-disable no-unused-expressions */
const isEmpty = require('lodash/isEmpty')
const autoBind = require('auto-bind')
const Backup = use('Backup')
const Idea = use('App/Models/Idea')
const PictureRepository = use('App/Repositories/Picture')
const VideoRepository = use('App/Repositories/Video')
const DetailRepository = use('App/Repositories/Detail')

class IdeaRepository {

  constructor() {
    this.picture = new PictureRepository()
    this.videos = new VideoRepository()
    this.detail = new DetailRepository()
    autoBind(this)
  }

  paginate(options) {
    return Idea.query()
      .with('admin')
      .with('pictures')
      .with('details')
      .with('videos')
      .orderBy('updated_at', 'DESC')
      .paginate(options.page, options.limit)
  }

  find(id) {
    return Idea
      .query()
      .with('admin')
      .with('pictures')
      .with('details')
      .with('videos')
      .where('id', id)
      .first()
  }

  async create(idea) {

    const ideaModel = await Idea.create({
      title: idea.title,
      admin_id: idea.admin.id,
      description: idea.description,
    })

    Backup.table('idea').set(idea, ideaModel.id)

    !isEmpty(idea.details) && await this.detail.update(ideaModel, idea.details)
    !isEmpty(idea.pictures) && await this.picture.addTo(ideaModel, idea.pictures)
    !isEmpty(idea.videos) && await this.videos.addTo(ideaModel, idea.videos)

    return ideaModel
  }

  async edit(ideaModel, idea) {

    Backup.table('idea').set(idea, ideaModel.id)

    ideaModel.merge({
      title: idea.title,
      admin_id: idea.admin.id,
      description: idea.description,
    })

    await ideaModel._save()

    !isEmpty(idea.details) && await this.detail.update(ideaModel, idea.details)
    !isEmpty(idea.pictures) && await this.picture.update(ideaModel, idea.pictures)
    !isEmpty(idea.videos) && await this.videos.update(ideaModel, idea.videos)

    return ideaModel
  }
}

module.exports = IdeaRepository
