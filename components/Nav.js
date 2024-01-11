import Link from "next/link"
import Utils from '@/utils/all'
import Image from "next/image"
export default function Nav() {
  return (
    <div className='p-4 text-center flex items-center justify-between font-bold w-full max-w-7xl m-auto'>
        <Link href="/" className="flex items-center">
          <span className='me-2'>
            <Image src="/logo.png" width={32} height={32} alt="logo" />
          </span>
          {Utils.getCurrentDate()}
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
