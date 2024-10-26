import React from "react";
import { RouterProvider } from "react-router-dom"; // Import correctly
import router from "./Router/route.jsx"; // Import your router once
import { Toaster } from "react-hot-toast"; // Correct import for Toaster
import { useDispatch } from "react-redux";
import { setActiveUser,loadCoursesFromLocalStorage } from "./redux/CartSlice.jsx";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const activeUserId = localStorage.getItem("activeUserId");
    if (activeUserId) {
      dispatch(setActiveUser(activeUserId));
      dispatch(loadCoursesFromLocalStorage({ userId: activeUserId }));
    }
  }, [dispatch]);
  return (
    <>
      {/* Displaying the router and global Toaster for notifications */}
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
