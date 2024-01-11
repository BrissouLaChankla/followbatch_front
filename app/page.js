'use client'
import Main from "@/components/Main";
import Login from "@/components/Login";
import { useEffect, useState } from 'react';

export default function Home() {
  const [authorized, setAuthorize] = useState(false);

  useEffect(() => {

    fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/checkpass', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ password: localStorage.getItem('caps_pass')})
  })
  .then(response => response.json())
  .then(data => {
    if(data.result){
      setAuthorize(true);
    }
  })


  }, []);
 
  return (
  
    authorized ? <Main /> : <Login />
  
  )
}


