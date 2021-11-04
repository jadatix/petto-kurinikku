import Link from 'next/link'

const DoctorItem = (props) => {
  return (
    <div className='xl:w-1/4 md:w-1/2 p-4'>
      <div className='bg-gray-100 p-6 rounded-lg dark:bg-gray-800 dark:bg-opacity-40'>
        <img className='h-40 rounded w-full object-cover object-center mb-6' src={props.img} alt='content' />
        <h3 className='tracking-widest text-pink-500 text-xs font-medium title-font dark:text-pink-400'>{props.spec}</h3>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-4 dark:text-white">{props.name}</h2>
        <Link href={props.href}>
          <a className="text-pink-500 inline-flex items-center dark:text-pink-400">Детальніше
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </Link>
      </div>
    </div>
  )
}

const Doctor = () => {
  const doctors = [
    {
      img: "/images/doctor8.jpg",
      spec: "ЛІКАРКА-СТОМАТОЛОГИНЯ",
      name: "Гнатюк Тетяна",
    },
    {
      img: "/images/doctor7.jpg",
      spec: "ЛІКАРКА-ТЕРАПЕВТКА",
      name: "Дмитренко Кіра",
    },
    {
      img: "/images/doctor6.jpg",
      spec: "ЛІКАР-ДЕРМАТОЛОГ",
      name: "Шевченко Дмитро",
    },
    {
      img: "/images/doctor5.jpg",
      spec: "ЛІКАР-РЕНТГЕНОЛОГ",
      name: "Шинкаренко Василь",
    },
    {
      img: "/images/doctor3.jpg",
      spec: "ЛІКАР-ХІРУРГ",
      name: "Мірошниченко Вадим",
    },
    {
      img: "/images/doctor4.jpg",
      spec: "ЛІКАРКА-ЕКЗОТОЛОГИНЯ",
      name: "Іванченко Любов",
    },
    {
      img: "/images/doctor2.jpg",
      spec: "ЛІКАРКА-КАРДІОЛОГИНЯ",
      name: "Антоненко Ольга",
    },
    {
      img: "/images/doctor1.jpg",
      spec: "ЛІКАРКА-НЕВРОЛОГИНЯ",
      name: "Гнатюк Надія",
    }
  ]


  return (
    <>
      <section className="text-gray-600 body-font dark:text-gray-400 dark:bg-gray-900">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl  text-2xl font-medium title-font mb-4 text-gray-900 dark:text-white">Наші Лікарі</h1>
          </div>
          <div className="flex flex-wrap -m-4">
            {doctors.map((doctor) => {
              return (<DoctorItem img={doctor.img} spec={doctor.spec} name={doctor.name} href="/doctor"/>)
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Doctor