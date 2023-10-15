import {BASE_URL, createAxiosInstance, PROJECT_CODE} from "../config/axiosConfig";
import {useAuth} from "../context/AuthContext";

export const Teams = () => {

    const authContext = useAuth();
    const axiosInstanceForLunchBucket = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);

    const getTeams = async () => {
        try {
            const response = await axiosInstanceForLunchBucket.get('teams');
            console.log("API call",response.data.data);
            return response.data.data;
        } catch (error) {
            console.log('Get users failed:', error);
        }
    }

    return {
        getTeams
    };
};