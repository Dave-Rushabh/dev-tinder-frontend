import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer footer-center bg-neutral text-white p-10 min-h-80 mt-auto">
      <aside>
        <h3 className="text-2xl font-bold">DevTinder</h3>
        <p>Connect. Collaborate. Create. 🚀</p>
        <p>© {new Date().getFullYear()} DevTinder. All rights reserved.</p>
        <p>
          🫶 Proudly made by{" "}
          <a href={`https://www.linkedin.com/in/rushabh-dave/`}>
            <span className="underline underline-offset-4">Rushabh Dave</span>
          </a>
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
