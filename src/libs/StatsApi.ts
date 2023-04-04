import { GetActiveStudentsNumberResponse, GetNumberOfActiveCoursesResponse, GetTotalAvgFrequencyResponse } from "types";
import { apiUrl } from "../config/api";
import { myApi } from "../utils/interceptor";

class StatsApi {
    url: string = `${apiUrl}/stats`;
    private errorMessage = 'Nie udało się przetworzyć żądania, Spróbuj ponownie';

    async getActiveCoursesNumber(): Promise<GetNumberOfActiveCoursesResponse> {
        const { data } = await myApi
            .get('/stats/active-courses', {
                withCredentials: true,
            })
            .catch(e => {
                console.error(e);
                throw new Error(this.errorMessage);
            });
        return data as GetNumberOfActiveCoursesResponse;
    }

    async getActiveStudentsNumber(): Promise<GetActiveStudentsNumberResponse> {
        const { data } = await myApi
            .get('/stats/active-students', {
                withCredentials: true,
            })
            .catch(e => {
                console.error(e);
                throw new Error(this.errorMessage);
            });
        return data as GetActiveStudentsNumberResponse;
    }

    async getAvgFrequency(): Promise<GetTotalAvgFrequencyResponse> {
        const { data } = await myApi
            .get('/stats/avg-frequency', {
                withCredentials: true,
            })
            .catch(e => {
                console.error(e);
                throw new Error(this.errorMessage);
            });
        return data as GetTotalAvgFrequencyResponse;
    }
}

export const statsApi = new StatsApi();