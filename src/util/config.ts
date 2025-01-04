/*import { Database } from '../db'
import { Firehose } from '@atproto/sync'
import { JetstreamFirehose } from '../util/jetstream-subscription'*/
import { Logger } from '../util/logger'
/*import type { OAuthClient } from '@atproto/oauth-client-node'
import { BidirectionalResolver } from '../id-resolver'*/

import dotenv from 'dotenv'
import { bool, cleanEnv, host, num, port, str, testOnly, url } from 'envalid'

export type AppContext = {
  //db: Database
  //ingester: Firehose | JetstreamFirehose
  logger: Logger
  //oauthClient: OAuthClient
  //resolver: BidirectionalResolver
}

dotenv.config()

export const env = cleanEnv(process.env, {
  /*NODE_ENV: str({
    devDefault: testOnly('test'),
    choices: ['development', 'production', 'test'],
  }),
  HOST: host({ devDefault: testOnly('localhost') }),
  PORT: port({ devDefault: testOnly(3000) }),
  PUBLIC_URL: str({}),
  DB_PATH: str({ devDefault: ':memory:' }),
  FIREHOSE_ENDPOINT: str({ default: 'wss://bsky.network' }),
  JETSTREAM_ENDPOINT: str({ default: 'wss://jetstream1.us-east.bsky.network' }),
  SUBSCRIPTION_MODE: str({
    devDefault: 'Firehose',
    choices: ['Firehose', 'Jetstream'],
  }),
  COOKIE_SECRET: str({ devDefault: '00000000000000000000000000000000' }),*/
  DEBUG_MODE: bool({ default: false }),

  //BSKY_VERSION: num({}),
  NODE_ENV: str({
    devDefault: testOnly('test'),
    choices: ['production', 'test'],
  }),
  BSKY_PUBLIC_URL: url({}),
  BSKY_SERVICE_SIGNING_KEY: str({devDefault: testOnly(''),}),
  /*BSKY_SERVER_DID: str({}),
  BSKY_PORT: port({}),
  BSKY_DID_PLC_URL: url({}),
  BSKY_ALT_AUDIENCE_DIDS: str({}),
  BSKY_ENTRYWAY_JWT_PUBLIC_KEY_HEX: str({}),
  BSKY_HANDLE_RESOLVE_NAMESERVERS: str({}),
  BSKY_CDN_URL: url({}),
  BSKY_IMG_URI_ENDPOINT: url({}),
  BSKY_VIDEO_PLAYLIST_URL_PATTERN: str({}),
  BSKY_VIDEO_THUMBNAIL_URL_PATTERN: str({}),
  BSKY_BLOB_CACHE_LOC: str({}),
  BSKY_SEARCH_URL: url({}),
  BSKY_SEARCH_ENDPOINT: url({}),
  BSKY_SUGGESTIONS_URL: url({}),
  BSKY_SUGGESTIONS_API_KEY: str({}),
  BSKY_TOPICS_URL: url({}),
  BSKY_TOPICS_API_KEY: str({}),
  BSKY_DATAPLANE_URLS: str({}),
  BSKY_DATAPLANE_HTTP_VERSION: num({}),
  BSKY_DATAPLANE_IGNORE_BAD_TLS: bool({}),
  BSKY_LABELS_FROM_ISSUER_DIDS: str({}),
  BSKY_BSYNC_URL: url({}),
  BSKY_BSYNC_API_KEY: str({}),
  BSKY_BSYNC_HTTP_VERSION: num({}),
  BSKY_BSYNC_IGNORE_BAD_TLS: bool({}),
  BSKY_COURIER_URL: url({}),
  BSKY_COURIER_API_KEY: str({}),
  BSKY_COURIER_HTTP_VERSION: num({}),
  BSKY_COURIER_IGNORE_BAD_TLS: bool({}),
  BSKY_BLOB_RATE_LIMIT_BYPASS_KEY: str({}),
  BSKY_BLOB_RATE_LIMIT_BYPASS_HOSTNAME: host({}),
  BSKY_ADMIN_PASSWORDS: str({}),
  BSKY_ADMIN_PASSWORD: str({}),
  MOD_SERVICE_DID: str({}),
  BSKY_STATSIG_KEY: str({}),
  BSKY_STATSIG_ENV: str({}),
  BSKY_CLIENT_CHECK_EMAIL_CONFIRMED: bool({}),
  BSKY_TOPICS_ENABLED: bool({}),
  BSKY_INDEXED_AT_EPOCH: str({}),
  BSKY_BIG_THREAD_URIS: str({}),
  BSKY_BIG_THREAD_DEPTH: num({}),
  BSKY_MAX_THREAD_DEPTH: num({}),*/
})
