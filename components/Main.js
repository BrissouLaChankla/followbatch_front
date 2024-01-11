'use client'
import Utils from '@/utils/all'
import { useState, useEffect, useRef } from "react";
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Main() {
    const formRef = useRef();

    const { data: data, error } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/batchs/all/${Utils.getCurrentDate() || null}`, fetcher);
  
    if (error) return <div>Failed to load</div>
    if (!data) return <div>Loading...</div>
  
    const currentBatch = data.allBatchs.find(batch => batch.is_current === true);
    const otherBatchs = data.allBatchs.filter(batch => batch.is_current === false);
  
    const envoyerDonnees = async () => {
      const formData = new FormData(formRef.current);
      const formValues = {};
      for (let key of formData.keys()) {
        formValues[key] = formData.get(key);
      }
      formValues.date = Utils.getCurrentDate()
      fetch(process.env.NEXT_PUBLIC_BACKEND_URL+'/days/store', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues)
      })
        .then(response => response.json())
        .then(data => {
          console.log("Valeurs : ")
          console.log(data)
        })
    };
  
    const submitStudentsInfo = Utils.debounce(envoyerDonnees, 1000);
  
  const changeBatch = (e) => {
    console.log(e)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <div className='p-4 text-center flex items-center justify-between font-bold'>
        <div className="w-32"></div>
        <div className="flex items-center">
          <span className='text-xl me-2'>
            📅
          </span>
          {Utils.getCurrentDate()}
        </div>
        <select className="select select-bordered w-32" onChange={(e) => changeBatch(e.target.value)}>
          <option value={currentBatch.number}>Batch {currentBatch.number}</option>

        </select>
      </div>
      <form ref={formRef} className='flex items-center gap-10 justify-between flex-wrap bg-stone-200 content-center pt-10 grow flex-col '
        onChange={() => submitStudentsInfo()}
      >
        <div className='flex gap-10 flex-wrap items-center justify-center grow'>
          {
          data.infoBatch.student_feeling.map((studentData, i) => <TextareaCard key={i} {...studentData} />)
        }
        </div>

        
        <div className='text-center p-5 flex flex-col items-center content-center gap-4 w-full bg-white'>
          <div className="rating">
            <input type="radio" name="teacher_rate" value={1} className="mask mask-star-2 bg-orange-400" defaultChecked={data.infoBatch.teacher_rate === 1}  />
            <input type="radio" name="teacher_rate" value={2} className="mask mask-star-2 bg-orange-400" defaultChecked={data.infoBatch.teacher_rate === 2} />
            <input type="radio" name="teacher_rate" value={3} className="mask mask-star-2 bg-orange-400" defaultChecked={data.infoBatch.teacher_rate === 3} />
          </div>
          <textarea placeholder="Commentaire général" name="global_comment" className="textarea textarea-bordered textarea-lg md:w-1/3 w-full m-auto" defaultValue={data.infoBatch.global_comment} ></textarea>
        </div>
      </form>
    </main>
  )
}

function TextareaCard(props) {
    console.log(props)
    return (
      <div className="card w-96 shadow-xl bg-white">
        <div className="card-body p-5">
          <div className="flex justify-between">
            <h2 className="card-title ">{props.student.firstname} {props.student.lastname}</h2>
            <label className="swap swap-flip text-2xl">
              <input type="checkbox" tabIndex={1} name={`is_in_difficulty_${props.student._id}`} defaultChecked={props.is_in_difficulty} />
              <div className="swap-on">💀</div>
              <div className="swap-off">😁</div>
            </label>
          </div>
          <textarea placeholder="RAS" name={`comment_${props.student._id}`} className="textarea textarea-bordered textarea-sm w-full rounded-lg" defaultValue={props.comment}></textarea>
        </div>
      </div>
    )
  }