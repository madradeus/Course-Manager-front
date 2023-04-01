import React, { useContext, useEffect, useState } from 'react';
import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Container,
    Flex,
    FormLabel,
    Heading,
    Text,
    useToast
} from "@chakra-ui/react";
import { Loader } from "../common/Loader/Loader";
import { api } from "../../libs/Api";
import { getAge } from "../../utils/getAge";
import { StudentCoursesContext } from "../../contexts/StudentCoursesContext";
import { DeleteUserButton } from '../DeleteUserButton/DeleteUserButton';

interface Props {
    id?: string;
}

export const StudentDetails = ({ id }: Props) => {

    const { setStudent, student } = useContext(StudentCoursesContext);
    // const [student, setStudent] = useState<null | StudentEntity>(null);
    const [loading, setLoading] = useState(false);

    const toast = useToast();


    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                if ( !id ) {
                    return
                }
                const studentData = await api.getStudent(id);
                setStudent(studentData);
            } catch (e: any) {
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
    }, []);


    if ( loading || !student ) {
        return <Loader/>
    }
    return (
        <Card>
            <CardHeader>
                <Heading>{student.firstName} {student.lastName} {student.gender === 'male' ? '🙎' : '👩🏼'}</Heading>
            </CardHeader>
            <CardBody>
                <Flex>
                    <Container maxW='md'>
                        <FormLabel>
                            <Text fontWeight="bold" mb='8px'>Wiek: </Text>
                        </FormLabel>
                        <Text>{getAge(student.dateOfBirth)}</Text>
                    </Container>
                    <Container maxW='md'>
                        <FormLabel>
                            <Text fontWeight="bold">Adres email: </Text>
                        </FormLabel>
                        <Text>{student.emailAddress}</Text>
                    </Container>
                </Flex>
            </CardBody>
            <CardFooter justifyContent={'flex-end'}>
                <DeleteUserButton id={id}/>

            </CardFooter>
        </Card>


    )
};

