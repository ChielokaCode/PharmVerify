import React from "react";

import {
  Footer,
  Header,
  Hero,
  About,
  TrustedLogo,
  Pricing,
  Contact,
  Team,
} from "../Components/index";

const index = () => {
  return (
    <>
      <div className="body_wrap">
        <Header />
        <Hero />
        <About />
        <TrustedLogo />
        <Pricing />
        <Team />
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default index;
