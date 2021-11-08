import { connectToDatabase } from "../../lib/mongodb"
import { reverse} from '../../lib/transliteration'

export const getServerSideProps = async (context) => {
  const { db } = await connectToDatabase()

  const doctor = await db.collection("doctors")
    .find({ name: String(reverse(context.params.id)) })
    .toArray()

  return {
    props: {
      doctor: JSON.parse(JSON.stringify(doctor[0]))
    }
  }
}

const Details = ({ doctor }) => {
  return (
    <>
      <section className="section body-font">
        <div class="container px-5 py-24 mx-auto flex flex-col">
          <div class="lg:w-4/6 mx-auto">
            <div class="flex flex-col sm:flex-row mt-10">
              <div class="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                <div class="w-40 h-40 rounded-full inline-flex items-center justify-center bg-gray-200 dark:bg-gray-800 dark:text-gray-600 text-gray-400">
                  <img alt="content" class="object-cover object-center rounded-full h-full w-full" src={doctor.img} />
                </div>
                <div class="flex flex-col items-center text-center justify-center">
                  <h2 class="font-medium title-font mt-4 color-text text-lg">{doctor.name}</h2>
                  <div class="w-12 h-1 bg-pink-500 rounded mt-2 mb-4"></div>
                  <p class="text-base">{doctor.spec}</p>
                </div>
              </div>
              <div class="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 dark:border-gray-800 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                <p class="leading-relaxed text-lg mb-4">{doctor.desc}</p>
                <div className="sm:py-11 text-center">
                  <button className="contact-button">Записатися на прийом</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Details