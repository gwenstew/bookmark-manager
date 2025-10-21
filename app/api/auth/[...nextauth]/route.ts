// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/auth/authOptions";

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST};

//export const GET = NextAuth(authOptions);
//export const POST = NextAuth(authOptions);

import { handlers } from "@/lib/auth/authOptions";

export const { GET, POST } = handlers;
