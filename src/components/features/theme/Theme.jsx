// import { useEffect, useState } from "react"

// const Theme = () => {
//   const [theme, setTheme] = useState(localStorage.getItem ("theme") ? localStorage.getItem("theme") : "light");

//   const element = document.documentElement;

//   useEffect(() => {
//     if (theme === "dark") {
//       element.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       element.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//     // console.log(theme);

//   }, [theme]);

//   return (
//     <div className="lg:pr-0 pr-[16px]">
//       <img src="../src/assets/sun.png" alt='dark' className={`md:w-6 md:h-6 w-6 h-6 cursor-pointer transition-all duration-300 z-10 relative top-[6.5px]
//       ${
//         theme == "dark"? "opacity-0" : "opacity-100"} `}
//         onClick={()=> setTheme((data) => (data === "dark" ? "light" : "dark"))}
//         />
//        <img src="../src/assets/night-mode.png" className={`w-6 h-6 cursor-pointer transition-all duration-300 z-10 relative bottom-4 lg:hover:bg-gray-600 rounded-3xl
//         ${
//           theme == "light"? "opacity-0" : "opacity-100"}
//        `
//        }
//        onClick={()=> setTheme((data) => (data === "dark" ? "light" : "dark"))}/>
//     </div>
//   )
// }

// export default Theme

// import { useSelector, useDispatch } from "react-redux";
// import { toggleTheme } from "./themeSlice";

// function Theme() {
//   const dispatch = useDispatch();
//   const theme = useSelector((state) => state.theme.theme);

//   const handleToggleTheme = () => {
//     dispatch(toggleTheme());
//   };

//   return (
//     <div className={theme === "dark" ? "dark-theme" : "light-theme"}>
//       <header>

//         <button onClick={handleToggleTheme}>
//           {theme === "light" ? "Dark" : "Light"}
//         </button>
//       </header>

//     </div>
//   );
// }

// export default Theme;
