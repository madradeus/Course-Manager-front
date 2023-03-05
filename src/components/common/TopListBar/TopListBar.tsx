import React, { Dispatch, SetStateAction } from 'react';
import { Input, InputGroup, InputLeftElement, } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';
import { CreateCourseForm } from "../../CreateCourseForm/CreateCourseForm";

import './TopListBar.css'

interface Props {
    onChange: Dispatch<SetStateAction<string>>;
    searchValue: string;
    placeholder: string;
}

export const TopListBar = ({ onChange, searchValue, placeholder }: Props) => {


    return (
        <div className="search-bar">
            <div className='search'>
                <InputGroup>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<SearchIcon color='gray.300'/>}
                    />
                    <Input variant='outline' size="lg" placeholder={placeholder} value={searchValue}
                           onChange={(e) => onChange(e.target.value)}/>
                </InputGroup>
            </div>
            <CreateCourseForm/>

        </div>
    );
};


