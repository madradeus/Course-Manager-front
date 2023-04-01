import React, { useContext, useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Flex, Heading, ListItem, UnorderedList, useToast } from "@chakra-ui/react";
import { api } from "../../libs/Api";
import { Loader } from "../common/Loader/Loader";
import { UnsubscribeStudentButton } from "../UnsubscribeStudentButton/UnsubscribeStudentButton";
import { SubscribeForm } from "../SubscribeForm/SubscribeForm";
import { StudentCoursesContext } from "../../contexts/StudentCoursesContext";

interface Props {
    id?: string;
}

export const StudentCoursesList = ({ id }: Props) => {

    const { studentCourses, setStudentCourses } = useContext(StudentCoursesContext);
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
                <Flex justifyContent='space-between'>
                    <Heading size='lg'>
                        Lista kursów
                    </Heading>
                    <SubscribeForm refresh={setRefresh}/>
                </Flex>

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
