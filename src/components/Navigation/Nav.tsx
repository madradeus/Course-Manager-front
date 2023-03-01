import React, { ReactNode } from 'react';
import { Box, Drawer, DrawerContent, useColorModeValue, useDisclosure, } from '@chakra-ui/react';
import { FiList, FiTrendingUp, FiUsers, } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { SidebarContent } from "./SidebarContent";
import { MobileNav } from "./MobileNav";

interface LinkItemProps {
    name: string;
    icon: IconType;
}

export const LinkItems: Array<LinkItemProps> = [
    { name: 'Pulpit', icon: FiTrendingUp },
    { name: 'Kursy', icon: FiList },
    { name: 'Kursanci', icon: FiUsers },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen}/>
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}


