import {
    Group,
    Button,
    Divider,
    Box,
    Burger,
    Drawer,
    ScrollArea,
    rem,
} from '@mantine/core';
import { MantineLogo } from '@mantine/ds';
import { useDisclosure } from '@mantine/hooks';
import classes from './header.module.css';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

interface HeaderProps {
    chats?: Chat[] | null
    setChat?: (chatId: number) => void
}

export function HeaderMegaMenu(props: HeaderProps) {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const router = useRouter()
    
    const handleLogout = async () => {
        // TODO: improve error message

        const res = await signOut({
            callbackUrl:'/login',
            redirect: true,
        })
    } 

    return (
        <Box pb={20}>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <MantineLogo size={30} />

                    <Group visibleFrom="sm">
                        <Button variant="default" onClick={handleLogout}>Logout</Button>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Chat with Amaru"
                hiddenFrom="sm"
                zIndex={1000000}
            >
                <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">

                    <Divider my="sm" />
                    {
                        props?.chats?.map( e => 
                        <Group key={e.id} justify="center" grow pb="xl" px="md">
                            <Button key={e.id} onClick={() => props.setChat?.(e.id)}>{e.sender}</Button>
                        </Group>) 
                    }
                    <Group justify="center" grow pb="xl" px="md">
                        <Button variant="default" onClick={handleLogout}>Logout</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
}