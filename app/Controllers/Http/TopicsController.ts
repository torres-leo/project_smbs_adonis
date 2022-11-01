import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Topic from "App/Models/Topic";
import { logger } from '../../../helpers/default.logger';
import { topicSchemaValidator } from '../../../validations';

export default class TopicsController {

  public async getTopics({ request }) {

    const page = request.input('page', 1)
    const limit = request.input('limit', 20)
    const title = request.input("title")
    if (title) {
      return await Topic.query().where("title", title)
    } else {
      return await Topic.query().paginate(page, limit)
    }
  }

  public async getTopic({ params, response }: HttpContextContract) {
    try {
      const topic = await Topic.findOrFail(params.id)
      return topic
    } catch (error) {
      response.status(404).send("Failed to get Topic", error)
      logger.info("Failed to get Topic:", error)
    }
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({ schema: topicSchemaValidator })
      await Topic.create(payload)
    }
    catch (error) {
      response.badRequest(error.messages)
      logger.error('Failed to create Topic... ', error.messages)
    }
  }


  public async update({ request, params, response }: HttpContextContract) {
    // topic.description = request.input("description")
    // topic.title = request.input("title")
    try {
      const payload = await request.validate({ schema: topicSchemaValidator })
      const topic = await Topic.findOrFail(params.id)
      topic.merge(payload)
      await topic.save()
    } catch (error) {
      response.badRequest({ message: `Failed to get Topic: ${params.id}`, error: error.message })
      logger.error(error)
    }
  }

  public async delete({ response, params }: HttpContextContract) {
    try {
      const topic = await Topic.findOrFail(params.id)
      topic.delete()
      return response.status(202).send("Topic deleted")
    } catch (error) {
      // if (error == "Exception: E_ROW_NOT_FOUND: Row not found") {
      //   logger.info(`Topic with id: ${params.id} was Not Found. Try with other ID.`)
      //   response.badRequest(error)
      //   return
      // }
      logger.error(error)
      response.badRequest(error)
    }
  }
}
