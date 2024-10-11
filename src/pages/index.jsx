import React, { useContext, useMemo } from "react";

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
import { useAccount } from "wagmi";
import { useCapabilities } from "wagmi/experimental";

const index = () => {
  const account = useAccount();

  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });
  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return;
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: "https://api.developer.coinbase.com/rpc/v1/base-sepolia/QVnPT0XROesIx8BFkjAETLpULlnb6rxG",
        },
      };
    }
  }, [availableCapabilities, account.chainId]);
  console.log(capabilities);

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
