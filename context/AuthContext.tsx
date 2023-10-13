import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {addDataToLocalStorage, getDataFromLocalStorage} from "@helpers/asyncStorage";
import {DrawerActions, useNavigation} from "@react-navigation/native";
import {useLoadingContext} from "@context/LoadingContext";
import {useToast} from "@context/ToastContext";

export interface AuthContextType {
    isLoggedIn: boolean;
    token: string | null;
    deviceToken: string | null;
    role: string | null;
    id: string | null;
    login: (role: string, id: string, token: string, deviceToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [deviceToken, setDeviceToken] = useState<string | null>(null);
    const [id, setId] = useState<string | null>(null);
    const navigation = useNavigation();
    const {showLoading, hideLoading} = useLoadingContext();
    const {showToast} = useToast();

    useEffect(() => {
        const loadLoginStatus = async () => {
            const storedIsLoggedIn = await getDataFromLocalStorage("isLoggedIn");
            const storedToken = await getDataFromLocalStorage("token");
            const storedRole = await getDataFromLocalStorage("role");
            const storedId = await getDataFromLocalStorage("id");
            const storedDeviceToken = await getDataFromLocalStorage("deviceToken");

            if (storedIsLoggedIn !== null) {
                setIsLoggedIn(JSON.parse(storedIsLoggedIn));
            }
            if (storedToken !== null) {
                setToken(JSON.parse(storedToken));
            }

            if (storedRole !== null) {
                setRole(JSON.parse(storedRole));
            }

            if (storedId !== null) {
                setId(JSON.parse(storedId));
            }

            if (storedDeviceToken !== null) {
                setDeviceToken(JSON.parse(storedDeviceToken));
            }
        };

        loadLoginStatus().catch((e) => console.error(e));
    }, []);

    const login = async (role: string, id: string, token: string, deviceToken: string = "") => {
        navigation.dispatch(DrawerActions.closeDrawer());
        await addDataToLocalStorage("isLoggedIn", JSON.stringify(true));
        await addDataToLocalStorage("token", JSON.stringify(token));
        await addDataToLocalStorage("role", JSON.stringify(role));
        await addDataToLocalStorage("id", JSON.stringify(id));
        await addDataToLocalStorage("deviceToken", JSON.stringify(deviceToken));

        setIsLoggedIn(true);
        setDeviceToken(deviceToken);
        setRole(role);
        setToken(token);
        setId(id);

        // @ts-ignore
        navigation.navigate("HomeStack");
    };

    const logout = async () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        await addDataToLocalStorage("isLoggedIn", JSON.stringify(false));
        await addDataToLocalStorage("token", JSON.stringify(null));
        await addDataToLocalStorage("role", JSON.stringify(null));
        await addDataToLocalStorage("id", JSON.stringify(null));
        await addDataToLocalStorage("deviceToken", JSON.stringify(null));

        setIsLoggedIn(false);
        setDeviceToken(null);
        setRole(null);
        setToken(null);
        setId(null);

        showLoading();

        setTimeout(() => {
            hideLoading();
            // @ts-ignore
            navigation.navigate("HomeStack");

            showToast("Successfully logged out");
        }, 2000);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, token, deviceToken, role, id, login, logout}}>
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
