import React, { useState, useContext } from "react";

import {
  Footer,
  Header,
  Hero,
  About,
  TrustedLogo,
  Pricing,
  Brand,
  Contact,
  Faq,
  Features,
  Loader,
  Progress,
  SideBar,
  Team,
  Token,
  TokenInfo,
  Roadmap,
  Popup,
  TransferToken,
  Owner,
  TransferCurrency,
  Donate,
  UpdateAddress,
  UpdatePrice,
} from "../Components/index";
import { TOKEN_ICO_Context } from "../context/index";

// import { shortenAddress } from "../Utils/index";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../context/constants";

const index = () => {
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

  const [ownerModel, setOwnerModel] = useState(false);
  const [buyModel, setBuyModel] = useState(false);
  const [transferModel, setTransferModel] = useState(false);
  const [transferCurrency, setTransferCurrency] = useState(false);
  const [openDonate, setOpenDonate] = useState(false);
  const [openUpdatePrice, setOpenUpdatePrice] = useState(false);
  const [openUpdateAddress, setOpenUpdateAddress] = useState(false);
  const [detail, setDetail] = useState();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const items = await TOKEN_ICO();
  //     console.log(items);

  //     setDetail(items);
  //   };
  //   fetchData();
  // }, [account]);

  return (
    <>
      <div className="body_wrap">
        {ownerModel && (
          <Owner
            setOwnerModel={setOwnerModel}
            currency={currency}
            detail={detail}
            account={account}
            setTransferModel={setTransferModel}
            setTransferCurrency={setTransferCurrency}
            setOpenDonate={setOpenDonate}
            TOKEN_WITHDRAW={TOKEN_WITHDRAW}
            setOpenUpdatePrice={setOpenUpdatePrice}
            setOpenUpdateAddress={setOpenUpdateAddress}
          />
        )}

        {buyModel && (
          <Popup
            setBuyModel={setBuyModel}
            BUY_TOKEN={BUY_TOKEN}
            currency={currency}
            detail={detail}
            account={account}
            ERC20={ERC20}
            TOKEN_ADDRESS={TOKEN_ADDRESS}
            setLoader={setLoader}
          />
        )}

        {transferModel && (
          <TransferToken
            setTransferModel={setTransferModel}
            TRANSFER_TOKEN={TRANSFER_TOKEN}
            ERC20={ERC20}
            setLoader={setLoader}
          />
        )}

        {transferCurrency && (
          <TransferCurrency
            setTransferCurrency={setTransferCurrency}
            TRANSFER_ETHER={TRANSFER_ETHER}
            detail={detail}
            currency={currency}
            CHECK_ACCOUNT_BALANCE={CHECK_ACCOUNT_BALANCE}
            setLoader={setLoader}
          />
        )}
        {loader && <Loader />}

        <Header/>
        {/* <Profile /> */}
        {/* <SideBar setOwnerModel={setOwnerModel} ownerModel={ownerModel} /> */}
        <Hero />
        <About />
        <TrustedLogo />
        <Pricing />
        <Team />
        <Contact />
        <Footer />
        {/* <Features />
        <Token />
        <Faq />
         */}
      </div>
    </>
  );
};

export default index;
