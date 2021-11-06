import { connectToDatabase } from "../../lib/mongodb"
import { ObjectId } from "mongodb"

export const getServerSideProps = async (context) => {
  const { db } = await connectToDatabase()

  const doctor = await db.collection("doctors")
    .find({ _id: ObjectId(context.params.id) })
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
        <div className="flex flex-col sm:flex-row mt-10">
          <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
            
          </div>
        </div>
      </section>
    </>
  )
}

export default Details