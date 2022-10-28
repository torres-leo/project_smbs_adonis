import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Topic from "App/Models/Topic";

export default class TopicsController {
  public async getTopics({ request }) {
    const page = request.input('page', 1)
    const limit = 20
    const topics = await Topic.query().paginate(page, limit)
    return topics
  }

  public async getTopic({ params }: HttpContextContract) {
    try {
      const topic = await Topic.findOrFail(params.id)
      return topic

    } catch (error) {
      if (error == "Exception: E_ROW_NOT_FOUND: Row not found") return `Topic with id: ${params.id} was Not Found. Try with other ID.`
      console.log(error)
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const { title, description } = request.body()
      Topic.create({ title, description })
      return response.created("Topic Created.")
    }
    catch (error) {
      console.log("Failed to create Topic", error)
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    const topic = await Topic.findOrFail(params.id)
    topic.title = request.input("title")
    topic.description = request.input("description")
    topic.save()
    return response.status(202).send(topic)
  }

  public async delete({ response, params }: HttpContextContract) {
    try {
      const topic = await Topic.findOrFail(params.id)
      topic.delete()
      return response.status(202).send("Topic deleted")
    } catch (error) {
      if (error == "Exception: E_ROW_NOT_FOUND: Row not found") return `Topic with id: ${params.id} was Not Found. Try with other ID.`
      console.log(error)
    }
  }
}
