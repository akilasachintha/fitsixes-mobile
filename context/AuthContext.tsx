import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {addDataToLocalStorage, getDataFromLocalStorage} from "../helpers/asyncStorage";
import {DrawerActions, useNavigation} from "@react-navigation/native";

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        const loadLoginStatus = async () => {
            const storedStatus = await getDataFromLocalStorage("isLoggedIn");
            setIsLoggedIn(storedStatus === "true");
        };

        loadLoginStatus().catch((e) => console.error(e));
    }, []);

    const login = async () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        await addDataToLocalStorage("isLoggedIn", "true");
        setIsLoggedIn(true);

        // @ts-ignore
        navigation.navigate("HomeStack");
    };

    const logout = async () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        await addDataToLocalStorage("isLoggedIn", "false");
        setIsLoggedIn(false);

        // @ts-ignore
        navigation.navigate("HomeStack");
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
