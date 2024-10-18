import { useRouter } from "next/router";

import { Header, ReportIssue, VerifyProduct } from "../../Components/index";

const VerifyPage = () => {
  const router = useRouter();
  const { code } = router.query;

  return (
    <div>
      <Header />
      <VerifyProduct code={code} />
    </div>
  );
};

export default VerifyPage;
