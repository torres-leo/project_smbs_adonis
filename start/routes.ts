import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.get('/', 'TopicsController.getTopics')
  Route.get('/:id', 'TopicsController.getTopic')
  Route.post('/', 'TopicsController.create')
  Route.patch('/:id', 'TopicsController.update')
  Route.delete('/:id', 'TopicsController.delete')
}).prefix('topics')
