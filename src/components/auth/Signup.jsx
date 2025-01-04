import { useForm } from "react-hook-form"; // Importing useForm from react-hook-form for form validation
import { VscEyeClosed, VscEye } from "react-icons/vsc"; // Importing eye icons for password visibility toggle
import { Link } from "react-router-dom"; // Importing Link from react-router-dom for navigation
import { useState, useEffect } from "react"; // Importing useState and useEffect for state management and side effects
import PasswordSuggest from "./PasswordSuggest"; // Importing the PasswordSuggest component
import { useFireBase } from "../services/firebase"; // Importing the useFireBase hook for interacting with Firebase
import { useNavigate } from "react-router-dom"; // Importing useNavigate for programmatic navigation
import "../styles/signup.css"; // Importing the CSS styles for the signup page

const Signup = () => {
  // State hooks for controlling popup visibility, password visibility, and error messages
  const [orderPopup, setOrderPopup] = useState(false); // Controls visibility of the password suggestion popup
  const [showPassword, setShowPassword] = useState(false); // Controls password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Controls confirm password visibility
  const [showConfirmField, setShowConfirmField] = useState(false); // Controls the visibility of the confirm password field
  const [passwordError, setPasswordError] = useState(""); // Stores password match error message
  const [firebaseError, setFirebaseError] = useState(""); // Stores Firebase-related error messages
  const { signupUser } = useFireBase(); // Destructuring signupUser function from useFireBase hook for signing up

  const navigate = useNavigate(); // Hook for navigation after successful signup
  const firebase = useFireBase(); // Accessing Firebase instance

  // Redirects to homepage if already logged in
  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/"); // Navigate to home if the user is already logged in
    }
  }, [firebase, navigate]);

  // Function to toggle the visibility of the password and confirm password fields
  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup); // Toggles the password suggestion popup visibility
  };

  // Toggle password visibility (show/hide)
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility (show/hide)
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // useForm hook for handling form data and validation
  const {
    register, // Register function to register inputs with validation rules
    handleSubmit, // Function to handle form submission
    watch, // Watches specific input values
    formState: { errors, isSubmitting }, // Access form validation errors and submission state
  } = useForm();

  const passwordValue = watch("password", ""); // Watch the password field value
  const confirmPasswordValue = watch("confirmPassword", ""); // Watch the confirm password field value

  // Handles password input changes, shows confirm password field only if password length is at least 8 characters
  const handlePasswordInput = (value) => {
    setShowConfirmField(value.length >= 8); // Display confirm password field if password is 8 or more characters
    setPasswordError(""); // Clear previous password error
  };

  // Handles form submission
  const onSubmit = async (data) => {
    if (passwordValue !== confirmPasswordValue) {
      // Check if password and confirm password match
      setPasswordError("Passwords do not match!"); // Display error if passwords don't match
      return;
    }

    try {
      // Attempt to sign up the user with Firebase
      await signupUser(data.email, data.password, data.name);
      navigate("/signup/login"); // Navigate to login page after successful signup
    } catch (error) {
      // Handle error if user already exists
      setFirebaseError("User is already exist", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <div className="border rounded-xl border-gray-300 sm:w-96 w-[350px] px-5 bg-white h-full ">
        <h2 className="pt-8 text-2xl font-bold text-blue-600 text-center">
          Sign up for an Account
        </h2>

        {/* Form for user signup */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col pt-10 gap-4">
            {/* Name Input */}
            <input
              className="border-2 border-gray-300 p-3 w-full rounded text-sm"
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 2,
                  message: "Name must be at least 2 characters",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}

            {/* Last Name Input */}
            <input
              className="border-2 border-gray-300 p-3 w-full rounded text-sm"
              placeholder="Last Name"
              {...register("last name", {
                required: "Last Name is required",
                minLength: {
                  value: 2,
                  message: "Last Name must be at least 1 character",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500">{errors.lastName.message}</span>
            )}

            {/* Email Input */}
            <input
              className="border-2 border-gray-300 p-3 w-full rounded text-sm"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}

            {/* Password Input */}
            <div className="relative">
              <input
                className="border-2 border-gray-300 p-3 w-full rounded text-sm"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Must be at least 8 characters",
                  },
                  pattern: {
                    message:
                      "Must include uppercase, number, and special character",
                  },
                  onChange: (e) => handlePasswordInput(e.target.value),
                })}
              />
              <div
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <VscEye size={20} />
                ) : (
                  <VscEyeClosed size={20} />
                )}
              </div>
            </div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            {/* Confirm Password Input */}
            {showConfirmField && (
              <div className="relative">
                <input
                  className="border-2 border-gray-300 p-3 w-full rounded text-sm"
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                  })}
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <VscEye size={20} />
                  ) : (
                    <VscEyeClosed size={20} />
                  )}
                </div>
              </div>
            )}
            {passwordError && (
              <span className="text-red-500">{passwordError}</span>
            )}
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}

            {/* Firebase error message */}
            {firebaseError && (
              <span className="text-red-500">{firebaseError}</span>
            )}

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                className="bg-blue-600 w-[140px] h-[50px] rounded text-white hover:shadow-lg active:bg-white active:text-black border border-blue-600 active:border-black"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </div>
        </form>

        {/* Link to login page */}
        <div className="flex flex-row pt-4 gap-1 text-sm pb-1">
          <h2>Already have an account?</h2>
          <Link to="/signup/login">
            <span className="text-blue-700">Log in now</span>
          </Link>
        </div>

        {/* Password suggestion link */}
        <div className="flex flex-row gap-1 text-sm pb-3">
          <h2>Need any password Suggestion?</h2>
          <span
            className="text-blue-700 cursor-pointer"
            onClick={handleOrderPopup}
          >
            Click Here!
          </span>
        </div>
      </div>

      {/* Password Suggestion Popup */}
      <PasswordSuggest
        handleOrderPopup={handleOrderPopup}
        orderPopup={orderPopup}
      />
    </div>
  );
};

export default Signup;
