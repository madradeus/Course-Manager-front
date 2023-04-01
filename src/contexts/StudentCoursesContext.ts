import { createContext, Dispatch, SetStateAction } from "react";
import { CourseOfStudent, StudentEntity } from 'types';

interface defaultContextInterface {
    student: StudentEntity | null;
    setStudent: Dispatch<SetStateAction<StudentEntity | null>>;
    studentCourses: CourseOfStudent[];
    setStudentCourses: Dispatch<SetStateAction<CourseOfStudent[] | []>>;
}

const defaultContext: defaultContextInterface = {
    student: {
        id: '',
        dateOfBirth: new Date,
        gender: 'male',
        emailAddress: '',
        firstName: '',
        lastName: ''
    },
    setStudent: () => {
        console.log('default fn')
    },
    studentCourses: [
        {
            id: '',
            name: '',
            courseId: ''
        }
    ],
    setStudentCourses: () => {
        console.log('default fn')
    },
}

export const StudentCoursesContext = createContext(defaultContext)