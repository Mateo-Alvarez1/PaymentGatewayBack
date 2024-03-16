import express, { json } from 'express'
import { paymentPpRouter } from './routes/payment.pp.js'
import { corsMiddleware } from './middleware/cors.js'
import dotenv from 'dotenv'
import morgan from 'morgan'
import { paymentMpRouter } from './routes/payment.mp.js'

dotenv.config()
const PORT = process.env.PORT ?? 3000
const app = express()
app.use(corsMiddleware())
app.use(morgan('dev'))
app.use(json())
app.disable('x-powered-by')
app.use('/', paymentPpRouter)
app.use('/mp', paymentMpRouter)

app.listen(PORT, () => {
  console.log(`Server listen in : http://localhost:${PORT}`)
})
