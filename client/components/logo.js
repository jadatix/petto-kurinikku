import Link from "next/link"
import Image from 'next/image'

const Logo = ({ color }) => {
  return (
    <div>
      <div className="logo">
        <Link href="/">
          <a className="mt-2"><Image className="image" src={`/footprint-${color}.png`} width={25} height={25} /></a>
        </Link>
        <Link href="/">
          <a className="text-black dark:text-white p-2 font-bold">Petto Kurinikku</a></Link>
      </div>
    </div>
  )
}

export default Logo