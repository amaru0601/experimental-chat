"use client"

import { useEffect, useState } from "react";
import { HeaderMegaMenu } from "./header";
import ChatMessages  from "./chat";
import SendMessages from "./send";

interface Chat {
    id: number
}

interface HomeChatProps {
    chats: Chat[] | null
}

const HomeChat = (props: HomeChatProps) => {

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
            <HeaderMegaMenu></HeaderMegaMenu>
            <ChatMessages ws={socket}></ChatMessages>
            <div
                className="fixed inset-x-0 bottom-0"
            >
                <SendMessages ws={socket}></SendMessages>
            </div>
            
        </>
    )
}

export default HomeChat;

