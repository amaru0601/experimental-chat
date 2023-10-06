"use client"

import { Box } from "@mantine/core"

const ChatMessages = () => {
    return <Box className="flex flex-col items-start">
            <Box className="bg-indigo-600 p-2 rounded-lg shadow-md self-start">Mensaje 1</Box>
            <Box className="bg-slate-700 p-2 rounded-lg shadow-md self-end">Mensaje 2</Box>
    </Box>
}

export default ChatMessages;