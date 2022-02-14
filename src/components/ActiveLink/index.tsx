import { ReactElement, cloneElement } from 'react'
import NextLink, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'

interface ActiveLinkProps extends LinkProps {
    children: ReactElement
    activeClassName: string
}

export function ActiveLink({
    activeClassName,
    children,
    ...rest
}: ActiveLinkProps) {
    const { asPath } = useRouter()

    const className = asPath === rest.href ? activeClassName : ''

    return (
        <NextLink {...rest}>
            {cloneElement(children, {
                className
            })}
        </NextLink>
    )
}
