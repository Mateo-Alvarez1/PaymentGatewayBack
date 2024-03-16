import { Router } from 'express'
import { PaymentPpController } from '../controller/payment.pp.js'

export const paymentPpRouter = Router()

paymentPpRouter.post('/create-order', PaymentPpController.createOrder)
paymentPpRouter.get('/capture-order', PaymentPpController.captureOrder)
