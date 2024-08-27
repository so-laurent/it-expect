import { createContext } from "react";

const AuthContext = createContext({
    currentUser: null,
    login: () => {},
});

export default AuthContext;