/* eslint-disable react/no-unescaped-entities */
import { useForm } from "react-hook-form"; // Importing react-hook-form for form validation and management
import { VscEyeClosed, VscEye } from "react-icons/vsc"; // Importing eye icons for password visibility toggle
import { useState } from "react"; // Importing useState for managing component state
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate for navigation
import { useFireBase } from "../services/firebase"; // Importing custom firebase hook for authentication
import { useEffect } from "react"; // Importing useEffect for lifecycle management

const Login = () => {
  // State hooks
  const [showPassword, setShowPassword] = useState(false); // Manages password visibility state
  const [loginError, setLoginError] = useState(""); // Stores login error message if login fails

  // Firebase hooks
  const { signinUser } = useFireBase(); // Destructuring signinUser function from Firebase hook
  const navigate = useNavigate(); // Hook to navigate to different pages
  const firebase = useFireBase(); // Firebase hook for user authentication status

  // Redirect to homepage if the user is already logged in
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/"); // If logged in, navigate to homepage
    }
  }, [firebase, navigate]); // Dependency array ensures this effect runs when firebase or navigate changes

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the boolean value to show/hide the password
  };

  // react-hook-form methods
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // Destructuring required properties from useForm hook
  } = useForm();

  // Form submission function
  async function onSubmit(data) {
    try {
      setLoginError(""); // Clear any previous login errors
      await signinUser(data.email, data.password); // Attempt to log in with the provided credentials
    } catch (error) {
      console.error("Login failed:", error); // Log the error in the console
      // Handle specific Firebase authentication errors
      if (error === "auth/wrong-password") {
        setLoginError("Incorrect password. Please try again."); // Incorrect password error message
      } else if (error.code === "auth/user-not-found") {
        setLoginError("No account found with this email."); // No user found error message
      } else {
        setLoginError("An error occurred during login. Please try again."); // Generic error message
      }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      {/* Main container with flex styling for centering */}
      <div className="border rounded-xl border-gray-300 sm:w-96 w-[350px] px-5 bg-white">
        <h2 className="pt-8 text-2xl font-bold text-blue-600 text-center">
          Log in to Your Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col pt-10 gap-4">
            {/* Email Input */}
            <input
              className="border-2 border-gray-300 p-3 w-full rounded text-sm"
              placeholder="Email address"
              {...register("email", {
                required: true, // Email is required
                maxLength: 100, // Maximum length is 100 characters
                pattern: {
                  value: /\S+@\S+\.\S+/, // Regex pattern to validate email format
                  message: "Enter a valid email", // Custom error message
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">
                {errors.email.message || "Email is required"}
              </span>
            )}

            {/* Password Input with Show/Hide Toggle */}
            <div className="relative">
              <input
                className="border-2 border-gray-300 p-3 w-full rounded text-sm"
                placeholder="Password"
                type={showPassword ? "text" : "password"} // Toggle between text and password type
                {...register("password", {
                  required: true, // Password is required
                  minLength: {
                    value: 8, // Minimum password length is 8 characters
                    message: "Password must be at least 8 characters long", // Custom error message
                  },
                  pattern: {
                    message:
                      "Password must include uppercase, number, and special character", // Password pattern validation message
                  },
                })}
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility} // Toggle password visibility on click
              >
                {showPassword ? (
                  <VscEye size={20} /> // Show eye icon when password is visible
                ) : (
                  <VscEyeClosed size={20} /> // Show eye-closed icon when password is hidden
                )}
              </div>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            {/* Forgot Password Link */}
            <a href="#" className="text-blue-700 text-sm">
              Forgot Password?
            </a>

            {/* Display Login Error if any */}
            {loginError && <span className="text-red-500">{loginError}</span>}

            {/* Login Button */}
            <div className="flex justify-center">
              <button
                className="bg-blue-600 w-[140px] h-[50px] rounded text-white hover:shadow-lg active:bg-white active:text-black border border-blue-600 active:border-black"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? "Logging..." : "Login"} {/* Show "Logging..." while submitting */}
              </button>
            </div>
          </div>
        </form>

        {/* Signup Link */}
        <div className="flex flex-row pt-4 gap-2 text-sm pb-4">
          <h2>Don't have an account?</h2>
          <Link to="/signup">
            <span className="text-blue-700">Signup now</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
