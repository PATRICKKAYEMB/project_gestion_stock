import { AppContext } from "@/context/AppContext";
import { useContext } from "react";

export const useAuth = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAuth must be used within an AppContext provider");
    }

    return context;
};
