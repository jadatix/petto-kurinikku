import Link from 'next/link'

const Item = ({ title, description, href }) => {
  return (
    <>
      <div className="flex-grow">
        <h2 className="text-gray-900 dark:text-white text-lg title-font font-medium mb-3">{title}</h2>
        <p className="leading-relaxed text-base">{description}</p>
        <Link href={href}>
          <a className="mt-3 text-cyan-500 inline-flex items-center">Детальніше
            <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </Link>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <section className="section body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
          <Link href="/contact">
            <a>
              <img alt="feature" className="object-cover object-center h-full w-full" src="/index.jpg" />
            </a>
          </Link>
        </div>
        <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left text-center">
          <div className="flex flex-col mb-10 lg:items-start items-center">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-sky-500 mb-5">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="hover:animate-pulse w-6 h-6" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>

            </div>
            <Item href="/doctors" title="Наші лікарі" description="Переглянути список наших спеціалістів" />
          </div>
          <div className="flex flex-col mb-10 lg:items-start items-center">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-sky-500 mb-5">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="hover:animate-pulse w-6 h-6" viewBox="0 0 24 24">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <Item href="/services" title="Послуги" description="Переглянути каталог послуг, які ми можемо вам надати" />
          </div>
          <div className="flex flex-col mb-10 lg:items-start items-center">
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-sky-500 mb-5">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="hover:animate-pulse w-6 h-6" viewBox="0 0 24 24">
                <circle cx="6" cy="6" r="3"></circle>
                <circle cx="6" cy="18" r="3"></circle>
                <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
              </svg>
            </div>
            <Item href="/contact" title="Записатися на прийом" description="Заповніть форму для запису на прийом" />
          </div>
        </div>
      </div>
    </section >
  )
}