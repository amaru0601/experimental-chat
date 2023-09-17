"use client"

import useJWT from "@/lib/use_jwt";
import { useEffect, useState } from "react";

const Home = () => {

  const {jwt} = useJWT(null)
  const [socket, setSocket] = useState<WebSocket | null>(null)

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/ws/create-chat?to=wizard_bit')
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
    <div>
    <div>hello home</div>
    <div>{jwt}</div>
    </div>
  )
}

export default Home;
