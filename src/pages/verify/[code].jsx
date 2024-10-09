// pages/verify/[code].js
import { useRouter } from "next/router";

import { Header, VerifyProduct } from "../../Components/index";

const VerifyPage = () => {
  const router = useRouter();
  const { code } = router.query; // Get the dynamic parameter from the URL

  return (
    <div>
      <Header />
      <VerifyProduct code={code} />
    </div>
  );
};

export default VerifyPage;
