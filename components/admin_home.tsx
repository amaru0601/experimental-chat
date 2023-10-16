"use client"

import { HeaderMegaMenu } from "./header";
import ChatMessages  from "./chat";
import SendMessages from "./send";
import useWebSocket from "@/hooks/use_websocket";

interface AdminChatProps {
    chats: Chat[] | null
}

const AdminChat = (props: AdminChatProps) => {

    const {socket, setUrl} = useWebSocket()

    const handleSetChat = (chatId : number) => {
        var url = 'ws://localhost:8080/ws/join?id=' + chatId
        setUrl(url)
    }

    return (
        <>
            <HeaderMegaMenu chats={props.chats} setChat={handleSetChat}></HeaderMegaMenu>
            <ChatMessages ws={socket}></ChatMessages>
            <div
                className="fixed inset-x-0 bottom-0"
            >
                <SendMessages ws={socket}></SendMessages>
            </div>
            
        </>
    )
}

export default AdminChat;

