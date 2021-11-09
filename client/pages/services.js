import { connectToDatabase } from "../lib/mongodb"

const ServiceItem = props => {
  return (
    <>
      <div className="p-4 lg:w-1/3">
        <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-24 rounded-lg overflow-hidden text-center relative">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">CATEGORY</h2>
          <h1 className="title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">{props.name}</h1>
          <p className="leading-relaxed mb-3">{props.description}</p>
          <a className="text-pink-500 inline-flex items-center">Записатися
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const { db } = await connectToDatabase()

  const services = await db
    .collection("services")
    .find({})
    .toArray()

  return {
    props: {
      services: JSON.parse(JSON.stringify(services))
    },
  }
}

const Services = ({ services }) => {
  return (
    <section class="section body-font">
      <div class="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl  text-2xl font-medium title-font mb-4 color-text">Наші Послуги</h1>
        </div>
        <div class="flex flex-wrap -m-4">
          {services.map((service) => {
            return (<ServiceItem name={service.name} description={service.description} />)
          })}
        </div>
      </div>
    </section>
  )
}

export default Services