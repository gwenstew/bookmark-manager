import { DefautlSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            
        } & DefautlSession["user"];
    }
    
    interface User {
        id: string;
        name?: string | null;
        email?: string | null;

    }

}

