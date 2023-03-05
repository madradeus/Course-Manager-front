import React from 'react';
import { Spinner } from "@chakra-ui/react";

import './Loader.css'

export const Loader = () => {
    return (
        <div className='loader'>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
        </div>
    );
};


