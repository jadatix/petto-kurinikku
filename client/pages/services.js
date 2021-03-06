import { connectToDatabase } from "../lib/mongodb";
import Link from 'next/link'
import { useRouter } from 'next/router'


const ServiceItem = (props) => {
  const router = useRouter()
  return (
    <>
      <div className="transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-110 p-6 lg:w-1/3">
        <div className="flex flex-nowrap flex-col items-center justify-center  dark:bg-gray-800 h-5 bg-sky-100 bg-opacity-75 px-8 pt-20 pb-16 rounded-lg overflow-hidden relative">
          <h1 className="dark:text-white title-font sm:text-2xl text-xl font-medium text-gray-900 mb-3">
            {props.name}
          </h1>
          <p className="mb-3 font-mono">{props.description}</p>
          <Link href="/contact"><button className=" tracking-widest text-xs title-font text-black font-semibold dark:text-gray-200 mb-1" onClick={(event) => {
            router.push({
              pathname: '/contact',
              query: { ordered_service: props.name }
            })
          }}>{props.price} &#8372;</button></Link>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const { db } = await connectToDatabase();

  const services = await db.collection("services").find({}).toArray();

  return {
    props: {
      services: JSON.parse(JSON.stringify(services)),
    },
  };
};

const Services = ({ services }) => {
  return (
    <section class="section body-font">
      <div class="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 class="sm:text-3xl  text-2xl font-medium title-font mb-4 color-text">
            Наші Послуги
          </h1>
        </div>
        <div class="flex flex-wrap justify-center -m-4">
          {services.map((service) => {
            return (
              <ServiceItem
                name={service.name}
                description={service.description}
                price={service.price}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
