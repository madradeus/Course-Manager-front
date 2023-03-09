import React from 'react';
import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Stack,
    Stat,
    StatHelpText,
    StatLabel,
    StatNumber
} from "@chakra-ui/react";

export const DashboardView = () => {
    return (
        <Stack spacing={7}>
            <Card>
                <CardHeader>
                    <Heading size='lg'>Twoje statystyki</Heading>
                </CardHeader>
                <CardBody>
                    <Stack direction={'row'} alignItems={"space-around"} spacing={10}>
                        <Stat>
                            <StatLabel>Collected Fees</StatLabel>
                            <StatNumber>£0.00</StatNumber>
                            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                        </Stat>
                        <Stat>
                            <StatLabel>Collected Fees</StatLabel>
                            <StatNumber>£0.00</StatNumber>
                            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                        </Stat>
                        <Stat>
                            <StatLabel>Collected Fees</StatLabel>
                            <StatNumber>£0.00</StatNumber>
                            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                        </Stat>
                    </Stack>

                </CardBody>
            </Card>

            <Card>
                <CardHeader>
                    <Heading size='lg'>Dzisiaj obchodzą urodziny</Heading>
                </CardHeader>
                <CardBody>
                    <Stack direction={'row'} justifyContent={'space-evenly'}>
                        <Stat flexGrow={0}>
                            <StatLabel>Collected Fees</StatLabel>
                            <StatNumber>£0.00</StatNumber>
                            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                        </Stat>
                        <Stat flexGrow={0}>
                            <StatLabel>Collected Fees</StatLabel>
                            <StatNumber>£0.00</StatNumber>
                            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                        </Stat>
                        <Stat flexGrow={0}>
                            <StatLabel>Collected Fees</StatLabel>
                            <StatNumber>£0.00</StatNumber>
                            <StatHelpText>Feb 12 - Feb 28</StatHelpText>
                        </Stat>
                    </Stack>

                </CardBody>
            </Card>


        </Stack>

    );
};


