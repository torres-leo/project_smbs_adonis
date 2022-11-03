import Server from '@ioc:Adonis/Core/Server';

Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser')]);

Server.middleware.registerNamed({ topic: () => import("App/Middleware/TopicRequest") });
