import { CustomHead } from '../../shared/CustomHead'
import styles from '../../styles/posts.module.scss'

export default function Posts() {
    return (
        <>
            <CustomHead title="Posts | Ignews" />

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>12 de março de 2022</time>
                        <strong>
                            Creating a Monorepo with Lerna & Yarn Workspace
                        </strong>
                        <p>
                            In this guide, you will learn how to create a
                            Monorepo to manage multiple packages with a shared
                            bucket.
                        </p>
                    </a>
                    <a href="#">
                        <time>12 de março de 2022</time>
                        <strong>
                            Creating a Monorepo with Lerna & Yarn Workspace
                        </strong>
                        <p>
                            In this guide, you will learn how to create a
                            Monorepo to manage multiple packages with a shared
                            bucket.
                        </p>
                    </a>
                    <a href="#">
                        <time>12 de março de 2022</time>
                        <strong>
                            Creating a Monorepo with Lerna & Yarn Workspace
                        </strong>
                        <p>
                            In this guide, you will learn how to create a
                            Monorepo to manage multiple packages with a shared
                            bucket.
                        </p>
                    </a>
                </div>
            </main>
        </>
    )
}
