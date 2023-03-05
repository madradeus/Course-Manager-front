import React from 'react';
import { CourseDetails } from "../../components/CourseDetails/CourseDetails";
import {
    Avatar,
    AvatarBadge,
    Card,
    CardBody,
    CardHeader,
    Heading,
    ListItem,
    OrderedList,
    Stack
} from "@chakra-ui/react";

export const SingleCourseView = () => {

    return (
        <Stack spacing={8}>
            <CourseDetails/>

            <Card>
                <CardHeader>
                    <Heading size='lg'>Lista uczestników</Heading>
                </CardHeader>
                <CardBody>
                    <OrderedList>
                        <ListItem className='list-element'>
                            <Avatar>
                                <AvatarBadge bg='green.500'/>
                            </Avatar>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        </ListItem>
                    </OrderedList>

                </CardBody>
            </Card>
        </Stack>
    )


};


