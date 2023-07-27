import {User} from "@/types"

export interface AuthResponse {
    user: User
    access_token: string
}

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: User
        access_token: string
    }
}