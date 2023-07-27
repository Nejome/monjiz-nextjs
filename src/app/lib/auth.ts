import { AxiosResponse } from "axios"
import { NextAuthOptions } from "next-auth"
import { Session, User } from "next-auth"
import { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import { Auth } from "@/types"
import { AuthResponse } from "@/types/next-auth"
import axios from "axios"

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            type: "credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(
                credentials,
                req
            ): Promise<AuthResponse | any> {
                const { email, password } = credentials as {
                    email: string
                    password: string
                };

                const response = await axios
                    .post("http://monjiz-server.test/api/users/login", { email, password })
                    .then((res: AxiosResponse<Auth>) => res.data)
                    .catch((err) => {
                        if (err.response?.data) {
                            return Promise.reject(new Error(err.response.data))
                        }

                        return Promise.reject(err)
                    })

                if (response) {
                    return {
                        user: response.user,
                        access_token: response.token,
                    };
                }

                return null;
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        session(params: {
            session: Session | any
            user: User
            token: JWT | any
        }) {
            params.session.user = params.token.user
            params.session.access_token = params.token.access_token

            return params.session;
        },
        jwt(params: { token: JWT; user?: User | any }) {
            if (params.user) {
                params.token.user = params.user.user
                params.token.access_token = params.user.access_token
            }

            return params.token;
        },
    }
};