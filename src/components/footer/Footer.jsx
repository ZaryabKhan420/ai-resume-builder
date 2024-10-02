// Footer.jsx
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  InstagramIcon,
} from "lucide-react";
import React, { useState } from "react";
import Logo from "/logo.svg";
const Footer = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for email submission, e.g., API call to subscribe the user
    setSubmitted(true);
    setEmail("");
  };

  return (
    <footer className=" py-10 rounded-lg">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {/* Company Info */}
        <div>
          <img src={Logo} alt="" className="mb-4" />
          <p className="mb-2">AI Resume Builder</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>

          <p className="mb-2">1234 Street</p>
          <p className="mb-2">City, State, 56789</p>
          <p className="mb-2">Email: contact@AIResumeBuilder.com</p>
          <p className="mb-2">Phone: +1 (123) 456-7890</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Careers
              </a>
            </li>
            <li className="mb-2">
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <p className="mb-4">Connect with us on social media</p>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-gray-400 text-2xl"
            >
              <TwitterIcon />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-gray-400 text-2xl"
            >
              <FacebookIcon />{" "}
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="hover:text-gray-400 text-2xl"
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-gray-400 text-2xl"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-10 pt-4">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} AI Resume Builder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
