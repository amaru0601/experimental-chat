"use client"

import { Box } from "@mantine/core"
import { useEffect, useState } from "react"

interface ChatMessagesProps {
    ws: WebSocket | null
}

const ChatMessages = (props: ChatMessagesProps) => {

    // TODO: Fetch messages
    const [messages, setMessages] = useState<any[]>([])

    useEffect(() => {
        if (props.ws != null) {
            props.ws.onmessage = (event) => {
                console.log(event.data)
                setMessages(messages => [...messages, event.data])
            }
        }
    }, [props.ws])

    return <Box className="flex flex-col items-start">
        <Box className="bg-indigo-600 p-2 rounded-lg shadow-md self-start">Mensaje 1</Box>
        <Box className="bg-slate-700 p-2 rounded-lg shadow-md self-end">Mensaje 2</Box>
        {
            messages.map((value, index) => {
                return <Box key={`${index}`} className="bg-indigo-600 p-2 rounded-lg shadow-md self-start">{value}</Box>
            })
        }
            
    </Box>
}

export default ChatMessages;