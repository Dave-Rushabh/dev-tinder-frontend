const Loader = ({ size = "lg" }) => {
  return <span className={`loading loading-infinity loading-${size}`}></span>;
};

export default Loader;
