import { GetServerSideProps } from 'next'
import Image from 'next/image'

import AvatarImage from '../../public/images/avatar.svg'
import { SubscribeButton } from '../components/SubscribeButton'
import { CustomHead } from '../shared/CustomHead'
import styles from '../styles/home.module.scss'

export default function Home(props) {
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
                        <span>for $9.90 month</span>
                    </p>

                    <SubscribeButton />
                </section>

                <Image src={AvatarImage} alt="Girl coding" />
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    return {
        props: {}
    }
}
