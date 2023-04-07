import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, CardBody, CardFooter, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { api } from "../../libs/Api";
import { Loader } from "../common/Loader/Loader";
import { SimpleCourseEntity } from 'types';
import { Link } from "react-router-dom";

interface Props {
    searchPhrase: string;
    refresh: number;
}

export const CoursesList = ({ searchPhrase, refresh }: Props) => {

    const [fullCoursesList, setFullCoursesList] = useState<SimpleCourseEntity[] | []>([]);
    const [filteredCourseList, setFilteredCourseList] = useState<SimpleCourseEntity[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const data = await api.getAllCourses();
                setFullCoursesList(data);
                setFilteredCourseList(data);
            } catch (e: any) {
                toast({
                    title: 'Błąd',
                    description: e.message,
                    status: 'error',
                    duration: 4000,
                    position: "top-right",
                });
            } finally {
                setLoading(false);
            }
        })();
    }, [refresh]);

    useEffect(() => {
        const searchResult = fullCoursesList.filter(course => {
            const courseNameToLowerCase = course.name.toLowerCase();
            const searchValueToLowerCase = searchPhrase.toLowerCase();

            return courseNameToLowerCase.includes(searchValueToLowerCase);
        });
        setFilteredCourseList(searchResult);
    }, [searchPhrase]);


    if ( loading ) {
        return <Loader/>
    }

    return (
        <Stack spacing='4'>
            {
                filteredCourseList.map(course => (
                    <Card key={course.id} variant={'elevated'} style={{ opacity: course.isActive ? '1' : '.5' }}>
                        <CardBody className='overflow'>
                            <Heading size='md'>
                                <>
                                    {course.name}
                                    {course.isActive || <Badge className="chips" colorScheme='red'>nieaktywny</Badge>}
                                </>
                            </Heading>
                            {course.isActive
                                ?
                                course.description && <Text noOfLines={3} py='2'>{course.description}</Text>
                                :
                                null
                            }
                        </CardBody>
                        <CardFooter>
                            <Button variant='solid' colorScheme='blue'>
                                <Link to={`/courses/${course.id}`}>
                                    Więcej
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>)
                )
            }
        </Stack>
    );
};