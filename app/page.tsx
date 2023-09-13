"use client"

import useJWT from "@/lib/use_jwt";
import { useEffect } from "react";

const Home = () => {

  const {jwt} = useJWT(null)

  useEffect(() => {
    
  }, [])

  return (
    <div>
    <div>hello home</div>
    <div>{jwt}</div>
    </div>
  )
}

export default Home;
