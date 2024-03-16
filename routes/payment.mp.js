import { Router } from 'express'
import { PaymentMpController } from '../controller/payment.mp.js'

export const paymentMpRouter = Router()

paymentMpRouter.post('/create-order', PaymentMpController.createOrder)
paymentMpRouter.post('/webhook', PaymentMpController.receiveWebHook)
