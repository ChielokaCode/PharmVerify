import React, { useContext } from "react";

import { Footer, Header, Kyc } from "../Components/index";
import { TOKEN_ICO_Context } from "../context/index";

const register = () => {
  return (
    <>
      <Header />
      <Kyc />
      <Footer />
    </>
  );
};

export default register;
