import { User } from "@/types";

export type Auth = {
    user: User
    token: string | undefined
};
