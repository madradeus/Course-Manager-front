import {
    CourseEntity,
    CourseOfStudent,
    CourseUpdateResponse,
    LoginUserDto,
    NewCourseDto,
    NewStudentDto,
    ParticipantOfCourse,
    SimpleCourseEntity,
    SimpleStudentEntity,
    StudentCourseDto,
    StudentEntity
} from "types";
import { myApi } from "../utils/interceptor";

export class Api {

    async getAllCourses(): Promise<SimpleCourseEntity[] | []> {
        const { data } = await myApi
            .get(`courses`, {
                withCredentials: true,
            });
        return data as SimpleCourseEntity[] | [];

    }


    async getCourse(courseId: string): Promise<CourseEntity | null> {
        const { data } = await myApi
            .get(`courses/${courseId}`, {
                withCredentials: true,
            });
        return data as CourseEntity | null;

    }

    async addNewCourse(course: NewCourseDto): Promise<string> {
        const { data } = await myApi
            .post('/courses', JSON.stringify(course), {
                headers: {
                    'content-type': 'application/json',
                },
                withCredentials: true
            });
        return data as string;
    }

    async changeActivity(id: string): Promise<CourseUpdateResponse> {
        const { data } = await myApi
            .patch(`/courses/${id}`, null, {
                withCredentials: true
            });
        return data as CourseUpdateResponse;
    }

    async getAllStudents(): Promise<SimpleStudentEntity[]> {
        const { data } = await myApi
            .get('/students', {
                withCredentials: true
            });
        return data as SimpleStudentEntity[];

    }

    async getStudent(id: string): Promise<StudentEntity | null> {
        const { data } = await myApi
            .get(`/students/${id}`, {
                withCredentials: true
            });
        return data === null
            ? null
            : {
                ...data,
                dateOfBirth: new Date(data.dateOfBirth)
            } as StudentEntity;
    }

    async addNewStudent(student: NewStudentDto): Promise<string> {
        const { data } = await myApi
            .post('/students', JSON.stringify(student), {
                headers: {
                    'content-type': 'application/json',
                },
                withCredentials: true
            });
        return data as string;
    }

    async getBirthdayStudents(): Promise<SimpleStudentEntity[] | []> {
        const { data } = await myApi
            .get('/students/birthday-students', {
                withCredentials: true,
            });
        return data as SimpleStudentEntity[] | [];
    }

    async getCoursesOfStudent(studentId: string): Promise<CourseOfStudent[] | []> {
        const { data } = await myApi
            .get(`/studentsCourses/list-courses/${studentId}`, {
                withCredentials: true,
            });
        return data as CourseOfStudent[] | [];
    }

    async getParticipantsOfCourse(courseId: string): Promise<ParticipantOfCourse[] | []> {
        const { data } = await myApi
            .get(`/studentsCourses/list-students/${courseId}`, {
                withCredentials: true,
            });
        return data as ParticipantOfCourse[] | [];
    }

    async unsubscribeStudentFromCourse(subscriptionId: string): Promise<void> {
        await myApi
            .delete(`/studentsCourses/${subscriptionId}`, {
                withCredentials: true,
            });
    }

    async subscribeStudent(studentCourse: StudentCourseDto): Promise<string> {
        const { data } = await myApi
            .post(`/studentsCourses`, JSON.stringify(studentCourse), {
                headers: {
                    "content-type": "application/json"
                },
                withCredentials: true
            });
        return data as string;
    }

    async deleteStudent(id: string): Promise<void> {
        await myApi
            .delete(`/students/${id}`, {
                withCredentials: true,
            });
    }

    async login(user: LoginUserDto): Promise<void> {
        await myApi.post('/auth/login', JSON.stringify(user), {
            headers: {
                "content-type": "application/json"
            },
            withCredentials: true
        });
    }

    async logout(): Promise<void> {
        await myApi
            .get('/auth/logout', {
                withCredentials: true,
            });
    }
}

export const api = new Api();