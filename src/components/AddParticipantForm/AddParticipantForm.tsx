import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { ParticipantOfCourse, SimpleStudentEntity, StudentCourseDto } from 'types';
import { api } from "../../libs/Api";
import { useParams } from "react-router-dom";

interface Props {
    participants: ParticipantOfCourse[];
    refresh: Dispatch<SetStateAction<number>>;
}


export const AddParticipantForm = ({ participants, refresh }: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [studentsList, setStudentsList] = useState<SimpleStudentEntity[]>([]);
    const { register, reset, formState: { errors }, handleSubmit } = useForm<StudentCourseDto>();
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();
    const { id: courseId } = useParams() as {
        id: string;
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const students = await api.getAllStudents();
                const filteredStudentList = students.filter(student => {
                    return participants.filter((participant) => {
                        return participant.studentId === student.id
                    }).length === 0;
                });
                setStudentsList(filteredStudentList);
            } catch (e: any) {
                toast({
                    title: 'Błąd',
                    description: e.message,
                    status: 'error',
                    duration: 4000,
                    position: "top-right"
                });
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const CloseAndClearForm = () => {
        reset();
        onClose();
    };

    const addParticipant = handleSubmit(async (data, e) => {
        e?.preventDefault();
        setLoading(true)
        try {
            await api.subscribeStudent({
                ...data,
                courseId,
            })
            toast({
                title: 'Sukces',
                description: 'Kursant został zapisany',
                status: 'success',
                duration: 3000,
                position: "top-right",
            });
            refresh(prevState => ++prevState);
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
            CloseAndClearForm();
        }
    });


    return (
        <>
            {
                !loading
                    ?
                    <Button leftIcon={<AddIcon/>} colorScheme='teal' onClick={onOpen}>
                        Nowy uczestnik
                    </Button>
                    :
                    <Button
                        isLoading
                        loadingText='Wczytywanie'
                        colorScheme='teal'
                        variant='outline'
                        spinnerPlacement='start'
                    />
            }

            <Modal
                isOpen={isOpen}
                onClose={CloseAndClearForm}
                closeOnOverlayClick={false}
                size='lg'
                isCentered={true}
            >
                <ModalOverlay/>
                <ModalContent>
                    <form onSubmit={addParticipant}>
                        <ModalHeader>Zapisz uczestnika</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <FormControl isInvalid={!!errors.studentId}>
                                <FormLabel>
                                    <Text mb='8px'>Kursant:</Text>
                                    <Select
                                        placeholder="Wybierz kursanta"
                                        {...register('studentId', {
                                            required: { value: true, message: 'Pole jest wymagane' }
                                        })
                                        }
                                    >
                                        {
                                            studentsList.map(student => (
                                                <option key={student.id}
                                                        value={student.id}>{student.lastName} {student.firstName}
                                                </option>))
                                        }
                                    </Select>
                                    {errors.studentId &&
                                        <FormErrorMessage>{errors.studentId.message}</FormErrorMessage>}
                                </FormLabel>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='ghost' onClick={CloseAndClearForm}>Anuluj</Button>
                            {
                                !loading
                                    ?
                                    <Button colorScheme='blue' ml={3} type='submit'>
                                        Zapisz
                                    </Button>
                                    :
                                    <Button
                                        isLoading
                                        loadingText='Zapisz'
                                        colorScheme='blue'
                                        variant='outline'
                                        spinnerPlacement='start'
                                    />
                            }
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
}