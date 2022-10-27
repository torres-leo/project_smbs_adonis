import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Topic from "App/Models/Topic";

export default class TopicsController {
  public async getTopics() {
    return Topic.all()
  }

  public async create({ request, response }: HttpContextContract) {
    Topic.create({ title: request.input('title'), description: request.input('description') })
    return response.status(201).json({ 'created': true })
  }

  public async update({ request, response, params }: HttpContextContract) {
    const topic = await Topic.findOrFail(params.id)
    topic.save()
    return topic
  }
}
