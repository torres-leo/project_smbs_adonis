import Topic from 'App/Models/Topic';
import Factory from '@ioc:Adonis/Lucid/Factory';

export default Factory.define(Topic, ({ faker }) => {
  return {
    title: faker.lorem.sentence(2),
    description: faker.lorem.sentence(5)
  }
}).build();
