import Prismic from '@prismicio/client'


export const endpoint = process.env.PRISMIC_ENDPOINT

export function getPrismicClient(req?: unknown) {
    const client = Prismic.client(endpoint, {
        req,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    })

    return client
}
