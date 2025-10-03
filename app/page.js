import Link from "next/link";
import Script from "next/script";

export default function Home() {
  return (
    <main className="min-h-screen text-white w-5/6 mx-auto mt-40">
      <Script src="https://platform.linkedin.com/badges/js/profile.js" async defer type="text/javascript"></Script>
      <section className="flex flex-col items-center justify-center gap-5">
        <div className="text-5xl font-mono font-extrabold mb-4">Fuel Creativity with a Cup of Coffee 🍵</div>
        <p className="text-2xl font-light opacity-70 leading-7 w-2/3 text-center">“A platform where your fans support you directly.
          <br />
          Whether it’s art, coding, music, or memes your coffee keeps the creativity flowing. Every contribution is a small boost that helps creators stay consistent and dream bigger.”</p>
        <div className="flex gap-3 mt-5">
          <Link href={'/Working'} className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-4xl text-lg px-5 py-2.5 text-center me-2 mb-2">Start Here</Link>
          <Link href={'/'} className="cursor-pointer text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-4xl text-lg px-5 py-2.5 text-center me-2 mb-2">Explore Creators</Link>
        </div>
      </section>
      <hr className="opacity-30 my-16 w-340 mx-auto" />
      <section className="flex justify-between w-full p-5 mt-28">
        <div className="flex flex-col items-center">
          <img src="/dev.gif" alt="Creator" className="w-54 bg-neutral-400 p-5 rounded-full" />
          <h3 className="text-xl mb-4 mt-4">You Are a Creator</h3>
          <p>You are good creator and Audience Want to support you</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="/coin.gif" alt="Creator" className="w-54 bg-neutral-400 p-5 rounded-full" />
          <h3 className="text-xl mb-4 mt-4">Fans Want to Help</h3>
          <p>You are precious fan of your fevorite creator</p>
        </div>
        <div className="flex flex-col items-center">
          <img src="/round.gif" alt="Creator" className="w-54 bg-neutral-400 p-5 rounded-full" />
          <h3 className="text-xl mb-4 mt-4">Coffee Subscription</h3>
          <p>Energice Your fevorite creator every month with Coffee</p>
        </div>

      </section>
      <section className="flex mt-20 items-center justify-center w-full">
        <div className=" p-8 flex flex-col gap-12 w-full">
          <hr className="opacity-30 my-5 w-396 mx-auto" />
          <h1 className="text-4xl font-bold mr-60">About me</h1>
          <div  className="flex items-center h-70">
            <div className="badge-base LI-profile-badge gap-5 flex flex-col pl-24 mb-3" data-locale="en_US" data-size="large" data-theme="dark" data-type="HORIZONTAL" data-vanity="narendra-dubey-7147042b8" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/narendra-dubey-7147042b8?trk=profile-badge"></a></div>
            <div className="flex flex-col bg-neutral-900 indent-5 p-10 rounded-2xl h-full justify-center text-xl">
              <h1 className="mb-5 text-2xl font-bold underline-offset-8 underline">Narendra Dubey:</h1>
              <p>Hi, I'm Narendra 👋</p>
              I’m a curious science student, coding beginner, and future millionaire in the making 🚀.
              Passionate about tech, creativity, and building things that inspire people.
              Currently learning Next.js and experimenting with projects that blend innovation and design.
              If you love startups, tech, or just a good cup of coffee ☕, let’s connect!
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
