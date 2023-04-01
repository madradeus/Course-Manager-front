import { GetActiveStudentsNumberResponse, GetNumberOfActiveCoursesResponse, GetTotalAvgFrequencyResponse } from "types";
import { apiUrl } from "../config/api";

class StatsApi {
    url: string = `${apiUrl}/stats`

    async getActiveCoursesNumber(): Promise<GetNumberOfActiveCoursesResponse> {
        const res = await fetch(`${this.url}/active-courses`);
        if ( res.status !== 200 ) {
            throw new Error();
        }
        return await res.json()
    }

    async getActiveStudentsNumber(): Promise<GetActiveStudentsNumberResponse> {
        const res = await fetch(`${this.url}/active-students`);
        if ( res.status !== 200 ) {
            throw new Error();
        }
        return await res.json()
    }

    async getAvgFrequency(): Promise<GetTotalAvgFrequencyResponse> {
        const res = await fetch(`${this.url}/avg-frequency`);
        if ( res.status !== 200 ) {
            throw new Error();
        }
        return await res.json()
    }
}

export const statsApi = new StatsApi();