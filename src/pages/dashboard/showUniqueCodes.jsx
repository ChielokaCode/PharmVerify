import React, { useState } from "react";
import { Footer, Header, ShowUniqueCodes, SideBar } from "../../Components";

const showUniqueCodes = () => {
  return (
    <div>
      <Header />
      <SideBar />
      <ShowUniqueCodes />
    </div>
  );
};

export default showUniqueCodes;
