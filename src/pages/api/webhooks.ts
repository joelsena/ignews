import { stripe } from './../../services/stripe';
import { Stripe } from 'stripe';
import { NextApiHandler } from 'next'
import { Readable } from 'stream'


// WebHooks = É uma forma de APIs de terceiros enviarem callbacks personalizados
// no intuito de atualizar alguma informação na aplicação

async function buffer(readable: Readable) {
    // chunks = pedaços(no caso: pedaços da stream)
    const chunks = []

    for await (const chunk of readable) {
        chunks.push(
            typeof chunk === "string" ? Buffer.from(chunk) : chunk
        )
    }

    return Buffer.concat(chunks)
}

export const config = {
    api: {
        bodyParser: false
    }
}

const relevantEvents = new Set([
    'checkout.session.completed'
])

const WebHooksHandler: NextApiHandler = async (req, res) => {
    if (req.method === 'POST') {
        const buf = await buffer(req)
        const secret = req.headers['stripe-signature']

        let event: Stripe.Event

        try {
            event = stripe.webhooks.constructEvent(buf, secret, process.env.STRIPE_WEBHOOK_SECRET)
        } catch (err) {
            res.status(400).end(`Webhook error: ${err.message}`)
        }

        const { type } = event

        if (relevantEvents.has(type)) {
            console.log('Evento recebido', event)
        }

        res.json({ received: true })
    } else {
        res.setHeader('Allow', 'POST')
        res.status(405).end('Method not allowed')
    }
}

export default WebHooksHandler
