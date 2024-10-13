import React from "react";
import { RouterProvider } from "react-router-dom"; // Import correctly
import router from "./Router/route.jsx"; // Import your router once
import { Toaster } from "react-hot-toast"; // Correct import for Toaster

function App() {
  return (
    <>
      {/* Displaying the router and global Toaster for notifications */}
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
