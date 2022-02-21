import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { RichText } from 'prismic-dom'

import { getPrismicClient } from '../../services/prismic'
import { CustomHead } from '../../shared/CustomHead'
import styles from '../../styles/posts/post.module.scss'

interface PostProps {
    post: {
        slug: string
        title: string
        content: string
        updatedAt: string
    }
}

export default function Post({ post }: PostProps) {
    console.log(post)

    return (
        <>
            <CustomHead title={`${post.title} | ignews`} />

            <main className={styles.container}>
                <article className={styles.post}>
                    <h1>{post.title}</h1>
                    <time>{post.updatedAt}</time>
                    <div
                        className={styles.postContent}
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </article>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({
    req,
    params
}) => {
    const session = getSession({ req })

    const { slug } = params

    const prismic = getPrismicClient(req)
    const response = await prismic.getByUID<any>(
        'publication',
        String(slug),
        {}
    )

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString(
            'pt-BR',
            {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            }
        )
    }

    return {
        props: {
            post
        }
    }
}
