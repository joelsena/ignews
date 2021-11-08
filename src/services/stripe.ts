import Stripe from 'stripe'

import packageJSON from '../../package.json'

// SDK do stripe para manipulação da API
// Ferramenta que possibilita seu site a receber pagamentos por internet.
export const stripe = new Stripe(
    process.env.STRIPE_API_KEY,
    {
        apiVersion: '2020-08-27',
        appInfo: {
            name: 'Ignews',
            version: packageJSON.version
        }
    }
)
