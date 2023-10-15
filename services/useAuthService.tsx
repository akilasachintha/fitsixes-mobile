import {BASE_URL, createAxiosInstance, PROJECT_CODE} from "../config/axiosConfig";
import {useAuth} from "../context/AuthContext";
import {useToast} from "../context/ToastContext";

export const useAuthService = () => {
    const authContext = useAuth();
    const axiosInstanceForI2Auth = createAxiosInstance(authContext, BASE_URL.I2_AUTH);
    const axiosInstanceForLunchBucket = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);
    const {login} = useAuth();
    const {showToast} = useToast();

    const loginService = async (email: string, password: string) => {
        try {
            const response = await axiosInstanceForI2Auth.post('/userLogin', {
                email: email,
                password: password,
                project_code: PROJECT_CODE,
                device_token: ""
            });

            console.log('Login success:', response.data.data);

            if (response.data.data.response) {
                showToast(response.data.data.response);
            } else {
                const {type, id, token, device_token} = response.data.data;
                login(type, id, token, device_token);
            }
        } catch (error) {
            console.log('Login failed:', error);
        }
    }

    const getUsersService = async () => {
        try {
            const response = await axiosInstanceForLunchBucket.get('/getOrderByCustomer/65177e26732ef12b02966834');
            return response.data.data;
        } catch (error) {
            console.log('Get users failed:', error);
        }
    }

    return {
        loginService,
        getUsersService
    };
};
