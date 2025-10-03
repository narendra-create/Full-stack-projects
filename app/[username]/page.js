import React from 'react'
import PaymentPage from '../PaymentPage/page'
import User from '../Models/User'
import { notFound } from 'next/navigation'
import dbConnect from '@/lib/dbconnect'



export async function generateMetadata({ params }) {
    const aw = await params
    const identifier = decodeURIComponent(aw.username).split('@')[0];
    return {
        title: `Donations - ${identifier} - Get me a coffee`,
        description: `Support ${identifier} with a coffee!`
    };
}

const Username = async ({ params }) => {
    const aw = await params
    await dbConnect()

    // this comes from route: /username/[something]
    const identifier = decodeURIComponent(aw.username)

    // Find user by email (stable key)
    const dbUser = await User.findOne({ email: identifier }).lean()

    if (!dbUser) {
        return notFound()
    }

    // username only for display
    const cleanUser = dbUser.username

    return (
        <PaymentPage
            username={cleanUser}     // pretty name for UI
            raw={dbUser.email}       // stable key for fetching
        />
    )
}

export default Username
