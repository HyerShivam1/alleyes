/* eslint-disable react/prop-types */
import { useState } from "react"; // Importing useState for managing component state
import { IoCloseOutline } from "react-icons/io5"; // Importing close icon from react-icons

const PasswordSuggest = ({ orderPopup, handleOrderPopup }) => {
  // State hooks for password and status messages
  const [password, setPassword] = useState(""); // To store the generated password
  const [status, setStatus] = useState(""); // To store the status message (e.g., "Generating...", "Generated")

  // Constant variables defining password requirements
  const length = 8; // Password length
  const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Uppercase letters
  const lowerCase = "abcdefghijklmnopqrstuvwxyz"; // Lowercase letters
  const number = "1234567890"; // Numbers
  const symbol = "@!&*"; // Special symbols

  // Combine all characters that can be used for password generation
  const allChars = upperCase + lowerCase + number + symbol;

  // Function to generate a random password
  function createPassword() {
    setStatus("Generating..."); // Show status while generating the password
    setTimeout(() => {
      let password = ""; // Initialize an empty password string
      // Add one character from each required character set (uppercase, lowercase, number, symbol)
      password += upperCase[Math.floor(Math.random() * upperCase.length)];
      password += lowerCase[Math.floor(Math.random() * lowerCase.length)];
      password += number[Math.floor(Math.random() * number.length)];
      password += symbol[Math.floor(Math.random() * symbol.length)];

      // Fill up the rest of the password until it reaches the desired length
      while (length > password.length) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
      }
      setPassword(password); // Set the generated password
      setStatus("Generated"); // Change status to "Generated" after password creation
    }, 1000); // Simulate a 1-second delay for password generation
  }

  // Function to copy the generated password to the clipboard
  function copyClipboard() {
    if (password) {
      navigator.clipboard.writeText(password); // Copy password to clipboard
      setStatus("Copied to Clipboard!"); // Update status to show that the password has been copied
      setTimeout(() => setStatus("Generated"), 1000); // Reset status after 1 second
    }
  }

  return (
    <div>
      {/* Conditionally render the popup if 'orderPopup' is true */}
      {orderPopup && (
        <div className="h-screen w-screen fixed top-0 left-0 z-10 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              {/* Popup Title and Close Button */}
              <h2 className="sm:text-lg text-base font-semibold text-gray-700 ">
                Generate a Secure Password
              </h2>
              <IoCloseOutline
                className="text-2xl cursor-pointer text-gray-500 hover:text-gray-700"
                onClick={() => handleOrderPopup(false)} // Close the popup when clicked
              />
            </div>
            <div className="flex flex-col gap-4">
              {/* Password Input */}
              <input
                type="text"
                id="password"
                placeholder="Generated Password"
                value={password} // Bind the generated password to the input field
                readOnly // Make the input read-only
                className="pass sm:text-base text-sm"
              />
              {/* Status Message */}
              <div className="text-sm text-gray-500">{status}</div>
              {/* Copy Button */}
              <button
                onClick={copyClipboard} // Call copyClipboard function when clicked
                className="flex items-center justify-center text-white gap-2 px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-base text-sm"
              >
                Copy to Clipboard
              </button>
              {/* Generate Password Button */}
              <button
                className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 sm:text-base text-sm"
                onClick={createPassword} // Call createPassword function when clicked
              >
                Generate Password
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordSuggest;
