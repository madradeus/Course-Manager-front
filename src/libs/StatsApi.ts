import { GetActiveStudentsNumberResponse, GetNumberOfActiveCoursesResponse, GetTotalAvgFrequencyResponse } from "types";
import { myApi } from "../utils/api-query.interceptor";

class StatsApi {

    async getActiveCoursesNumber(): Promise<GetNumberOfActiveCoursesResponse> {
        const { data } = await myApi.get('/stats/active-courses');
        return data as GetNumberOfActiveCoursesResponse;
    }

    async getActiveStudentsNumber(): Promise<GetActiveStudentsNumberResponse> {
        const { data } = await myApi.get('/stats/active-students');
        return data as GetActiveStudentsNumberResponse;
    }

    async getAvgFrequency(): Promise<GetTotalAvgFrequencyResponse> {
        const { data } = await myApi
            .get('/stats/avg-frequency');
        return data as GetTotalAvgFrequencyResponse;
    }
}

export const statsApi = new StatsApi();