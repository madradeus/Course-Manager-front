import React from 'react';
import { useParams } from "react-router-dom";
import { StudentDetails } from "../../components/StudentDetails/StudentDetails";

export const SingleStudentView = () => {

    const { id } = useParams()
    return (
        <div>
            <StudentDetails id={id}/>
        </div>
    );
};


