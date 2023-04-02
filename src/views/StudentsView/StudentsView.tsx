import React, { useState } from 'react';
import { TopListSearch } from "../../components/common/TopListSearch/TopListSearch";
import { StudentsList } from "../../components/StudentsList/StudentsList";
import { CreateStudentForm } from "../../components/CreateStudentForm/CreateStudentForm";

export const StudentsView = () => {

    const [searchValue, setSearchValue] = useState<string>('');
    const [refresh, setRefresh] = useState<number>(0);

    return (
        <div className="list">
            <div className="search-bar">
                <TopListSearch
                    placeholder="Wpisz nazwisko kursanta"
                    searchValue={searchValue}
                    onChange={setSearchValue}
                />
                <CreateStudentForm doRefresh={setRefresh}/>
            </div>
            <StudentsList searchPhrase={searchValue} refresh={refresh}/>
        </div>
    );
};