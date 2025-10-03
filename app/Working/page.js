import React from 'react'

const Working = () => {
    return (
        <div className='z-40'>
            <div className='text-white w-4/5 mx-auto text-5xl mb-28 font-bold'>📖 How It Works -:</div>
            <div className='text-white min-h-screen w-4/5 text-2xl flex flex-col gap-26 mx-auto'>
                <section className='flex flex-col gap-4'><h1 className='text-3xl font-semibold'>1️⃣ Find Your Creator</h1>
                    <div className='text-lg font-sans'>Browse and select your favorite creator — artist, developer, gamer, or storyteller.</div>
                </section>
                <hr className='opacity-30'/>
                <section className='flex flex-col gap-4'><h1 className='text-3xl font-semibold'>2️⃣ Write Your Message ✍️</h1>
                    <div className='text-lg font-sans'>Show your love! Type a personal message along with your donation.
                        (Example: “Here’s a coffee to fuel your next project 🚀”)</div>
                </section>
                <hr className='opacity-30'/>
                <section className='flex flex-col gap-4'><h1 className='text-3xl font-semibold'>3️⃣ Click Pay 💳</h1>
                    <div className='text-lg font-sans'>Choose your amount, hit the pay button, and your coffee reaches the creator instantly.</div>
                </section>
                <hr className='opacity-30'/>
                <section className='flex flex-col gap-4'><h1 className='text-3xl font-semibold'>4️⃣ Get Featured 🌟</h1>
                    <div className='text-lg font-sans'>Your name + message will appear on the creator’s profile along with other supporters.
                        (Like a public wall of gratitude — “ Tony Stark paid ₹100 with a message: Keep going!”)</div>
                </section>
                <hr className='opacity-30'/>
                <section className='mb-22 flex flex-col gap-5'><h1 className='text-3xl font-semibold'>🎉 That’s it!</h1>
                    <div className='text-lg font-sans'>Simple. Fast. Transparent.
                        One coffee = one step closer to creators achieving their dreams.</div>
                </section>
            </div>
        </div>
    )
}

export default Working

export const metadata = {
  title: "About - Get me a coffee",
};