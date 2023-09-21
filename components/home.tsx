"use client"

import { useEffect, useState } from "react";
import { HeaderMegaMenu } from "./header";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Chat {
    id: number
}

interface HomeChatProps {
    chats: Chat[] | null
}

const HomeChat = (props: HomeChatProps) => {
    const { data: session } = useSession()
    
    console.log("HOMECHAT", session)
    if (session == null) {
        redirect('/login')
    }

    const [socket, setSocket] = useState<WebSocket | null>(null)

    useEffect(() => {
        var url = ''
        if (props.chats != null && props.chats.length == 0) {
            console.log("Ready to CREATE CHAT")
            url = 'ws://localhost:8080/ws/create-chat?to=wizard_bit'
        } else if (props.chats != null && props.chats.length == 1) {
            console.log("Ready to JOIN CHAT")
            url = 'ws://localhost:8080/ws/join?id=' + props.chats[0].id
        }
        const ws = new WebSocket(url)
        ws.onopen = () => {
            console.log('WebSocket is connected.');
        }
        ws.onmessage = (event) => {
            console.log(event.data)
        }
        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
        }
        ws.onclose = () => {
            console.log('WebSocket is closed.');
            setSocket(null);
        }
        setSocket(ws)
        return () => {
            ws.close();
        };
    }, [])


    return (
        <>
            <HeaderMegaMenu ></HeaderMegaMenu>
            <div>
                <div>hello home</div>
            </div>
        </>
    )
}

export default HomeChat;

