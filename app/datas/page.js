"use client"
import useSWR from 'swr'
import Utils from '@/utils/all'
import Nav from '@/components/Nav'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

import { useEffect } from 'react'

export default function page() {

    useEffect(() => {
        fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/days/generatedaily/'+Utils.getCurrentDate())
            .then(response => response.json())
            .then(data => {
              console.log("✅Résumé généré")
            })
    },[])


    const { data: data, error } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/days/all`, fetcher);

    if (error) return <div>Failed to load</div>
    if (!data) return <div>Chargement...</div>
    
    const rows = data.days.map((day, i) => {return {...day, jour:i+1}}).sort((a, b) => Utils.createDateFromString(b.date) - Utils.createDateFromString(a.date)).map((el, i) => <Row {...el} key={i} />)
    
    

  
    return (
        <div className='max-w-7xl m-auto'>
            <Nav />
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Jour</th>
                            <th>Date</th>
                            <th>Batch</th>
                            <th>Résumé Airtable</th>
                            <th>Note</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>
    )
}


function Row(props) {
    
    return (
        <tr>
            <td className='font-bold'>{props.jour}</td>
            <td>{props.date}</td>
            <td>#{props.batch.number}</td>
            <td>{props.prompt}</td>
            <td className='flex'>
                {[...Array(props.teacher_rate)].map(() => <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>)}
            </td>
        </tr>
    )
}

