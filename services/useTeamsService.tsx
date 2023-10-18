import {BASE_URL, createAxiosInstance} from "@config/axiosConfig";
import {useAuth} from "@context/AuthContext";


export const UseTeamsService = () => {
    const authContext = useAuth();
    const axiosInstanceForFitSixes = createAxiosInstance(authContext, BASE_URL.FIT_SIXES);

    const getTeams = async () => {
        try {
            const response = await axiosInstanceForFitSixes.get('teams');
            console.log("API call", response.data.data);
            return response.data.data;
        } catch (error) {
            console.log('Get users failed:', error);
        }
    }

    return {
        getTeams
    };
};