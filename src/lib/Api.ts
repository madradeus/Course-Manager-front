import { CourseEntity, NewCourseEntity, SimpleCourseEntity } from "types";
import { apiUrl } from "../config/api";

export class Api {
    private url: string = apiUrl;

    async getAllCourses(): Promise<SimpleCourseEntity[] | []> {

        const res = await fetch(`${this.url}/courses`);
        if ( res.status !== 200 ) {
            throw new Error(res.statusText);
        }
        return await res.json() as CourseEntity[];
    }

    async getCourse(courseId: string): Promise<CourseEntity | null> {

        const res = await fetch(`${this.url}/courses/${courseId}`);
        if ( res.status !== 200 ) {
            throw new Error(res.statusText);
        }
        return await res.json() as CourseEntity | null;
    }

    async addNewCourse(course: NewCourseEntity): Promise<string> {

        const res = await fetch(`${this.url}/courses`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(course),
        })
        if ( res.status !== 201 ) {
            throw new Error(res.statusText)
        }

        return await res.json()
    }

    async changeActivity(id: string): Promise<void> {
        const res = await fetch(`${this.url}/courses/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
        });
        if ( res.status !== 200 ) {
            throw new Error(res.statusText)
        }
    }

}

export const api = new Api();

