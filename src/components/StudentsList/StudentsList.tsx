import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Heading, useToast, } from "@chakra-ui/react";
import { OneListItem } from "../../OneListItem/OneListItem";
import { SimpleStudentEntity } from 'types'
import { api } from "../../lib/Api";
import { Loader } from "../common/Loader/Loader";

interface Props {
    searchPhrase: string;
    refresh: number;

}

export const StudentsList = ({ searchPhrase, refresh }: Props) => {

    const [fullStudentsList, setFullStudentsList] = useState<null | SimpleStudentEntity[]>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [filteredStudentList, setFilteredStudentList] = useState<SimpleStudentEntity[] | []>([]);

    const toast = useToast()

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const students = await api.getAllStudents();
                setFullStudentsList(students);
                setFilteredStudentList(students);
            } catch (e: any) {
                toast({
                    title: 'Błąd',
                    description: e.message,
                    status: 'error',
                    duration: 4000,
                    position: "top-right"
                });
            } finally {
                setLoading(false)
            }
        })();
    }, [refresh]);


    useEffect(() => {
        const searchResult = fullStudentsList?.filter(student => {
            const studentLastNameToLowerCase = student.lastName.toLowerCase();
            const searchPhraseToLowerCase = searchPhrase.toLowerCase();

            return studentLastNameToLowerCase.includes(searchPhraseToLowerCase);
        })
        if ( searchResult ) {
            setFilteredStudentList(searchResult);
        }
    }, [searchPhrase]);


    if ( loading ) {
        return <Loader/>
    }
    return (
        <Card>
            <CardHeader>
                <Heading>Kursanci</Heading>
            </CardHeader>
            <CardBody>
                {
                    filteredStudentList?.map(student => <OneListItem key={student.id} student={student}/>)
                }
            </CardBody>
        </Card>
    );
};

