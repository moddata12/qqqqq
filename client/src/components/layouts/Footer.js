import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container text-center">
        <p>
          &copy; 2024 SGen Energy and Infra Private Limited. All Rights
          Reserved.
        </p>
        <p>
          <a href="/privacy" className="text-white">
            Privacy Policy
          </a>{" "}
          |
          <a href="/terms" className="text-white">
            {" "}
            Terms of Service
          </a>
        </p>
        <div>
          <a href="https://facebook.com" className="text-white mx-2">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://twitter.com" className="text-white mx-2">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://instagram.com" className="text-white mx-2">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
