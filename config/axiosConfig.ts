import axios, {AxiosInstance} from 'axios';
import {useLoadingContext} from '@context/LoadingContext';
import {AuthContextType} from '@context/AuthContext';
import {useToast} from "@context/ToastContext";

const I2_AUTH_BASE_URL = 'https://fw2svr60sl.execute-api.ap-south-1.amazonaws.com/beta/';
const FIT_SIXES_BASE_URL = 'https://j1kydf6tp3.execute-api.ap-south-1.amazonaws.com/dev/v1/';
export const PROJECT_CODE = "651db236cd16f62e555ba30fAVT60UVT4300";

// export const PROJECT_CODE = '65130a05357ed283360539acAVT60UVT4300';

export const WEB_SOCKET_URL = 'wss://bzkg9tjte7.execute-api.ap-south-1.amazonaws.com/production';

export const BASE_URL = {
    I2_AUTH: I2_AUTH_BASE_URL,
    FIT_SIXES: FIT_SIXES_BASE_URL,
};

const createAxiosInstance = (authHook: AuthContextType, baseURL: string): AxiosInstance => {
    const instance = axios.create({
        baseURL,
    });

    const {showLoading, hideLoading} = useLoadingContext();
    const {showToast} = useToast();

    // Request Interceptor
    instance.interceptors.request.use(
        (config) => {
            const token = authHook.token;

            if (token) {
                config.headers['token'] = `${token}`;
            }

            showLoading();

            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response Interceptor
    instance.interceptors.response.use(
        (response) => {
            // Handle other status codes here
            if (response.status >= 400 && response.status < 500) {
                console.error('Client Error:', response.status, response.data);
                if (response.status === 401) {
                    authHook.logout();
                    hideLoading();
                    showToast(response.data);
                    return Promise.reject(response.data);
                }

            } else if (response.status >= 500) {
                console.error('Server Error:', response.status, response.data);
                hideLoading();
                showToast(response.data);
                return Promise.reject(response.data);
            }

            hideLoading();

            return response;
        },
        (error) => {
            if (error.message === 'Network Error') {
                console.error('Network Error:', error);
            } else if (error.response) {
                console.error('HTTP Error:', error.response.status, error.response.data);
            } else {
                console.error('Error:', error);
            }

            hideLoading();

            return Promise.reject(error);
        }
    );

    return instance;
};

export {createAxiosInstance, I2_AUTH_BASE_URL, FIT_SIXES_BASE_URL};
