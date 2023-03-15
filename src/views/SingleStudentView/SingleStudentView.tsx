import React from 'react';
import { useParams } from "react-router-dom";
import { StudentDetails } from "../../components/StudentDetails/StudentDetails";
import { Stack } from "@chakra-ui/react";
import { StudentCoursesList } from "../../StudentCoursesList/StudentCoursesList";

export const SingleStudentView = () => {

    const { id } = useParams()
    return (
        <Stack spacing={8}>
            <StudentDetails id={id}/>
            <StudentCoursesList id={id}/>
        </Stack>
    );
};


