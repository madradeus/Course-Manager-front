import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Container, Flex, FormLabel, Heading, Stack, Text } from "@chakra-ui/react";
import { StudentEntity } from 'types';
import { Loader } from "../common/Loader/Loader";
import { api } from "../../lib/Api";
import { getAge } from "../utils/getAge";

interface Props {
    id?: string;
}

export const StudentDetails = ({ id }: Props) => {

    const [student, setStudent] = useState<null | StudentEntity>(null);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                if ( !id ) {
                    return
                }
                const studentData = await api.getStudent(id);
                setStudent(studentData);
            } catch (e) {

            } finally {
                setLoading(false);
            }
        })()
    }, []);


    if ( loading || !student ) {
        return <Loader/>
    }
    return (
        <Stack spacing={8}>
            <Card>
                <CardHeader>
                    <Heading>{student.firstName} {student.lastName} {student.gender === 'male' ? '♂' : '♀'}</Heading>
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
            </Card>

            <Card>
                <CardHeader>
                    <Heading size='lg'>Kursy użytkownika</Heading>
                </CardHeader>
                <CardBody>

                </CardBody>
            </Card>

        </Stack>

    )
};

