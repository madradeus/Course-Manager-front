import React, { useState } from 'react';
import {
    Button,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    UnorderedList,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { CourseOfStudent } from 'types';
import { api } from "../../libs/Api";
import { useNavigate } from "react-router-dom";

interface Props {
    id?: string;
}

export const DeleteUserButton = ({ id }: Props) => {

    const [studentCourses, setStudentCourses] = useState<CourseOfStudent[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    const checkCourses = async () => {
        if ( !id ) {
            return;
        }
        setLoading(true);
        try {
            const studentCourses = await api.getCoursesOfStudent(id);
            setStudentCourses(studentCourses);
        } catch (e: any) {
            toast({
                title: 'Błąd',
                description: e.message,
                status: 'error',
                duration: 3000,
                position: "top-right",
            });
        } finally {
            setLoading(false);
            onOpen();
        }
    };

    const deleteStudent = async () => {
        setLoading(true)
        if ( !id ) {
            return;
        }
        try {
            await api.deleteStudent(id)
            toast({
                title: 'Sukces',
                description: 'Kursant został usunięty',
                status: 'success',
                duration: 3000,
                position: "top-right",
            });
        } catch (e: any) {
            toast({
                title: 'Błąd',
                description: e.message,
                status: 'error',
                duration: 3000,
                position: "top-right",
            });
        } finally {
            setLoading(false);
            navigate('/students');
        }
    }

    return (
        <>
            {
                !loading
                    ?
                    <Button
                        colorScheme='red'
                        ml={3}
                        onClick={checkCourses}
                    >
                        Usuń
                    </Button>
                    :
                    <Button
                        isLoading
                        loadingText='Usuń'
                        colorScheme='red'
                        variant='outline'
                        spinnerPlacement='start'
                    />
            }
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Usunąć kursanta?</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {
                            studentCourses.length
                                ?
                                <>
                                    <Text>Kursant uczestniczy w: </Text>
                                    <UnorderedList>
                                        {studentCourses.map(course => <ListItem>{course.name}</ListItem>)}
                                    </UnorderedList>
                                </>
                                :
                                <Text>Czy napewno chcesz usunąc kursanta? </Text>
                        }
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' onClick={onClose}>Anuluj</Button>
                        {
                            !loading
                                ?
                                <Button
                                    colorScheme='red'
                                    ml={3}
                                    onClick={deleteStudent}
                                >
                                    Usuń
                                </Button>
                                :
                                <Button
                                    isLoading
                                    loadingText='Usuń'
                                    colorScheme='red'
                                    variant='outline'
                                    spinnerPlacement='start'
                                />
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};