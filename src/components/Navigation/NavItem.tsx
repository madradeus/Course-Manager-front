import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import { IconType } from "react-icons";
import React, { ReactText } from "react";
import { Link } from "react-router-dom";

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
    link: string
}

export const NavItem = ({ icon, children, link, ...rest }: NavItemProps) => {
    return (
        <Link to={`/${link}`} style={{ textDecoration: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: '#2B6CB0',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};