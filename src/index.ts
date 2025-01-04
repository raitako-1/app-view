import dotenv from 'dotenv'
import { createLogger } from './util/logger'
import { Server } from './server'

const run = async () => {
  dotenv.config()
  const logger = createLogger({name: 'Runner'})
  logger.info(`Running AppView (${process.env.NODE_ENV})`)
  logger.debug(`debugMode: true`)
  
  const server = await Server.create()
  await server.start()

  const closeSignal = async () => {
    setTimeout(() => process.exit(1), 10000).unref()
    await server.close()
    process.exit()
  }

  process.on('SIGHUP', closeSignal)
  process.on('SIGINT', closeSignal)
  process.on('SIGTERM', closeSignal)
}

run()
