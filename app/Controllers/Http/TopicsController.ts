import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Topic from "App/Models/Topic";
// import log4js from "log4js"
import { logger } from '../../../helpers/default.logger';
import { schema, rules } from "@ioc:Adonis/Core/Validator"

export default class TopicsController {

  public async getTopics({ request }) {
    // const log = log4js.getLogger("topics")

    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const title = request.input("title")
    let topics
    if (title) {
      topics = await Topic.query().where("title", title)
    } else {
      topics = await Topic.query().paginate(page, limit)
    }
    return topics
  }

  public async getTopic({ params, }: HttpContextContract) {
    try {
      const topic = await Topic.findOrFail(params.id)
      return topic
    } catch (error) {
      if (error == "Exception: E_ROW_NOT_FOUND: Row not found") return logger.info(`Topic with id: ${params.id} was Not Found. Try with other ID.`)
      logger.info(error)
    }
  }

  public async create({ request }: HttpContextContract) {
    const { title, description } = request.body()
    const newTopic = schema.create({ title: schema.string([rules.maxLength(50)]), description: schema.string([rules.maxLength(250)]) })
    try {
      Topic.create({ title, description })
      // return response.created("Topic Created.")
    }
    catch (error) {
      logger.error('Failed to create Topic', error)
    }
  }

  public async update({ request, params, response }: HttpContextContract) {
    try {
      const topic = await Topic.findOrFail(params.id)
      topic.title = request.input("title")
      topic.description = request.input("description")
      topic.save()
    } catch (error) {
      if (error == "Exception: E_ROW_NOT_FOUND: Row not found") return logger.info(`Topic with id: ${params.id} was Not Found. Try with other ID.`)
      response.badRequest(error.messages)
      // logger.info(error)
      // logger.info("Failed to update Topic", error)
    }
  }

  public async delete({ response, params }: HttpContextContract) {
    try {
      const topic = await Topic.findOrFail(params.id)
      topic.delete()
      return response.status(202).send("Topic deleted")
    } catch (error) {
      if (error == "Exception: E_ROW_NOT_FOUND: Row not found") return logger.info(`Topic with id: ${params.id} was Not Found. Try with other ID.`)
      logger.info(error)
    }
  }
}
