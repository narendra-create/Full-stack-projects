import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";
import mongoose from 'mongoose';
import dbConnect from '@/lib/dbconnect';
import User from '@/app/Models/User';
import Payment from '@/app/Models/Payment';
import { v4 as uuidv4 } from 'uuid';


export const authoptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == "github" || account.provider == "google") {

                const userEmail = user.email || profile.email;
                if (!userEmail) {
                    console.error("No email found for user:", user);
                    return false; // blocks sign-in
                }

                //connect to db
                await dbConnect();
                const currentuser = await User.findOne({ email: userEmail })

                if (!currentuser) {
                    //create new user
                    const newuser = new User({
                        creator_id: uuidv4(),
                        email: userEmail,
                        username: userEmail.split("@")[0],
                    })
                    await newuser.save()
                    user.name = newuser.username
                }
                else {
                    user.name = currentuser.username
                }
                return true;
            }
        }
    }
}

const handler = NextAuth(authoptions);
export { handler as GET, handler as POST }