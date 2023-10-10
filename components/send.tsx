"use client"

import { Box, CloseButton, Input } from "@mantine/core"
import { IconSend } from "@tabler/icons-react"
import { useEffect, useState } from "react"

interface SendMessagesProps {
    ws: WebSocket | null
}

const SendMessages = (props: SendMessagesProps) => {
    const [message, setMessage] = useState('');

    const send = () => {
        props.ws?.send(message)
        setMessage('')
    }

    return <Input 
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        mt={"md"}
        rightSection={
            <IconSend 
                onClick={() => send()}
                style={{ display : message ? undefined : 'none' }}
            />
        }
    />
}

export default SendMessages;