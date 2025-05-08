import React, { createContext, useContext, useEffect, useState } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/ApiPath";

// Create the UserContext
export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user details
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch user details when the component mounts
    useEffect(() => {
        if (user) return; // If user is already set, skip fetching

        const accessToken = localStorage.getItem("token");
        if (!accessToken) {
            setLoading(false); // No token, stop loading
            return;
        }

        const fetchUser = async () => {
            try {
                // Fetch user profile
                const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
                setUser(response.data); // Set the user data
            } catch (error) {
                console.error("User not authenticated:", error);
                clearUser(); // Clear user details on error
            } finally {
                setLoading(false); // Stop loading
            }
        };

        fetchUser();
    }, []);

    // Update user details and token
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("token", userData.token); // Store token
        setLoading(false);
    };

    // Clear user details and remove token
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("token");
    };

    // Provide user-related data and functions to the context
    return (
        <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
