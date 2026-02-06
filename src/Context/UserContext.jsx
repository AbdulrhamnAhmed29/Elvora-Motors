import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
export const context = createContext();

export function Provider({ children }) {
    // const [username, setusername] = useState("");
    const [Token, setToken] = useState("");
    useEffect(() => {
        const Token = Cookies.get("token");
        setToken(Token);
    }, [])
    return (
        <context.Provider value={{ Token }}>
            {children}
        </context.Provider>
    );
}