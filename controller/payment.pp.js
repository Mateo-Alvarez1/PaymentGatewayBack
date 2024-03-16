import axios from 'axios'

export class PaymentPpController {
  static async createOrder (req, res) {
    const order = {
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: '349.00'
        }
      }
      ],
      application_context: {
        brand_name: 'PaymentGateway',
        landing_page: 'NO_PREFERENCE',
        user_action: 'PAY_NOW',
        return_url: 'https://paymengateway.netlify.app/payed',
        cancel_url: 'https://paymengateway.netlify.app/'
      }
    }

    const params = new URLSearchParams()
    params.append('grant_type', 'client_credentials')

    const { data } = await axios.post(`${process.env.PAYPAL_API_URL}/v1/oauth2/token`, params, {
      auth: {
        username: process.env.PAYPAL_API_CLIENT,
        password: process.env.PAYPAL_API_SECRET
      }
    })

    const response = await axios.post(`${process.env.PAYPAL_API_URL}/v2/checkout/orders`, order, {
      headers: {
        Authorization: `Bearer ${data.access_token}`
      }
    })

    return res.json(response.data)
  }

  static async captureOrder (req, res) {
    const { token } = req.query

    const response = await axios.post(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${token}/capture`, {}, {
      auth: {
        username: process.env.PAYPAL_API_CLIENT,
        password: process.env.PAYPAL_API_SECRET
      }
    })

    console.log(response.data)
    return res.json('payed')
  }
}
