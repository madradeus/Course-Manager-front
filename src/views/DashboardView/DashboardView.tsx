import React from 'react';
import { Stack } from "@chakra-ui/react";
import { BirthdayList } from "../../components/BirthdayList/BirthdayList";
import { StatsList } from "../../components/StatsList/StatsList";

export const DashboardView = () => {
    return (
        <Stack spacing={7}>
            <StatsList/>
            <BirthdayList/>
        </Stack>

    );
};


