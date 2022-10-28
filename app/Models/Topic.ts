import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'

export default class Topic extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  // @column.dateTime({ autoCreate: true, serialize: (value: DateTime) => value.toFormat('dd LLL yyyy') }) // to get only day, month and year 
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static saveTopic(topic: Topic) {
    topic.title = topic.title.trim()
    topic.description = topic.description.trim()
  }
}
