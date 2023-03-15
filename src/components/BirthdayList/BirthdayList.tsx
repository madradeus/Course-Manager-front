import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Heading, useToast } from "@chakra-ui/react";
import { SimpleStudentEntity } from 'types';
import { OneListItem } from "../OneListItem/OneListItem";
import { api } from "../../lib/Api";
import { Loader } from "../common/Loader/Loader";

export const BirthdayList = () => {

    const [birthdayStudentList, setBirthdayStudentList] = useState<SimpleStudentEntity[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const toast = useToast();

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const data = await api.getBirthdayStudents();
                setBirthdayStudentList(data);
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
        })();
    }, []);

    if ( loading ) {
        return <Loader/>
    }
    return (
        <Card>
            <CardHeader>
                <Heading size='lg'>Dzisiaj obchodzą urodziny</Heading>
            </CardHeader>
            <CardBody>
                {
                    birthdayStudentList.map(student => <OneListItem key={student.id} student={student}/>)
                }
            </CardBody>
        </Card>
    );
};


