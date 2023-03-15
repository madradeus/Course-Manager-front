import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Flex, Heading, ListItem, UnorderedList, useToast } from "@chakra-ui/react";
import { CourseOfStudent } from 'types'
import { api } from "../lib/Api";
import { Loader } from "../components/common/Loader/Loader";
import { UnsubscribeStudentButton } from "../components/UnsubscribeStudentButton/UnsubscribeStudentButton";

interface Props {
    id?: string;
}

export const StudentCoursesList = ({ id }: Props) => {

    const [studentCourses, setStudentCourses] = useState<CourseOfStudent[] | []>([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState<number>(0);

    const toast = useToast()

    useEffect(() => {
        (async () => {
            try {
                if ( !id ) {
                    return;
                }
                setLoading(true);
                const data = await api.getCoursesOfStudent(id);
                setStudentCourses(data);
            } catch (e) {
                toast({
                    title: 'Błąd',
                    description: 'Nie udało się przetworzyć żądania. Spróbuj ponownie',
                    status: 'error',
                    duration: 4000,
                    position: "top-right"
                });
            } finally {
                setLoading(false);
            }
        })()
    }, [refresh]);

    if ( loading ) {
        return <Loader/>
    }
    return (
        <Card>
            <CardHeader>
                <Heading size='lg'>Kursy użytkownika</Heading>
            </CardHeader>
            <CardBody>
                <UnorderedList spacing={5}>
                    {
                        studentCourses.map(course => (
                            <Flex key={course.id} justify='space-between' align='center'>
                                <ListItem>
                                    {course.name}
                                </ListItem>
                                <UnsubscribeStudentButton course={course} refresh={setRefresh}/>
                            </Flex>))
                    }
                </UnorderedList>
            </CardBody>
        </Card>
    );
};
