import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div>
        <Link to={`/settings`}>Settings</Link>
      </div>
      <div></div>
      <div>
        <a
          href="https://github.com/skorotkiewicz/aecc"
          target="_blank"
          rel="noreferrer"
        >
          Opensource
        </a>
      </div>
    </div>
  );
};

export default Footer;
