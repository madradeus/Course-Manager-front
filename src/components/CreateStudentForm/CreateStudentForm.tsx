import React, { Dispatch, SetStateAction, useState } from 'react';
import { AddIcon } from "@chakra-ui/icons";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
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
import { useForm } from "react-hook-form";
import { NewStudentEntity } from 'types';
import moment from "moment";
import { Loader } from "../common/Loader/Loader";
import { api } from "../../lib/Api";


interface Props {
    doRefresh: Dispatch<SetStateAction<number>>;
}

export const CreateStudentForm = ({ doRefresh }: Props) => {


    const { register, reset, formState: { errors }, handleSubmit } = useForm<NewStudentEntity>();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();


    const addStudent = handleSubmit(async (data, e) => {
        e?.preventDefault();
        console.log(data)
        try {
            setLoading(true);
            await api.addNewStudent(data);
            toast({
                title: 'Sukces',
                description: 'Kursant został utworzony',
                status: 'success',
                duration: 3000,
                position: "top-right"
            });
            doRefresh(prevState => ++prevState);
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
            CloseAndClearForm();
        }

    });

    const CloseAndClearForm = () => {
        onClose();
        reset();
    }
    if ( loading ) {
        return <Loader/>
    }
    return (
        <>
            <Button leftIcon={<AddIcon/>} colorScheme='teal' onClick={onOpen}>
                Dodaj kursanta
            </Button>

            <Modal isOpen={isOpen} onClose={CloseAndClearForm} size='lg' isCentered={true}>
                <ModalOverlay/>
                <ModalContent>
                    <form onSubmit={addStudent}>
                        <ModalHeader>Dodaj kursanta</ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Stack spacing={5}>
                                <FormControl isInvalid={!!errors.firstName}>
                                    <FormLabel>
                                        <Text mb='8px'>Imię:</Text>
                                        <Input
                                            variant='outline'
                                            {...register('firstName', {
                                                required: { value: true, message: 'Pole jest wymagane' },
                                                maxLength: { value: 15, message: "Imię nie może przkraczać 15 znaków" },
                                            })}
                                        />
                                        {errors.firstName &&
                                            <FormErrorMessage>{errors.firstName.message}</FormErrorMessage>}
                                    </FormLabel>
                                </FormControl>

                                <FormControl isInvalid={!!errors.lastName}>
                                    <FormLabel>
                                        <Text mb='8px'>Nazwisko:</Text>
                                        <Input
                                            variant='outline'
                                            {...register('lastName', {
                                                required: { value: true, message: 'Pole jest wymagane' },
                                                maxLength: {
                                                    value: 35,
                                                    message: 'Nazwisko nie może przekraczać 35 znaków'
                                                },
                                            })}
                                        />
                                    </FormLabel>
                                    {errors.lastName && <FormErrorMessage>{errors.lastName.message}</FormErrorMessage>}
                                </FormControl>

                                <FormControl isInvalid={!!errors.gender}>
                                    <FormLabel>
                                        <Text mb='10px'>Płeć:</Text>
                                        <Select
                                            placeholder='Wybierz płeć'
                                            {...register('gender', {
                                                required: { value: true, message: 'Pole jest wymagane' },
                                            })}
                                        >
                                            <option value='female'>Kobieta</option>
                                            <option value='male'>Mężczyzna</option>
                                        </Select>
                                        {errors.gender && <FormErrorMessage>{errors.gender.message}</FormErrorMessage>}
                                    </FormLabel>
                                </FormControl>

                                <FormControl isInvalid={!!errors.dateOfBirth}>
                                    <FormLabel>
                                        <Text mb='8px'>Data urodzenia:</Text>
                                        <Input
                                            variant='outline'
                                            type='date'
                                            max={moment(new Date().valueOf() - 18 * 31556952000).format('YYYY-MM-DD')}
                                            {...register('dateOfBirth', {
                                                required: { value: true, message: 'Pole jest wymagane' },
                                                valueAsDate: true
                                            })}
                                        />
                                        {errors.dateOfBirth &&
                                            <FormErrorMessage>{errors.dateOfBirth.message}</FormErrorMessage>}
                                    </FormLabel>
                                </FormControl>

                                <FormControl isInvalid={!!errors.emailAddress}>
                                    <FormLabel>
                                        <Text mb='8px'>Adres email:</Text>
                                        <Input
                                            variant='outline'
                                            {...register('emailAddress', {
                                                required: { value: true, message: 'Pole jest wymagane' },
                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message: 'Nieprawidłowy adres email'
                                                }
                                            })}

                                        />
                                        {errors.emailAddress &&
                                            <FormErrorMessage>{errors.emailAddress.message}</FormErrorMessage>}
                                    </FormLabel>
                                </FormControl>


                            </Stack>

                        </ModalBody>
                        <ModalFooter>
                            <Button variant='ghost' onClick={CloseAndClearForm}>Anuluj </Button>
                            <Button colorScheme='blue' mr={3} type='submit'>
                                Zapisz
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};
