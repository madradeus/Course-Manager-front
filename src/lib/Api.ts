import {
    CourseEntity,
    CourseOfStudent,
    NewCourseEntity,
    NewStudentEntity,
    ParticipantOfCourse,
    SimpleCourseEntity,
    SimpleStudentEntity,
    StudentEntity
} from "types";
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

        return await res.json() as string;
    }

    async changeActivity(id: string): Promise<void> {
        const res = await fetch(`${this.url}/courses/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
        });
        if ( res.status !== 200 ) {
            throw new Error(res.statusText);
        }
    }

    async getAllStudents(): Promise<SimpleStudentEntity[]> {
        const res = await fetch(`${this.url}/students`);
        if ( res.status !== 200 ) {
            throw new Error(res.statusText)
        }
        return await res.json() as SimpleStudentEntity[];
    }

    async getStudent(id: string): Promise<StudentEntity | null> {
        const res = await fetch(`${this.url}/students/${id}`);
        if ( res.status !== 200 ) {
            throw new Error(res.statusText)
        }
        const data = await res.json();
        return data === null
            ? null
            : {
                ...data,
                dateOfBirth: new Date(data.dateOfBirth)
            }
    }

    async addNewStudent(student: NewStudentEntity): Promise<string> {
        const res = await fetch(`${this.url}/students`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(student)
        });
        if ( res.status !== 201 ) {
            throw new Error(res.statusText)
        }

        return await res.json();
    }

    async getBirthdayStudents(): Promise<SimpleStudentEntity[] | []> {
        const res = await fetch(`${this.url}/students/birthday-students`);
        if ( res.status !== 200 ) {
            throw new Error(res.statusText)
        }

        return await res.json()
    }

    async getCoursesOfStudent(studentId: string): Promise<CourseOfStudent[] | []> {
        const res = await fetch(`${this.url}/studentsCourses/list-courses/${studentId}`);
        if ( res.status !== 200 ) {
            throw new Error()
        }
        return await res.json();

    }

    async getParticipantsOfCourse(courseId: string): Promise<ParticipantOfCourse[] | []> {
        const res = await fetch(`${this.url}/studentsCourses/list-students/${courseId}`);
        if ( res.status !== 200 ) {
            throw new Error();
        }
        return await res.json();
    }

    async unsubscribeStudentFromCourse(subscriptionId: string): Promise<void> {
        await fetch(`${this.url}/studentsCourses/${subscriptionId}`, {
            method: 'DELETE'
        })
    }

}

export const api = new Api();

