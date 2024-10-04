import React, { useContext } from "react";

import { Footer, Header, Kyc } from "../Components/index";
import { TOKEN_ICO_Context } from "../context/index";

const register = () => {
  const {
    BUY_TOKEN,
    TRANSFER_ETHER,
    TOKEN_WITHDRAW,
    TRANSFER_TOKEN,
    CONNECT_WALLET,
    ERC20,
    CHECK_ACCOUNT_BALANCE,
    setAccount,
    setLoader,
    TOKEN_ADDRESS,
    loader,
    account,
    currency,
  } = useContext(TOKEN_ICO_Context);

  return (
    <>
      <Header />
      <Kyc />
      <Footer />
    </>
  );
};

export default register;
