import Link from "next/link"
import Image from 'next/image'

const Logo = ({ src }) => {
  return (
    <div>
      <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start flex lg:h-auto">
        <Link href="/">
          <a className="mt-2"><Image src={src} width={25} height={25} /></a>
        </Link>
        <Link href="/">
          <a className="text-black dark:text-white p-2 font-bold">Petto Kurinikku</a></Link>
      </div>
    </div>
  )
}

export default Logo