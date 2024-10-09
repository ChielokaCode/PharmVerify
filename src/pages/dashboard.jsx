import React, { useContext } from "react";

import { AddProduct, SideBar, Header } from "../Components/index";

const dashboard = () => {
  return (
    <>
      <Header />
      <SideBar />
      <AddProduct />
    </>
  );
};

export default dashboard;
