"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    creator_id: "",
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    Cashfreeid: "",
    Cashfreesecret: ""
  });

  useEffect(() => {
    document.title = "Dashboard - Get me a coffee";
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  useEffect(() => {
    if (!session) {
      router.push("/Login");
      return;
    }

    const decodedEmail = decodeURIComponent(session.user.email);
    const Cleanuser = decodedEmail.split("@")[0];

    const getData = async () => {
      try {
        const res = await fetch(`/api/fetchuser?email=${session.user.email}`);
        const data = await res.json();

        if (res.ok && data) {
          setForm((prev) => ({ ...prev, ...data }));
        } else {
          console.error("Error fetching user data:", data.error);
          alert(`Error loading profile: ${data.error || "Failed to load profile data"}`);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Error loading profile data. Please refresh the page.");
      }
    };

    getData();
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) return;

    try {
      const response = await fetch("/api/updateuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ creator_id: form.creator_id, ...form })
      });

      const result = await response.json();

      if (response.ok && result.success) {
        update();
        alert("Profile Updated!");
      } else {
        alert(`Error: ${result.message || "Failed to update profile"}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  if (!session) return <div className="h-screen text-center"><p>Loading....</p></div>;

  return (
    <div className="h-screen">
      <div className="text-center mt-20 w-full text-3xl">Dashboard</div>

      <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
        {/* Name */}
        <div className="relative z-0 w-full mb-5 mt-14 group">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="name"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Name
          </label>
        </div>

        {/* Email */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email
          </label>
        </div>

        {/* Username */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="username"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Username
          </label>
        </div>

        {/* Profile Pic */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="profilepic"
            value={form.profilepic}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="profilepic"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Profile Picture URL
          </label>
        </div>

        {/* Cover Pic */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="coverpic"
            value={form.coverpic}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="coverpic"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Cover Picture URL
          </label>
        </div>

        {/* Cashfree ID */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="Cashfreeid"
            value={form.Cashfreeid}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="Cashfreeid"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Cashfree ID
          </label>
        </div>

        {/* Cashfree Secret */}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="Cashfreesecret"
            value={form.Cashfreesecret}
            onChange={handleChange}
            className="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="Cashfreesecret"
            className="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Cashfree Secret
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Dashboard;

