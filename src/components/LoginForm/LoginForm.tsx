import React, { useState } from 'react';
import {
    Button,
    Card,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    useToast
} from "@chakra-ui/react";
import './LoginForm.css'
import { useForm } from "react-hook-form";
import { LoginUserDto } from 'types';
import { useNavigate } from "react-router-dom";
import { api } from "../../libs/Api";

export const LoginForm = () => {
    const [loading, setLoading] = useState<boolean>(false);

    const { register, formState: { errors }, handleSubmit } = useForm<LoginUserDto>()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const navigate = useNavigate();
    const toast = useToast();

    const login = handleSubmit(async (data, e) => {
        e?.preventDefault();
        try {
            setLoading(true);
            await api.login(data);
            navigate('/dashboard');
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
    })
    return (
        <div className='login-page'>
            <Card size='sm' align='center' justify='center' className="login-form">
                <form onSubmit={login}>
                    <Stack spacing={5}>
                        <Text fontSize='3xl'>Course Manager</Text>
                        <FormControl isInvalid={!!errors.email}>
                            <FormLabel>
                                <Input
                                    placeholder='Adres e-mail'
                                    {...register('email', {
                                        required: { value: true, message: "Pole jest wymagane" },
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: 'Nieprawidłowy adres email'
                                        }
                                    })}
                                />
                                {errors.email &&
                                    <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
                            </FormLabel>
                        </FormControl>
                        <FormControl isInvalid={!!errors.password}>
                            <FormLabel>
                                <InputGroup size='md'>
                                    <Input
                                        pr='4.5rem'
                                        type={show ? 'text' : 'password'}
                                        placeholder='Hasło'
                                        {...register('password', {
                                            required: { value: true, message: "Pole jest wymagane" },
                                        })}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                                            {show ? 'Ukryj' : 'Pokaż'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.password &&
                                    <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
                            </FormLabel>
                        </FormControl>
                        {
                            !loading
                                ?
                                <Button colorScheme='blue' ml={3} type='submit'>
                                    Zaloguj
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
                    </Stack>
                </form>
            </Card>
        </div>
    );
};