import cors from 'cors'

export const corsMiddleware = () => cors({
  origin: function (origin, callback) {
    return callback(null, true)
    // if (!origin || origin.startsWith('https://')) {
    //   return callback(null, true)
    // } else {
    //   return callback(new Error('Access Denied'))
    // }
  }
})
