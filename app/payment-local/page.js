"use client";

import dbConnect from "@/lib/dbconnect";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast, Bounce } from 'react-toastify';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PaymentStatusPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [status, setStatus] = useState();
  const { data: session } = useSession();
  const router = useRouter();
  const encodedEmail = session?.user?.email
    ? encodeURIComponent(session.user.email)
    : null;


  useEffect(() => {
    if (orderId) {
      fetch("/api/pay/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      })
        .then((res) => res.json())
        .then((data) => setStatus(data.status))
        .catch(() => setStatus("ERROR"));
    }
    if (status) {
      if (status === 'PAID') {
        toast('Thanks for Donation 💖', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
      if (status !== "PAID") {
        toast.error('Payment Failed ⚠️', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      }
    }
  }, [status]);


  if (!orderId) return <p>Missing order ID 🚨</p>;
  if (!status) return <p>Checking payment status...</p>;


  return (
    <div className="flex items-top justify-center h-screen">
      <div className="p-8 pt-46 rounded-lg shadow-md text-center">
        {status === "PAID" ? (
          <>
            <h1 className="text-5xl font-bold text-green-600">Payment Successful 🎉</h1>
            <p className="mt-5">Order ID: {orderId}</p>
            <div className="mt-12">
              <Link href={`/${encodedEmail}`} className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
              focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
              font-medium rounded-4xl text-sm px-5 py-2.5 text-center me-2 mb-2">Go Back to Creator page</Link>
            </div>
          </>
        ) : status !== "PAID" ? (
          <>
            <h1 className="text-5xl font-bold text-red-600">Payment Failed ❌</h1>
            <p className="mt-5">Order ID: {orderId}</p>
            <div className="flex mt-12 justify-center gap-8">
              <Link href={'/'} className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
              focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
              font-medium rounded-4xl text-sm px-5 py-2.5 text-center me-2 mb-2">Go To Homepage</Link>
              <Link href={`/${encodedEmail}`} className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl 
              focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
              font-medium rounded-4xl text-sm px-5 py-2.5 text-center me-2 mb-2">Try Again</Link>
            </div>
          </>
        ) : (
          <p>Status: {status}</p>
        )}
      </div>
    </div>
  );
}
