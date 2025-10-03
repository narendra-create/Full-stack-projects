"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';


const PaymentStatus = () => {
    const searchParams = useSearchParams()
    const [status, setStatus] = useState('loading')
    const [orderId, setOrderId] = useState('')


    useEffect(() => {
        const checkPayment = async () => {
            const orderIdParam = searchParams.get('order_id')
            setOrderId(orderIdParam)
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/payment/status?order_id=${orderIdParam}`)
            const data = await res.json()

            if (data.success && data.done) {
                setStatus("success")
            } else {
                setStatus("error")
            }
        }
        const intervalId = setInterval(checkPayment, 3000); // every 3s
        checkPayment();
        return () => clearInterval(intervalId);
    }, [searchParams])




    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto mb-4"></div>
                    <p className="text-xl">Processing your payment...</p>
                </div>
            </div>
        )
    }

    if (status === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center max-w-md mx-auto p-8">
                    <div className="text-6xl mb-4">✅</div>
                    <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
                    <p className="text-gray-300 mb-6">
                        Thank you for your support! Your payment has been processed successfully.
                    </p>
                    <p className="text-sm text-gray-400 mb-8">
                        Order ID: {orderId}
                    </p>
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="block w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-6 py-3 text-center transition-all"
                        >
                            Back to Home
                        </Link>
                        <Link
                            href={username}
                            className="block w-full bg-gray-700 hover:bg-gray-600 font-medium rounded-lg text-lg px-6 py-3 text-center transition-all"
                        >
                           Go Back
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
            <div className="text-center max-w-md mx-auto p-8">
                <div className="text-6xl mb-4">❌</div>
                <h1 className="text-3xl font-bold mb-4">Payment Error</h1>
                <p className="text-gray-300 mb-6">
                    There was an issue processing your payment. Please try again.
                </p>
                <Link
                    href="/"
                    className="block w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-6 py-3 text-center transition-all"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    )
}

export default PaymentStatus






