import React, { useEffect, useState } from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Stack,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber,
    useToast
} from "@chakra-ui/react";
import { statsApi } from "../../libs/StatsApi";
import { GetActiveStudentsNumberResponse, GetNumberOfActiveCoursesResponse, GetTotalAvgFrequencyResponse } from 'types';
import { Loader } from "../common/Loader/Loader";


export const StatsList = () => {

    const [activeCourses, setActiveCourses] = useState<GetNumberOfActiveCoursesResponse | null>(null);
    const [activeStudents, setActiveStudents] = useState<GetActiveStudentsNumberResponse | null>(null);
    const [avgFrequency, setAvgFrequency] = useState<GetTotalAvgFrequencyResponse | null>(null);
    const toast = useToast();

    useEffect(() => {
        (async () => {
            try {
                const activeCourses = await statsApi.getActiveCoursesNumber();
                setActiveCourses(activeCourses);
                const activeStudents = await statsApi.getActiveStudentsNumber();
                setActiveStudents(activeStudents);
                const avgFrequency = await statsApi.getAvgFrequency();
                setAvgFrequency(avgFrequency);
            } catch (e: any) {
                toast({
                    title: 'Błąd',
                    description: e.message,
                    status: 'error',
                    duration: 3000,
                    position: "top-right"
                });
            }
        })()
    }, []);

    if ( !activeCourses || !activeStudents || !avgFrequency )
        return <Loader/>

    return (
        <div>
            <Card>
                <CardHeader>
                    <Heading size='lg'>Twoje statystyki</Heading>
                </CardHeader>
                <CardBody>
                    <Stack direction={'row'} alignItems={"space-around"} spacing={10}>
                        <Stat>
                            <StatLabel>Liczba aktywnych kursów</StatLabel>
                            <StatNumber>{activeCourses.coursesNumber}</StatNumber>
                        </Stat>

                        <Stat>
                            <StatLabel>Liczba aktywnych kursantów</StatLabel>
                            <StatNumber>{activeStudents.studentsNumber}</StatNumber>
                            <StatHelpText>zapisanych na co najmniej jeden kurs</StatHelpText>
                        </Stat>

                        <Stat>
                            <StatLabel>Średnia frekwencja</StatLabel>
                            <StatNumber>{avgFrequency.avgFrequency.toFixed(1)}</StatNumber>
                            <StatHelpText>uczestników / kurs</StatHelpText>
                        </Stat>
                    </Stack>
                </CardBody>
            </Card>
        </div>
    );
};