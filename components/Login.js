'use client'

import { useState } from "react";

export default function Login() {

    const [password, setPassword] = useState('');
    const handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        });
        const content = await response.json();

        if (content) {
            localStorage.setItem("caps_pass", content.password);
            location.reload();
        } else {
            setPassword('');
        }
    }

    return (
        <div className="w-full h-screen flex items-center justify-center bg-primary">
            <form onSubmit={(e) => handleSubmit(e)} className="flex">
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Le mot magique 🪄" className="input input-bordered w-full max-w-xs" />
                <button className="btn btn-light" type="submit">OK</button>
            </form>
        </div>
    )
}
