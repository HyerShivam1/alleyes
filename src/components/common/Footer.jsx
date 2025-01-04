import { useState } from "react";
import Logo from '../../assets/logo.jpg'

const Footer = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    const name = "shivam-mittal-4b3894248/";
    const linkDinLink = `https://linkedin.com/in/${name}`;
    window.open(linkDinLink, "_blank");
  };

  return (
    <div>
      <div className="grid md:grid-cols-4 px-2 py-4 gap-8 dark:bg-gray-800 dark:text-white">
        <div className="flex md:justify-center flex-col px-5">
          <div className="flex flex-row pr-5 gap-5">
            <img
              className="w-12 h-10 md:block hidden object-cover"
              src= {Logo}
              alt="Logo"
            />
            <h1 className="text-xl relative top-1 pr-5 pb-2">alleyes</h1>
          </div>
          <p className="min-w-44">
            alleyes is a shopping platform for selling and buying. E-commerce
            Developed by College Students in 2024 to do something valuable and
            good for society.
          </p>
        </div>

        <div className="px-5 flex md:justify-center flex-col pb-2 md:pb-14">
          <h2 className="font-semibold">Connect with Us</h2>
          <ul className="flex flex-col">
            <a href="https://www.facebook.com">Facebook</a>
            <a href="https://www.instagram.com">Instagram</a>
            <a href="https://twitter.com">Twitter</a>
          </ul>
        </div>

        <div className="px-5 flex flex-col pb-2">
          <h2 className="font-semibold">Make Money with Us</h2>
          <ul className="flex flex-col">
            <a href="https://www.google.com">Sell on alleyes</a>
            <a href="https://www.google.com">Sell under alleyes Accelerator</a>
            <a href="https://www.google.com">Protect and Build Your Brand</a>
            <a href="https://www.google.com">alleyes Global Selling</a>
            <a href="https://www.google.com">Supply to alleyes</a>
          </ul>
        </div>

        <div className="px-5 flex flex-col gap-3">
          <input
            className="bg-gray-200 w-full max-w-96 px-4 py-2 dark:brightness-50"
            placeholder="Send Message"
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className="w-20 h-10 text-white bg-black dark:brightness-50"
            onClick={handleSendMessage}
          >
            Send Us
          </button>
        </div>
      </div>

      <div className="flex justify-center bg-gradient-to-r from-slate-500 to-indigo-600 p-3 w-full">
        <h4>Copyright © | All rights reserved 2024</h4>
      </div>
    </div>
  );
};

export default Footer;
