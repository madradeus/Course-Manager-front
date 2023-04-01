import React, { Dispatch, SetStateAction, useState } from 'react';
import {
    Button,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { CourseOfStudent, ParticipantOfCourse } from 'types'
import { api } from "../../libs/Api";


interface Props {
    participant?: ParticipantOfCourse;
    course?: CourseOfStudent;
    refresh: Dispatch<SetStateAction<number>>;
}

export const UnsubscribeStudentButton = ({ participant, refresh, course }: Props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState<boolean>(false);

    const toast = useToast();

    const confirmUnsubscription = async () => {
        try {
            setLoading(true);
            if ( participant ) {
                await api.unsubscribeStudentFromCourse(participant.id)
            } else if ( course ) {
                await api.unsubscribeStudentFromCourse(course.id);
            }
            refresh(prevState => ++prevState)
            toast({
                title: 'Sukces',
                description: 'Uczestnik został wypisany',
                status: 'success',
                duration: 3000,
                position: "top-right"
            });
        } catch (e) {
            toast({
                title: 'Błąd',
                description: 'Nie można przetworzyć żądania. Spróbuj ponownie',
                status: 'error',
                duration: 3000,
                position: "top-right"
            });
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Menu>
                <MenuButton as={Button} variant='ghost'>
                    ...
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={onOpen}>Wypisz</MenuItem>
                </MenuList>
            </Menu>
            <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Wypisać uczestnika?</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <Text>Czy napewno wypisać uczestnika z kursu? </Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button variant='ghost' onClick={onClose}>Anuluj</Button>
                        {
                            !loading
                                ?
                                <Button
                                    colorScheme='red'
                                    ml={3}
                                    onClick={confirmUnsubscription}
                                >
                                    Wypisz
                                </Button>
                                :
                                <Button
                                    isLoading
                                    loadingText='Wypisz'
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


