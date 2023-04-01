import React from 'react';
import { CourseDetails } from "../../components/CourseDetails/CourseDetails";
import { Stack } from "@chakra-ui/react";
import { CourseParticipantList } from "../../components/CourseParticipantList/CourseParticipantList";

export const SingleCourseView = () => {

    return (
        <Stack spacing={8}>
            <CourseDetails/>
            <CourseParticipantList/>
        </Stack>
    )


};


