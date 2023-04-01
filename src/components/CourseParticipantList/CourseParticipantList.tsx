import React, { useEffect, useState } from 'react';
import { Avatar, Card, CardBody, CardHeader, Flex, Heading, ListItem, OrderedList, useToast, } from "@chakra-ui/react";

import { ParticipantOfCourse } from 'types';
import { Loader } from "../common/Loader/Loader";
import { api } from "../../libs/Api";
import { useParams } from "react-router-dom";
import { UnsubscribeStudentButton } from "../UnsubscribeStudentButton/UnsubscribeStudentButton";
import { AddParticipantForm } from "../AddParticipantForm/AddParticipantForm";


export const CourseParticipantList = () => {

    const [participants, setParticipants] = useState<ParticipantOfCourse[] | []>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [refresh, setRefresh] = useState<number>(0);

    const { id } = useParams() as {
        id: string
    }
    const toast = useToast();


    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const data = await api.getParticipantsOfCourse(id);
                setParticipants(data);
            } catch (e) {
                toast({
                    title: 'Błąd',
                    description: 'Nie można wyswietlić kursu. Spróbuj ponownie',
                    status: 'error',
                    duration: 3000,
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
                    <Heading size='lg'>Lista uczestników</Heading>
                    <AddParticipantForm participants={participants} refresh={setRefresh}/>
                </Flex>
            </CardHeader>
            <CardBody>
                <OrderedList spacing={5}>
                    {
                        participants.map(participant => (
                            <Flex key={participant.id} justify='space-between' align='center'>
                                <ListItem>
                                    <Avatar size='xs' marginX={5}/>
                                    {participant.firstName} {participant.lastName}
                                </ListItem>
                                <UnsubscribeStudentButton participant={participant} refresh={setRefresh}/>
                            </Flex>
                        ))
                    }
                </OrderedList>
            </CardBody>
        </Card>
    )
};

