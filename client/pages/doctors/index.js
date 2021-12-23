import Link from 'next/link'
import { connectToDatabase } from '@lib/mongodb'
import { transform } from '@lib/transliteration'

const DoctorItem = (props) => {
  return (
    <div className='transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 xl:w-1/4 md:w-1/2 p-5'>
      <div className='bg-sky-100 bg-opacity-75 p-6 rounded-lg dark:bg-gray-800 dark:bg-opacity-40'>
        <img className='h-40 rounded w-full object-cover object-center mb-6' src={props.img} alt='content' />
        <h3 className='tracking-widest link text-xs font-medium title-font'>{props.spec}</h3>
        <h2 className="text-lg font-medium title-font mb-4 color-text">{props.name}</h2>
        <Link href={props.link} key={props.key}>
          <a className="link inline-flex items-center">Детальніше
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </Link>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const { db } = await connectToDatabase()

  const doctors = await db
    .collection("doctors")
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray()

  return {
    props: {
      doctors: JSON.parse(JSON.stringify(doctors)),
    },
  }
}

const Doctors = ({ doctors }) => {
  return (
    <>
      <section className="section body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl  text-2xl font-medium title-font mb-4 color-text">Наші Лікарі</h1>
          </div>
          <div className="flex flex-wrap -m-4 justify-center">
            {doctors.map((doctor) => {
              return (<DoctorItem img={doctor.img} spec={doctor.spec} name={doctor.name} link={"/doctors/" + transform(doctor.name)} />)
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Doctors