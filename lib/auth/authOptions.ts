//nextauth config and export here
import { prisma } from "@/lib/db/prisma";
import GoogleProvider from "next-auth/providers/google";
import { type NextAuthConfig } from "next-auth";


export const authOptions: NextAuthConfig = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }), //add more providers here
    ],

    callbacks: {
       async signIn({ user, account }) {
            if (account?.provider == "google") {
                if (!user.email) return false;
            

            //check if user already exists
            const existingUser = await prisma.user.findUnique({
                where: {email: user.email},
            });

            if (!existingUser) {
                //create new user
                await prisma.user.create({
                    data: {
                        email: user.email,
                        name: user.name,
                        password: "",
                    },
                });
            }

            // insert data if it doesnt exist, o/w update it
            await prisma.account.upsert({
                where: {
                    provider_providerAccountId: {
                        provider: account.provider,
                        providerAccountId: account.providerAccountId,
                    },
                },
                create: {
                    userId:
                        existingUser?.id ||
                        (
                            await prisma.user.findUnique({
                                where: {email: user.email},
                            })
                        )!.id,
                    type: account.type,
                    provider: account.provider,
                    providerAccountId: account.providerAccountId,
                    refresh_token: account.refresh_token,
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                    session_state: account.session_state?.toString() || null,
                },
                update: {
                    access_token: account.access_token,
                    expires_at: account.expires_at,
                    token_type: account.token_type,
                    scope: account.scope,
                    id_token: account.id_token,
                    session_state: account.session_state?.toString() || null,
                },
            });
        }
        return true;
       },
       //enrich session with fields from db
       async session({ session }) {
            if (session.user?.email) {
                const user = await prisma.user.findUnique({
                    where: ({email: session.user.email}),
                });
                if (user) {
                    session.user = {
                        ...session.user,
                        id: user.id,
                        name: user.name,                        
                    };
                }
            }
            return session;
       },
    },
    pages: {
        signIn: "/auth/signin",
    },
    session: {
        strategy: "jwt",
    },
};
