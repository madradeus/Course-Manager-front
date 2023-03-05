import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Container,
    Flex,
    FormLabel,
    Heading,
    Input,
    Stack,
    Switch,
    Text,
    useToast
} from "@chakra-ui/react";
import { api } from "../../lib/Api";
import { Loader } from "../common/Loader/Loader";
import { CourseEntity } from 'types';
import moment from "moment";
import { NotFoundView } from "../../views/NotFoundView/NotFoundView";

export const CourseDetails = () => {

    const [course, setCourse] = useState<CourseEntity | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<number>(0);

    const { id } = useParams() as {
        id: string
    };
    const toast = useToast();


    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const course = await api.getCourse(id);
                setCourse(course)
            } catch (e) {
                toast({
                    title: 'Błąd',
                    description: 'Nie można wyswietlić kursu. Spróbuj ponownie',
                    status: 'error',
                    duration: 3000,
                    position: "top-right"
                });
            } finally {
                setLoading(false)
            }
        })()
    }, [refresh]);

    const changeActivity = async () => {
        try {
            await api.changeActivity(id);
            setRefresh(prevState => ++prevState);
        } catch (e: any) {
            console.log(e.message)
            toast({
                title: 'Błąd',
                description: e.message,
                status: 'error',
                duration: 3000,
                position: "top-right"
            });

        }

    }

    if ( loading ) {
        return <Loader/>
    }
    if ( course === null ) {
        return (
            <NotFoundView/>
        )

    }
    return (
        <>
            <Card>
                <CardHeader>
                    <Heading size='lg'>
                        {course.name}
                        {course.isActive
                            ?
                            <Badge className='chips' colorScheme='green'>Aktywny</Badge>
                            :
                            <Badge className='chips' colorScheme='red'>Nieaktywny</Badge>

                        }
                    </Heading>
                </CardHeader>
                <CardBody>
                    <Stack spacing={8}>
                        {
                            course.description && <Text>{course.description}</Text>
                        }
                        <Flex>
                            <Container maxW='md'>
                                <FormLabel>
                                    <Text mb='8px'>Data rozpoczęcia:</Text>
                                    <Input
                                        variant='outline'
                                        type="date"
                                        defaultValue={moment(course.startDate).format('YYYY-MM-DD')}
                                        disabled
                                    >
                                    </Input>
                                </FormLabel>

                            </Container>
                            <Container maxW='md'>
                                <FormLabel htmlFor='isActive'>Aktywny:</FormLabel>
                                <Switch defaultChecked={course.isActive} disabled/>
                            </Container>
                        </Flex>
                        <CardFooter justifyContent={'flex-end'}>
                            <Button variant='outline' mr={3}>
                                <Link to='/courses'>
                                    Anuluj
                                </Link>
                            </Button>
                            <Button onClick={changeActivity}
                                    colorScheme='red'>{course.isActive ? 'Dezaktywuj' : 'Aktywuj'}</Button>
                        </CardFooter>

                    </Stack>
                </CardBody>
            </Card>


        </>
    );

}
