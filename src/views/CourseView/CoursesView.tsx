import React, { useState } from 'react';
import { TopListSearch } from "../../components/common/TopListSearch/TopListSearch";
import { CoursesList } from "../../components/CoursesList/CoursesList";
import './CourseView.css'
import { CreateCourseForm } from "../../components/CreateCourseForm/CreateCourseForm";

export const CoursesView = () => {

    const [searchValue, setSearchValue] = useState<string>('');
    const [refresh, setRefresh] = useState<number>(0);

    return (
        <div className="list">
            <div className="search-bar">
                <TopListSearch
                    onChange={setSearchValue}
                    searchValue={searchValue}
                    placeholder="Wpisz nazwę kursu"
                />
                <CreateCourseForm doRefresh={setRefresh}/>
            </div>
            <CoursesList searchPhrase={searchValue} refresh={refresh}/>
        </div>
    );
};