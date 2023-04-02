import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { StudentDetails } from "../../components/StudentDetails/StudentDetails";
import { Stack } from "@chakra-ui/react";
import { StudentCoursesList } from "../../components/StudentCoursesList/StudentCoursesList";
import { StudentCoursesContext } from "../../contexts/StudentCoursesContext";
import { CourseOfStudent, StudentEntity } from 'types';

export const SingleStudentView = () => {

    const [student, setStudent] = useState<null | StudentEntity>(null);
    const [studentCourses, setStudentCourses] = useState<CourseOfStudent[] | []>([]);
    const { id } = useParams();

    return (
        <StudentCoursesContext.Provider value={{
            student,
            setStudent,
            studentCourses,
            setStudentCourses,
        }}>
            <Stack spacing={8}>
                <StudentDetails id={id}/>
                <StudentCoursesList id={id}/>
            </Stack>
        </StudentCoursesContext.Provider>
    );
};