import Link from "next/link"
import Utils from '@/utils/all'
import Image from "next/image"
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function Nav(props) {


  const { data: data, error } = useSWR(`${process.env.NEXT_PUBLIC_BACKEND_URL}/days/dates`, fetcher);

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Chargement...</div>

  data.days.sort(Utils.sortStringDate)
 
  return (
    <div className='p-4 text-center flex items-center justify-between font-bold w-full max-w-7xl m-auto'>
      <Link href="/" className="flex items-center">
        <span className='me-2'>
          <Image src="/logo.png" width={32} height={32} alt="logo" />
        </span>
        <select defaultValue={props.date} className="select w-full max-w-xs" onChange={(e) => props.selectDay(e.target.value)}>

          {
            data.days.map((el, i) => <option key={i}>{el.date}</option>) 
          
          }
        </select>

      </Link>
      <div className="w-32 text-left">
        <Link href="/datas" className='link'>Données</Link>
      </div>
      <select className="select select-bordered w-32">
        <option>Batch 117</option>
      </select>
    </div>
  )
}
