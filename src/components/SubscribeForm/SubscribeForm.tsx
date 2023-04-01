import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { AddIcon } from "@chakra-ui/icons";
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
    Stack,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { StudentCoursesContext } from "../../contexts/StudentCoursesContext";
import { SimpleCourseEntity, StudentCourseDto } from 'types';
import { api } from "../../libs/Api";
import { useForm } from "react-hook-form";

interface Props {
    refresh: Dispatch<SetStateAction<number>>;

}

export const SubscribeForm = ({ refresh }: Props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { student, studentCourses } = useContext(StudentCoursesContext);
    const [availableCoursesList, setAvailableCoursesList] = useState<SimpleCourseEntity[] | null>(null);
    const { register, reset, formState: { errors }, handleSubmit } = useForm<StudentCourseDto>();
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();

    useEffect(() => {
        (async () => {
            const activeCoursesList = (await api.getAllCourses())
                .filter(course => course.isActive === true);

            const filteredCourseList = activeCoursesList.filter(course => {
                return studentCourses.filter((studentCourse) => {
                    return studentCourse.courseId === course.id
                }).length === 0
            });
            setAvailableCoursesList(filteredCourseList)
        })()
    }, []);

    const addCourseRecord = handleSubmit(async (data, e) => {
        console.log(data)
        e?.preventDefault();
        setLoading(true);
        try {
            await api.subscribeStudent({
                ...data,
                studentId: data.studentId ?? student?.id
            });
            toast({
                title: 'Sukces',
                description: 'Kursant został zapisany',
                status: 'success',
                duration: 3000,
                position: "top-right"
            });
            refresh(prevState => ++prevState)
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
            CloseAndClearForm();

        }

    });

    const CloseAndClearForm = () => {
        reset();
        onClose();

    };

    return (
        <>
            <Button leftIcon={<AddIcon/>} colorScheme='teal' onClick={onOpen}>
                Nowy kurs
            </Button>

            <Modal isOpen={isOpen} onClose={CloseAndClearForm} closeOnOverlayClick={false} size='lg' isCentered={true}>
                <ModalOverlay/>
                <ModalContent>
                    <form onSubmit={addCourseRecord}>
                        <ModalHeader>Zapisz uczestnika</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Stack spacing={5}>
                                <FormControl isInvalid={!!errors.studentId}>
                                    <FormLabel>
                                        <Text mb='8px'>Kursant:</Text>
                                        <Select isDisabled={true}
                                                defaultValue={student?.id}
                                                {...register('studentId')
                                                }
                                        >
                                            <option
                                                value={student?.id}>{student?.firstName} {student?.lastName}
                                            </option>
                                        </Select>
                                    </FormLabel>
                                </FormControl>

                                <FormControl isInvalid={!!errors.courseId}>
                                    <FormLabel>
                                        <Text mb='8px'>Kurs:</Text>
                                        <Select
                                            placeholder='Wybierz kurs'
                                            {...register('courseId', {
                                                required: { value: true, message: 'Pole jest wymagane' }
                                            })}
                                        >
                                            {
                                                availableCoursesList?.map(course => (
                                                    <option key={course.id} value={course.id}>{course.name}</option>
                                                ))
                                            }
                                        </Select>
                                        {errors.courseId &&
                                            <FormErrorMessage>{errors.courseId.message}</FormErrorMessage>}
                                    </FormLabel>
                                </FormControl>
                            </Stack>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant='ghost' onClick={CloseAndClearForm}>Anuluj </Button>
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
};

