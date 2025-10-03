import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar/page";
import Footer from "./Footer/page";
import SessionWrapper from "./HelperWrapper/SessionWrapper";
import { ToastContainer } from "react-toastify";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Get me a coffee - Home",
  description: "A donation platform for creators, where fans can give small amount of money to their fevorite creator to Support Him/Her",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        <SessionWrapper>
          <div>
            <Navbar />
            <div className="[background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] z-0">
              <div className="absolute inset-0 z-10 h-full w-full items-center px-5 py-24"></div>
              <div className="relative z-20 text-white">
                {children}
              </div>
            </div>
            <Footer />
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </SessionWrapper>
      </body>
    </html>
  );
}
