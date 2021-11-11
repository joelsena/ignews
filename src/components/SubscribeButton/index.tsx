import { useSession, signIn } from 'next-auth/client'

import { getStripeJs } from '../../services/stripe-js'
import styles from './styles.module.scss'
import { api } from '../../services/api'

interface SubscribeButtonProps {
    priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    const [session] = useSession()

    async function handleSubscribe() {
        if (!session) {
            signIn('github')
            return
        }

        // Criação da ckeckout session
        try {
            const {
                data: { sessionId }
            } = await api.post('subscribe')

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId })
        } catch (err) {
            alert(err.message)
        }
    }

    return (
        <button
            type="button"
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    )
}
