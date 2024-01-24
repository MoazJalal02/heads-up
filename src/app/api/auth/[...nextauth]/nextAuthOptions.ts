import { NextAuthOptions } from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import Google from "next-auth/providers/google"
import { Adapter } from "next-auth/adapters"
import { mergeAnonymousIntoUserCart } from "@/app/cart/actions"
import type { User } from "next-auth"

interface ExtendedUser extends User {
    role?: string | null | undefined;
}

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise) as Adapter,
    providers: [
        Google({
            async profile(profile) {
                let userRole = "Default"
                if(profile?.email === "moazadil02@gmail.com"){
                    userRole = "Admin"
                }

                const userProfile = {
                    ...profile,
                    role: userRole,
                    id: profile.sub,
                }
                return userProfile
            },
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })
    ],
    callbacks: {
        async session({ session, user, token }) {
            if(session.user){
                session.user.id = user.id
                if(session.user.email === "moazadil02@gmail.com"){
                    session.user.role = "Admin"
                }
                else {
                    session.user.role = "Default"
                }
            }
            return session
        }
    },
    events: {
        async signIn({ user }) {
            await mergeAnonymousIntoUserCart(user.id)
        },
    },
    debug: process.env.NODE_ENV === "development"
}