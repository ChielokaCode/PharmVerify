import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div id="home" className="relative isolate px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      <div className="mx-auto max-w-full py-32 sm:py-48 lg:py-14 flex flex-col lg:flex-row items-stretch">
        {/* Text Section */}
        <div className="text-center lg:text-left lg:w-1/2 flex flex-col justify-center px-6 lg:px-0">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Introducing the future of Authentic Pharmaceutical products.{" "}
            </div>
          </div>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Ensure Pharmaceutical products Authenticity
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Combat the threat of counterfeit drugs in the market. Our
            decentralized application empowers consumers to verify the
            authenticity of medications with a simple 8-digit code. Each
            Pharmaceutical product packet is uniquely coded, ensuring
            transparency and trust in pharmaceutical products.
          </p>

          <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
            <Link
              href="register"
              passHref
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </Link>
          </div>
        </div>

        {/* Image Section: hidden on smaller screens */}
        <div className="hidden lg:flex lg:w-1/2">
          <img
            src="https://via.placeholder.com/400"
            alt="Drug Image"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
        />
      </div>
    </div>
  );
};

export default Hero;
