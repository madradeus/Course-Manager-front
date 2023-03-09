import React, { BaseSyntheticEvent, Dispatch, SetStateAction, useState } from 'react';
import {
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Stack,
    Switch,
    Text,
    Textarea,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import moment from "moment";
import { useForm } from 'react-hook-form';
import { NewCourseEntity } from 'types';
import { api } from "../../lib/Api";
import { Loader } from "../common/Loader/Loader";


interface Props {
    doRefresh: Dispatch<SetStateAction<number>>
}

export const CreateCourseForm = ({ doRefresh }: Props) => {

    const { register, reset, formState: { errors }, handleSubmit } = useForm<NewCourseEntity>();
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading, setLoading] = useState<boolean>(false);


    const addCourse = async (e: BaseSyntheticEvent | undefined, data: NewCourseEntity) => {
        e?.preventDefault();
        setLoading(true);
        try {
            await api.addNewCourse(data)
            toast({
                title: 'Sukces',
                description: 'Kurs został utworzony',
                status: 'success',
                duration: 3000,
                position: "top-right"
            });
            doRefresh(prevState => ++prevState)
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


    };

    const onSubmit = handleSubmit((data, e) => addCourse(e, data))
    const CloseAndClearForm = () => {
        onClose();
        reset();
    }


    if ( loading ) {

        return <Loader></Loader>
    }

    return (
        <>
            <Button leftIcon={<AddIcon/>} colorScheme='teal' onClick={onOpen}>
                Nowy kurs
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={() => CloseAndClearForm()}
                size='md'
            >
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Utwórz nowy kurs</DrawerHeader>
                    <form onSubmit={onSubmit}>
                        <DrawerBody>
                            <Stack spacing={8}>
                                <FormControl isInvalid={Boolean(errors.name)}>
                                    <FormLabel>
                                        <Text mb='8px'>Nazwa:</Text>
                                        <Input
                                            variant='outline'
                                            maxLength={100}
                                            {...register('name', {
                                                required: { value: true, message: 'Pole jest wymagane' },
                                                maxLength: { value: 100, message: ' Nazwa kursu jest zbyt długa' },
                                            })}
                                        />
                                        {errors.name && <FormErrorMessage>{errors.name.message}</FormErrorMessage>}
                                    </FormLabel>
                                </FormControl>

                                <FormControl isInvalid={Boolean(errors.description)}>
                                    <FormLabel>
                                        <Text mb='8px'>Opis:</Text>
                                        <Textarea
                                            resize="none"
                                            placeholder='Napisz coś więcej :)...'
                                            size='sm'
                                            {...register('description', {
                                                maxLength: { value: 1000, message: ' Opis kursu jest zbyt długi' },
                                            })}
                                        />
                                        {errors.description &&
                                            <FormErrorMessage> errors.description.message </FormErrorMessage>}
                                    </FormLabel>
                                </FormControl>

                                <FormControl isInvalid={Boolean(errors.startDate)}>
                                    <FormLabel>
                                        <Text mb='8px'>Data rozpoczęcia:</Text>
                                        <Input
                                            variant='outline'
                                            type="date"
                                            min={moment().format('YYYY-MM-DD')}
                                            {...register('startDate', {
                                                required: { value: true, message: 'Pole jest wymagane' }
                                            })}
                                        />
                                        {errors.startDate &&
                                            <FormErrorMessage> {errors.startDate.message} </FormErrorMessage>}
                                    </FormLabel>
                                </FormControl>

                                <FormControl isInvalid={Boolean(errors.isActive)}>
                                    <FormLabel htmlFor='isActive'>Aktywny:</FormLabel>
                                    <Switch
                                        id='isRequired'
                                        defaultChecked={true}
                                        {...register('isActive')}/>
                                </FormControl>
                            </Stack>
                        </DrawerBody>
                        <DrawerFooter>
                            <Button variant='outline' mr={3} onClick={() => CloseAndClearForm()}>
                                Anuluj
                            </Button>
                            <Button
                                type='submit'
                                colorScheme='blue'
                            >
                                Zapisz
                            </Button>
                        </DrawerFooter>
                    </form>
                </DrawerContent>
            </Drawer>
        </>
    )
};


