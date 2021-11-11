import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import { query as q } from 'faunadb'

import { fauna } from '../../../services/fauna'

// SGBDs que tem pool para APIs serveless
// FaunaDB - HTTP
// DynamoDB - AWS

// Conexão rodando por 24h
// PostgreSQL, MongoDB - Utiliza uma conexão que permea por um longo prazo.
// O que para serveless functions não é bom porque precisaria refazer essa conexão toda vez, ou seja, muito custoso.

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            // Quais informações eu quero do usuário
            // Neste caso, só queremos as informações do perfil do mesmo
            scope: 'read:user'
        }),
        // ...add more providers here
    ],
    // jwt: {
    //     signingKey: process.env.SIGNING_KEY // Em produção é aconselhado a gerar um key correta com alguma lib
    // },
    callbacks: {
        async signIn(user, account, profile) {
            const { email } = user
            // console.log(user)

            try {
                // FQL - linguagem que o fauna utiliza para realizar operações no banco de dados
                // Lembrando que o fauna é um banco não relacional e schema free
                fauna.query(
                    q.If( // if
                        q.Not(
                            q.Exists(
                                q.Match(
                                    // Indíces são criados para gerar um nova estrutura de dados no intuito de facilitar a pesquisa no banco
                                    q.Index('user_by_email'),
                                    q.Casefold(user.email)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: { email } }
                        ),
                        q.Get( // else
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(user.email)
                            )
                        )
                    )
                )

                return true
            } catch {
                return false
            }
        }
    }
})

// Callback => são funções que vão ser executada automaticamente após uma ação
