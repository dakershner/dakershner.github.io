import {
  mediaHandlerConfig,
  createMediaHandler,
} from 'next-tinacms-s3/dist/handlers'

import { isAuthorized } from '@tinacms/auth'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = mediaHandlerConfig

let handler
try {
  handler = createMediaHandler({
    config: {
      credentials: {
        accessKeyId: process.env.TINA_S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.TINA_S3_SECRET_ACCESS_KEY || '',
      },
      region: process.env.TINA_S3_REGION,
    },
    bucket: process.env.TINA_S3_BUCKET || '',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    authorized: async (req: NextApiRequest, _resUnused: NextApiResponse): Promise<boolean> => {
      if (process.env.NODE_ENV === 'development') {
        return true
      }
      try {
        const user = await isAuthorized(req)
        return Boolean(user && user.verified)
      } catch (e) {
        console.error(e)
        return false
      }
    },
  })
  console.log('[Tina S3 API] Media handler initialized successfully')
} catch (err) {
  console.error('[Tina S3 API] Failed to initialize media handler:', err)
}

export default handler 