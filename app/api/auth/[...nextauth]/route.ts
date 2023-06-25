import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { signIn } from 'next-auth/react';
import { connectToDB } from '@utils/database';
import User from '@models/user';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
     async session({session, token, user}) {
      const sessionUser = await User.findOne({
        email: session?.user?.email,
      });
      return {...session, user: { ...session.user, id: sessionUser._id.toString()}};
    },
    async signIn({ user, account, profile }) {
      try {
     
        await connectToDB();
        // check if user already exists
        const userExists = await User.findOne({ email: user?.email });

        if (!userExists) {
          await User.create({
            email: user?.email,
            username: user?.name?.replace(' ', '').toLowerCase(),
            image: user?.image,
          });
        }

        // if not create a new user
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
