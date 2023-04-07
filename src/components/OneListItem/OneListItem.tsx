import React from 'react';
import { Avatar, Text } from "@chakra-ui/react";

import './OneListItem.css'
import { SimpleStudentEntity } from 'types';
import { Link } from "react-router-dom";

interface Props {
    student: SimpleStudentEntity;
}

export const OneListItem = ({ student }: Props) => {
    return (
        <>
            <Link to={`/students/${student.id}`}>
                <div className="list-item">
                    <Avatar className="margin-large"></Avatar>
                    <Text className="margin">{student.firstName}</Text>
                    <Text className="margin">{student.lastName} </Text>
                </div>
            </Link>
            <hr/>
        </>
    )
};