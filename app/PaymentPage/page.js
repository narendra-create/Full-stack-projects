"use client"

import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Script from 'next/script'



const PaymentPage = ({ username, raw }) => {

    const [One, setOne] = useState({ name: "", massage: "", amount: "" })
    const [Currentuser, setCurrentuser] = useState({})
    const [Payments, setPayments] = useState([])
    const [loading, setLoading] = useState(false);

    const UserName = username
    const { data: session, status } = useSession()
    const router = useRouter()

    const handelchange = (e) => {
        setOne({ ...One, [e.target.name]: e.target.value })
    }

    const getdata = async () => {
        try {
            const userRes = await fetch(`/api/fetchuser?email=${raw}`)
            if (!userRes.ok) throw new Error("Failed to fetch user");
            const u = await userRes.json();
            setCurrentuser(u)



            const paymentRes = await fetch(`/api/fetchpayments?creator_id=${u.creator_id}`)


            if (!paymentRes.ok) throw new Error("Failed to fetch payments")
            const dbpayment = await paymentRes.json();
            setPayments(dbpayment)
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getdata()

    }, [])



    const startPayment = async (amount) => {
        setLoading(true);

        try {
            if (typeof window.Cashfree === "undefined") {
                alert("Cashfree SDK not loaded yet, try again.");
                setLoading(false);
                return;
            }



            // Step 1: Create order
            const res = await fetch("/api/create-order", {
                method: "POST",
                body: JSON.stringify({
                    name: One?.name,
                    userCashfreeId: Currentuser?.Cashfreeid,
                    userCashfreeSecret: Currentuser?.Cashfreesecret,
                    amount: amount,
                    customerId: Currentuser?.username,
                    customerEmail: session.user.email,
                    customerPhone: "9999999999",
                    message: One?.massage,
                    creatorid: Currentuser?.creator_id
                }),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            const { payment_session_id } = data;

            if (!payment_session_id) {
                throw new Error("No payment session ID received from server");
            }

            // Step 2: Open checkout
            const cashfree = new window.Cashfree({ mode: "sandbox" });
            cashfree.checkout({ paymentSessionId: payment_session_id });

        } catch (error) {
            console.error("Payment error:", error);
            alert(`Payment failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        if (status !== "loading" && !session) {
            router.push("/Login")
        }
    }, [session, status, router])

    if (status === "loading") {
        return <p>Loading...</p>
    }

    return (

        <div className="min-h-screen flex flex-col">
            <Script
                src="https://sdk.cashfree.com/js/v3/cashfree.js"
                strategy="afterInteractive"
                onLoad={() => {
                    console.log("✅ Cashfree v3 SDK loaded");
                }}
            />

            {/* Main content wrapper */}
            <main className="flex-grow">
                <div className="relative">
                    <div className="back h-120 w-full">
                        {Currentuser?.coverpic?.match(/\.(mp4|webm|ogg)$/i) ? (
                            <video
                                className="absolute top-0 left-0 w-full h-full object-cover object-[50%_25%] -z-10"
                                autoPlay
                                muted
                                loop
                                playsInline
                            >
                                <source src={Currentuser?.coverpic} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>) : (<img
                                className="absolute top-0 left-0 w-full h-full object-cover object-[50%_25%] -z-10"
                                src={Currentuser?.coverpic}
                                alt="Cover"
                            />)
                        }
                    </div>
                    <div className="rounded-full bg-red-50 absolute z-10 top-96 left-[45.5%]">
                        <img
                            src={Currentuser?.profilepic}
                            alt="Profile Picture"
                            className="border-white border-2 object-cover rounded-full w-45 h-45"
                        />
                    </div>
                </div>

                {/* Profile info */}
                <div className="flex flex-col items-center justify-center mt-24 gap-3">
                    <div className="text-3xl">@{Currentuser?.username}</div>
                    <div className="flex flex-col text-gray-300 justify-center text-center items-center gap-1">
                        <div>Help {username} by a coffee</div>
                        <div>{Payments.length} Donations • <strong>₹{Payments.reduce((a, b) => a + b.amount, 0)} Raised </strong></div>
                    </div>
                    <div className='flex h-112 my-20 mb-25 gap-5 items-start w-320'>
                        {/* Support section */}
                        <div className="bg-neutral-900 support flex p-5 rounded-lg w-1/2 h-104 gap-2 items-start  mx-auto justify-start ">
                            <div className="max-h-90 overflow-y-auto
                                      [&::-webkit-scrollbar]:w-2
                                      [&::-webkit-scrollbar-track]:rounded-full
                                      [&::-webkit-scrollbar-track]:bg-gray-100
                                      [&::-webkit-scrollbar-thumb]:rounded-full
                                     [&::-webkit-scrollbar-thumb]:bg-gray-300
                                     dark:[&::-webkit-scrollbar-track]:bg-neutral-800
                                     dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                <div className='flex flex-col gap-4 ml-8 my-5 pt-3 pl-2'>
                                    <h2 className="text-2xl font-bold">Top 10 Supporters 🔥</h2>
                                    <ul className="flex flex-col mt-5 ml-5 h-[80%]">
                                        {Payments.length == 0 && <li className='text-md mb-4 w-full'>No Donations yet ☹️</li>}
                                        {Payments.slice(0, 10).map((p, i) => (
                                            <li key={p.oid || i} className="text-md flex gap-2 mb-4 w-full items-center">
                                                <span>
                                                    <img src="/avatar.gif" alt="Avatar" className="w-6 top-0 bg-yellow-50 rounded-full" />
                                                </span>
                                                <span className='self-start'>
                                                    <strong>{p.name}</strong> donated <strong className='text-green-400'>₹{p.amount}</strong> with message <i className='text-red-200'>"{p.message}"</i>
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                        </div>
                        <div className="w-1/2 flex rounded-lg min-h-40 flex-col gap-5 p-8 bg-neutral-900">
                            <h2 className='text-2xl font-bold' >Make a Payment</h2>
                            <div className='flex gap-3 flex-col'>
                                <input type="text" required name="name" onChange={(e) => handelchange(e)} value={One.name} id="name" placeholder='Enter Name' className='pl-8 w-full p-3 rounded-lg bg-slate-800' />
                                <input type="text" required name="massage" onChange={(e) => handelchange(e)} value={One.massage} id="massage" placeholder='Enter Massage' className='pl-8 w-full p-3 rounded-lg bg-slate-800' />
                                <input type="number" required name="amount" onChange={(e) => handelchange(e)} value={One.amount} id="amount" placeholder='Enter Amount' className='pl-8 w-full p-3 rounded-lg bg-slate-800' />
                                <button onClick={() => startPayment(Number(One.amount))} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:from-purple-100 " disabled={One.name?.length < 3 || One.massage?.length < 4 || One.amount?.length < 1} >
                                    <span className="relative px-67 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                                        PAY
                                    </span>
                                </button>
                            </div>
                            <div className='flex gap-3 my-1'>
                                <button onClick={() => startPayment(10)} className='disabled:bg-gray-500 disabled:cursor-not-allowed disabled:from-purple-100 bg-slate-700 rounded-lg py-3 px-6' disabled={One.name?.length < 3 || One.massage?.length < 4}>Pay ₹10</button>
                                <button onClick={() => startPayment(20)} className='disabled:bg-gray-500 disabled:cursor-not-allowed disabled:from-purple-100 bg-slate-700 rounded-lg py-3 px-6' disabled={One.name?.length < 3 || One.massage?.length < 4}>Pay ₹20</button>
                                <button onClick={() => startPayment(30)} className='disabled:bg-gray-500 disabled:cursor-not-allowed disabled:from-purple-100 bg-slate-700 rounded-lg py-3 px-6' disabled={One.name?.length < 3 || One.massage?.length < 4}>Pay ₹30</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </div>
    )
}


export default PaymentPage


