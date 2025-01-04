/*import http from 'http'
import events from 'events'
import express from 'express'

import { createClient } from './auth/client'
import { createDb, migrateToLatest } from './db'
import { createBidirectionalResolver, createIdResolver } from './id-resolver'*/
import { AppContext } from './util/config'
import { createLogger } from './util/logger'
/*import { createIngester } from './ingester'
import { createRouter } from './routes'*/

import { BskyAppView, ServerConfig } from '@atproto/bsky'
import { Secp256k1Keypair } from '@atproto/crypto'

export class Server {
  constructor(
    //public app: express.Application,
    public server: BskyAppView,
    public ctx: AppContext,
  ) {
    //this.app = app
    this.server = server
    this.ctx = ctx
  }

  static async create() {
    const logger = createLogger({name: 'Server'})
    logger.debug(`Creating Server`)/*

    // Set up the SQLite database
    const db = createDb(env.DB_PATH)

    // Create the atproto utilities
    const oauthClient = await createClient(db)
    const baseIdResolver = createIdResolver()
    const ingester = createIngester(db, baseIdResolver)
    const resolver = createBidirectionalResolver(baseIdResolver)*/
    const ctx = {
      //db,
      //ingester,
      logger,
      //oauthClient,
      //resolver,
    }/*

    // Create our server
    const app: express.Express = express()
    app.set('trust proxy', true)

    // Routes & middlewares
    const router = createRouter(ctx)
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(router)
    app.use((_req, res) => res.redirect('/'))*/

    const config = ServerConfig.readEnv()
    //assert(env.serviceSigningKey, 'must set BSKY_SERVICE_SIGNING_KEY')
    const signingKey = process.env.BSKY_SERVICE_SIGNING_KEY
      ? await Secp256k1Keypair.import(process.env.BSKY_SERVICE_SIGNING_KEY, { exportable: true })
      : await Secp256k1Keypair.create({ exportable: true })
    logger.debug(`ROTATION_KEY=${signingKey.did()}`)
    logger.debug(`BSKY_SERVICE_SIGNING_KEY=${Buffer.from(await signingKey.export()).toString('hex')}`)
    const server = BskyAppView.create({ config, signingKey })

    /*const exported = await serviceKeypair.export()
    const plcClient = new PlcClient(cfg.plcUrl)

    const url = `http://localhost:${port}`
    const serverDid = await plcClient.createDid({
      signingKey: serviceKeypair.did(),
      rotationKeys: [serviceKeypair.did()],
      handle: 'bsky.test',
      pds: `http://localhost:${port}`,
      signer: serviceKeypair,
    })
    console.log(`SERVER_DID=${serverDid}`)*/


    return new Server(server, ctx)
  }

  async start() {
    this.ctx.logger.debug(`Starting Server`)
    /*await migrateToLatest(this.ctx.db)
    this.ctx.ingester.start()
    this.server = this.app.listen(env.PORT)
    await events.once(this.server, 'listening')*/
    this.server.start()
    this.ctx.logger.info(`Server listening on http://localhost:${process.env.BSKY_PORT}`)
  }

  async close() {
    this.ctx.logger.info('Stopping server')
    await this.server.destroy()
    /*return new Promise<void>((resolve) => {
      if (this.server) {
        this.server.close(() => {
          this.ctx.logger.info('Server closed [0]')
          resolve()
        })
      } else {
        this.ctx.logger.info('Server closed [1]')
      }
    })*/
    this.ctx.logger.info('Server closed')
  }
}
