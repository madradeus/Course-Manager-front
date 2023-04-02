import {
    CourseEntity,
    CourseOfStudent,
    LoginUserDto,
    NewCourseDto,
    NewStudentDto,
    ParticipantOfCourse,
    SimpleCourseEntity,
    SimpleStudentEntity,
    StudentCourseDto,
    StudentEntity
} from "types";
import { apiUrl } from "../config/api";

export class Api {
    private url: string = apiUrl;

    async getAllCourses(): Promise<SimpleCourseEntity[] | []> {
        const res = await fetch(`${this.url}/courses`, {
            credentials: "include"
        });
        if ( res.status !== 200 ) {
            throw new Error(res.statusText);
        }
        return await res.json() as CourseEntity[];
    }

    async getCourse(courseId: string): Promise<CourseEntity | null> {
        const res = await fetch(`${this.url}/courses/${courseId}`, {
            credentials: "include"
        });
        if ( res.status !== 200 ) {
            throw new Error(res.statusText);
        }
        return await res.json() as CourseEntity | null;
    }

    async addNewCourse(course: NewCourseDto): Promise<string> {
        const res = await fetch(`${this.url}/courses`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(course),
            credentials: "include"
        })
        if ( res.status !== 201 ) {
            throw new Error(res.statusText);
        }

        return await res.json() as string;
    }

    async changeActivity(id: string): Promise<void> {
        const res = await fetch(`${this.url}/courses/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
            },
            credentials: "include",
        });
        if ( res.status !== 200 ) {
            throw new Error(res.statusText);
        }
    }

    async getAllStudents(): Promise<SimpleStudentEntity[]> {
        const res = await fetch(`${this.url}/students`, {
            credentials: "include"
        });
        if ( res.status !== 200 ) {
            throw new Error(res.statusText);
        }
        return await res.json() as SimpleStudentEntity[];
    }

    async getStudent(id: string): Promise<StudentEntity | null> {
        const res = await fetch(`${this.url}/students/${id}`, {
            credentials: "include"
        });
        if ( res.status !== 200 ) {
            throw new Error(res.statusText);
        }
        const data = await res.json();
        return data === null
            ? null
            : {
                ...data,
                dateOfBirth: new Date(data.dateOfBirth)
            }
    }

    async addNewStudent(student: NewStudentDto): Promise<string> {
        const res = await fetch(`${this.url}/students`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(student),
            credentials: "include",
        });
        if ( res.status !== 201 ) {
            throw new Error(res.statusText);
        }

        return await res.json();
    }

    async getBirthdayStudents(): Promise<SimpleStudentEntity[] | []> {
        const res = await fetch(`${this.url}/students/birthday-students`, {
            credentials: "include"
        });
        if ( res.status !== 200 ) {
            throw new Error(res.statusText);
        }

        return await res.json();
    }

    async getCoursesOfStudent(studentId: string): Promise<CourseOfStudent[] | []> {
        const res = await fetch(`${this.url}/studentsCourses/list-courses/${studentId}`, {
            credentials: "include"
        });
        if ( res.status !== 200 ) {
            throw new Error();
        }
        return await res.json();

    }

    async getParticipantsOfCourse(courseId: string): Promise<ParticipantOfCourse[] | []> {
        const res = await fetch(`${this.url}/studentsCourses/list-students/${courseId}`, {
            credentials: "include"
        });
        if ( res.status !== 200 ) {
            throw new Error();
        }
        return await res.json();
    }

    async unsubscribeStudentFromCourse(subscriptionId: string): Promise<void> {
        const res = await fetch(`${this.url}/studentsCourses/${subscriptionId}`, {
            method: 'DELETE',
            credentials: "include",
        })
        if ( res.status !== 200 ) {
            throw new Error(res.statusText);
        }
    }

    async subscribeStudent(studentCourse: StudentCourseDto): Promise<void> {
        const res = await fetch(`${this.url}/studentsCourses`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(studentCourse),
            credentials: "include",
        })
        if ( res.status !== 201 ) {
            throw new Error(res.statusText);
        }
    }

    async deleteStudent(id: string): Promise<void> {
        const res = await fetch(`${this.url}/students/${id}`, {
            method: "DELETE",
            credentials: "include",
        })

        if ( res.status !== 204 ) {
            throw new Error
        }
    }

    async login(user: LoginUserDto): Promise<void> {
        const res = await fetch(`${this.url}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(user),
            credentials: "include"
        });
        if ( res.status !== 200 ) {
            throw new Error('Nie udało się zalogować')
        }
    }

    //@TODO dorobić zwrotkę

    async logout(): Promise<void> {
        const res = await fetch(`${this.url}/auth/logout`, {
            credentials: "include"
        });
        if ( res.status !== 200 ) {
            throw new Error('Nie udało się wylogować')
        }
    }
}

export const api = new Api();