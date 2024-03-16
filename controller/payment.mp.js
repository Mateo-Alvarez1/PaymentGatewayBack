import { MercadoPagoConfig, Preference } from 'mercadopago'
export class PaymentMpController {
  static async createOrder (req, res) {
    const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })
    const preference = await new Preference(client).create({
      body: {
        items: [
          {
            title: 'PaymentGateway',
            unit_price: 349,
            currency_id: 'USD',
            quantity: 1
          }
        ],
        back_urls: {
          success: 'https://paymengateway.netlify.app/payed',
          failure: 'https://paymengateway.netlify.app/'
        }
      }
    })
    console.log(preference)
    res.json(preference.init_point)
  }

  static async receiveWebHook (req, res) {
    console.log(req.body)
    res.json(req.body)
  }
}
