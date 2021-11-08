import NextAuth from "next-auth"
import Providers from "next-auth/providers"

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
})
