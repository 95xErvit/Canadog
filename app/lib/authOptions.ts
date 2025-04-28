import { authenticate } from "../Services/authService"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        User: { label: "User", type: "text" },
        Password: { label: "Password", type: "password" },
        TypeId: { label: "TypeId", type: "text" }
      },
      async authorize (credentials, req) {
        if (typeof credentials !== "undefined") {
          
          const { data: {result, statusCode}, res }: any = await authenticate(credentials.User, Number(credentials.TypeId) , credentials.Password)
          
          console.log(result, statusCode)

          if (result && statusCode == 200) 
          {
            return { ...res.user }
          } 
          else 
          {
            return null
          }
        } else {
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
}