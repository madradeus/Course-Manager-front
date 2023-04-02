import React, { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import { NavItem } from "./NavItem";
import { api } from "../../libs/Api";
import { useToast } from "@chakra-ui/react";
import { Loader } from "../common/Loader/Loader";

export const LogoutButton = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();

    const logout = async () => {
        try {
            await api.logout();
            toast({
                title: 'Sukces',
                description: "Zostałeś wylogowany",
                status: 'success',
                duration: 4000,
                position: "top-right"
            });
        } catch (e: any) {
            toast({
                title: 'Błąd',
                description: e.message,
                status: 'error',
                duration: 4000,
                position: "top-right"
            });
        } finally {
            setLoading(false);
        }
    }

    if ( loading ) {
        return <Loader/>
    }
    return (
        <NavItem icon={FiLogOut} link='' onClick={logout}>Wyloguj</NavItem>
    );
};