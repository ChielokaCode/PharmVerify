import React, { useContext } from "react";

import { AddProduct, SideBar, Header } from "../../Components/index";
import { TOKEN_ICO_Context } from "../../context/index";

const addProduct = () => {
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
      <SideBar />
      <AddProduct />
    </>
  );
};

export default addProduct;
