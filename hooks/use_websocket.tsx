import { useEffect, useRef, useState } from 'react';

function useWebSocket() {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [url, setUrl] = useState<string | null>(null);
    //const [data, setData] = useState(null);

    const socketRef = useRef<WebSocket>();

    useEffect(() => {
        if (url != null) {
            if (socketRef.current) {
                socketRef.current.close()
            }

            const newSocket = new WebSocket(url);
            socketRef.current = newSocket;

            newSocket.onopen = () => {
                console.log(`Conexión WebSocket establecida para URL: ${url}`);
            };

            //newSocket.onmessage = (event) => {
            //  const message = JSON.parse(event.data);
            //  setData(message);
            //};

            newSocket.onclose = () => {
                console.log(`Conexión WebSocket cerrada para URL: ${url}`);
            };

            setSocket(newSocket);
        }
        () => {
            if (socketRef.current) {
                socketRef.current.close()
            }
        };
    }, [url]);

    //const sendMessage = (message: string) => {
    //    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
    //        socketRef.current.send(JSON.stringify(message));
    //    }
    //};

    return { socket, setUrl };
}

export default useWebSocket;
