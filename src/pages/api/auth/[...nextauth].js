import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/utils/db';
import User from '@/utils/models/user';
import bcrypt from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        await connectDB();

        const { email, password } = credentials;

        try {
          const user = await User.findOne({ email: email });
          
          if (!user) {
            console.log('No user found with this email');
            throw new Error('No user found with this email');
          }
          
          const isValidPassword = await bcrypt.compare(password, user.password);
          if (!isValidPassword) {
            console.log('Invalid password');
            throw new Error('Invalid password');
          }
          console.log("User authenticated:", user.email);
          return {id:user._id, email: user.email || null };
        } catch (error) {
          console.error('Error in authorize function:', error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge:60*60*24*2
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
      };
      return session;
    }
    
  },
  secret: process.env.NEXTAUTH_SECRET
});