// // components/ProtectedRoute.js
// import React from "react";
// import { Navigate } from "react-router-dom";
// import PropTypes from "prop-types"; // ✅ Import PropTypes
// import { useState, useEffect } from "react";

// const ProtectedRoute = ({ children }) => {
//     const [token, setToken] = useState(null);

//     useEffect(() => {
//         const t = localStorage.getItem("token");
//         setToken(t);
//       }, []); // ✅ Only run once on mount

//   if (!token) {
//     return <Navigate to="/kirish" replace />;
//   }

//   return children;
// };
// ProtectedRoute.propTypes = {
//     children: PropTypes.node.isRequired,
//   };
// export default ProtectedRoute;


// components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state

    useEffect(() => {
        const checkToken = () => {
            const t = localStorage.getItem("token");
            console.log("Token from localStorage:", t); // Debug log
            setToken(t);
            setIsLoading(false); // Set loading to false after checking
        };
        
        checkToken();
    }, []); // Only run once on mount

    // Show loading state while checking token
    if (isLoading) {
        return <div>Loading...</div>; // Or your loading component
    }

    // Check if token exists and is not empty
    if (!token || token === "null" || token === "undefined") {
        console.log("No valid token, redirecting to login"); // Debug log
        return <Navigate to="/kirish" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;