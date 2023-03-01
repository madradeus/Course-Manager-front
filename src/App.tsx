import React from 'react';

import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { CoursesView } from "./views/CoursesView";
import SimpleSidebar from "./components/Navigation/Nav";

function App() {
    return (
        <ChakraProvider>
            <SimpleSidebar children={[<CoursesView key='CoursesView'/>]}/>

        </ChakraProvider>
    );
}

export default App;
