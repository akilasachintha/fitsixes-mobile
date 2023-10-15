import {BASE_URL, createAxiosInstance, PROJECT_CODE} from "@config/axiosConfig";
import {useAuth} from "@context/AuthContext";
import {useToast} from "@context/ToastContext";
import useExpoPushNotificationConfig from "@config/useExpoPushNotificationConfig";

type LoginData = {
    email: string;
    password: string;
    project_code: string;
    device_token: string;
}

export const useAuthService = () => {
    const authContext = useAuth();
    const axiosInstanceForI2Auth = createAxiosInstance(authContext, BASE_URL.I2_AUTH);
    createAxiosInstance(authContext, BASE_URL.FIT_SIXES);
    const {login} = useAuth();
    const {showToast} = useToast();
    const {storeToken} = useExpoPushNotificationConfig();

    const loginService = async (email: string, password: string) => {
        try {
            const deviceToken = await storeToken();
            if (deviceToken === undefined) {
                showToast("Failed to get device token");
                return;
            } else {
                console.log('deviceToken:', deviceToken);
                const data: LoginData = {
                    email,
                    password,
                    project_code: PROJECT_CODE,
                    device_token: deviceToken.toString(),
                }

                const {data: responseData} = await axiosInstanceForI2Auth.post('/userLogin', data);
                const {data: {type, id, token, response}} = responseData;

                showToast("Token" + deviceToken.toString());
                console.log('Login success:', responseData.data);

                if (response) {
                    showToast(response);
                } else {
                    login(type, id, token);
                }
            }

        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    return {
        loginService,
    };
};
