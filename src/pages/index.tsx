import { GetStaticProps } from 'next'
import Image from 'next/image'

import { SubscribeButton } from '../components/SubscribeButton'
import AvatarImage from '../../public/images/avatar.svg'
import { CustomHead } from '../shared/CustomHead'
import styles from '../styles/home.module.scss'
import { formatPrice } from '../utils/formatPrice'
import { stripe } from '../services/stripe'

interface HomeProps {
    product: {
        priceId: string
        amount: string
    }
}

// JAMStack
// J => Javascript(Funcionamento do app)
// A => API(Ex: Stripe, FaunaDB, etc...)
// M => Markup(HTML)

// CMS (Content Managment System) => Sistemas que te dão toda uma interface já pronta + o painel de administração
//  - Wordpress
//  x Drupal
//  x Joomla
//  x Magento

// Headless CMS (Painel de administração + API HTTP, GraphQL, SDK)

// - Strapi
// - Ghost
// - Keystone

// Pagos:
// - GraphCMS
// - Prismic CMS
// - Contentful
// - Shopify
// - Saleor

export default function Home({ product }: HomeProps) {
    return (
        <>
            <CustomHead title="Home - ig.news" />

            <main className={styles.contentContainer}>
                <section className={styles.hero}>
                    <span>👋🏾 Hey, welcome</span>
                    <h1>
                        News about the <span>React</span> world.
                    </h1>
                    <p>
                        Get access to all the publications <br />
                        <span>for {product.amount} month</span>
                    </p>

                    <SubscribeButton priceId={product.priceId} />
                </section>

                <Image src={AvatarImage} alt="Girl coding" />
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    // Utilizar a SDK do stripe facilita pegarmos os dados que precisamos da plataforma
    // método retrieve() retorna somente um item. No caso retorna somente um preço desse produto
    // Meio que não executa chamadas HTTP
    const price = await stripe.prices.retrieve(
        'price_1Js9nVHUsYat5z1Msu0Ax2II'
        // {
        //     retorna todas as infos do produto
        //     expand: ['product']
        // }
    )

    const product = {
        priceId: price.id,
        // Sempre é recomendável tranformar o preço para centavos
        amount: formatPrice(price.unit_amount / 100)
    }

    return {
        props: {
            product
        },
        // Qual vai ser o intervalo que o next vai gerar/revalidar um novo HTML estático
        revalidate: 60 * 60 * 24 // 24 hours
    }
}
