import Image from 'next/image'

import logoImage from '../../../public/images/logo.svg'
import Link from '../../shared/CustomLink'
import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Image src={logoImage} alt="ig.news" />

                <nav>
                    <a className={styles.active} href="#">
                        Home
                    </a>
                    <Link href="/posts">Posts</Link>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}
