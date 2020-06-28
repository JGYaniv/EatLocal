import app, { server as api } from './apps/api'

(async () => {
  app.use("")

  api.start(
    {
      port: PORT,
      endpoint: '/graphql',
      subscriptions: '/subscriptions',
      playground: '/playground'
    },
    ({ port }) => console.log(`Running on ${port}`)
  )
})().catch(console.error.bind(console))
