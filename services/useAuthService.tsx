import {BASE_URL, createAxiosInstance, PROJECT_CODE} from "@config/axiosConfig";
import {useAuth} from "@context/AuthContext";
import {useToast} from "@context/ToastContext";
import useExpoPushNotificationConfig from "@config/useExpoPushNotificationConfig";
import {useNavigation} from "@react-navigation/native";
import {useLoadingContext} from "@context/LoadingContext";

type LoginData = {
    email: string;
    password: string;
    project_code: string;
    device_token: string;
}

export const useAuthService = () => {
    const authContext = useAuth();
    const {showLoading, hideLoading} = useLoadingContext();
    const navigation = useNavigation();
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

                console.log('Login success:', responseData.data);

                if (response) {
                    showToast(response);
                } else {
                    showLoading();
                    login(type, id, token);
                    hideLoading();
                }
            }

        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    const forgotPasswordService = async (email: string, password: string) => {
        try {
            const data = {
                email,
                password,
                project_code: PROJECT_CODE,
            }

            const response = await axiosInstanceForI2Auth.post('/forgetPassword', data);

            if (response && response.data && response.data.state) {
                showToast("Please check your email to reset password");
                // @ts-ignore
                navigation.navigate('LoginStack');

            } else {
                console.log("Failed to update password");
                showToast("Failed to update password");
            }
        } catch (error) {
            console.error('Error updating password:', error);
            showToast("Failed to update password");
        }
    }

    return {
        loginService,
        forgotPasswordService,
    };
};
