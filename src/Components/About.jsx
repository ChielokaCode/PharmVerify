import React from "react";

const About = () => {
  return (
    <div
      id="about"
      className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32"
    >
      <img
        alt=""
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div
        aria-hidden="true"
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-6xl">
            About PharmVerify
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            PharmVerify is a revolutionary dApp designed to combat the alarming
            rise of counterfeit drugs in the market. Our platform enables drug
            manufacturers to register their products securely and generate
            unique 8-digit codes for each packet, ensuring that consumers can
            easily verify the authenticity and validity of their medications. By
            leveraging blockchain technology, we aim to create a transparent and
            reliable ecosystem that safeguards public health and enhances trust
            in pharmaceutical products.
          </p>
          <br />
          <h2 className="text-md font-bold tracking-tight text-white sm:text-xl">
            Our Mission
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Our mission is to protect consumers from counterfeit medications and
            promote the integrity of the pharmaceutical supply chain. We strive
            to empower consumers with the tools they need to verify the
            authenticity of their medications, ultimately fostering a healthier
            society where patients can have confidence in the products they use.
          </p>
          <br />
          <h2 className="text-md font-bold tracking-tight text-white sm:text-xl">
            Our Values
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            At PharmVerify, we uphold values of transparency, security, and
            trust. We believe in leveraging innovative technologies to create a
            safer healthcare environment. Our commitment to accuracy ensures
            that every drug packet can be verified, holding manufacturers
            accountable and protecting consumers from harm.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
