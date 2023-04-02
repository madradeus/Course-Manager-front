import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { CoursesView } from "./views/CourseView/CoursesView";
import SimpleSidebar from "./components/Navigation/Nav";
import { Route, Routes } from "react-router-dom";
import { NotFoundView } from "./views/NotFoundView/NotFoundView";
import { SingleCourseView } from "./views/SingleCourseView/SingleCourseView";
import { DashboardView } from "./views/DashboardView/DashboardView";
import { StudentsView } from "./views/StudentsView/StudentsView";
import { SingleStudentView } from "./views/SingleStudentView/SingleStudentView";
import './App.css';

export function App() {
    return (
        <ChakraProvider>
            <Routes>
                <Route path='/dashboard' element={<SimpleSidebar children={<DashboardView/>}/>}/>
                <Route path='/courses' element={<SimpleSidebar children={<CoursesView/>}/>}/>
                <Route path='/courses/:id' element={<SimpleSidebar children={<SingleCourseView/>}/>}/>
                <Route path='/students' element={<SimpleSidebar children={<StudentsView/>}/>}/>
                <Route path='/students/:id' element={<SimpleSidebar children={<SingleStudentView/>}/>}/>

                <Route path="*" element={<NotFoundView/>}/>
            </Routes>
        </ChakraProvider>
    );
}