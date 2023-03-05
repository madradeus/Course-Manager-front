import React from 'react';

import './NotFoundView.css'
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const NotFoundView = () => {
    return (
        <div className='not-found'>
            <h1> Upss! Chyba się zgubiłeś, synek? 🤨</h1>
            <h2>404 Not Found</h2>
            <Button size='lg' colorScheme="teal">
                <Link to='/'>
                    Wracam na stronę głowną
                </Link>

            </Button>
        </div>
    );
};


