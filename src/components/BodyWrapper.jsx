import { Outlet } from "react-router-dom";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";

const BodyWrapper = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default BodyWrapper;
