import React, { useState } from 'react';
import { TopListBar } from "../../components/common/TopListBar/TopListBar";
import { CoursesList } from "../../components/CoursesList/CoursesList";

import './CourseView.css'


export const CoursesView = () => {

    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <div className="list">
            <TopListBar
                onChange={setSearchValue}
                searchValue={searchValue}
                placeholder="Wpisz nazwę kursu"
            />
            <CoursesList searchPhrase={searchValue}/>
        </div>
    );
};


