import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-neutral text-white p-10 min-h-48 mt-auto">
      <aside>
        <h3 className="text-2xl font-bold">DevTinder</h3>
        <p>Connect. Collaborate. Create. 🚀</p>
        <p>© {new Date().getFullYear()} DevTinder. All rights reserved.</p>
      </aside>
    </footer>
  );
};

export default Footer;
