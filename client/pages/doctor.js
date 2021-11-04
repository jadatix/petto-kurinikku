
const DoctorItem = (props) => {
  return (
    <div className='xl:w-1/4 md:w-1/2 p-4'>
      <div className='bg-gray-100 p-6 rounded-lg'>
        <img className='h-40 rounded w-full object-cover object-center mb-6' src={props.img} alt='content' />
        <h3 className='tracking-widest text-purple-500 text-xs font-medium title-font'>{props.spec}</h3>
        <h2 className="text-lg text-gray-900 font-medium title-font mb-4">{props.name}</h2>
        <p className='leading-relaxed text-base'>{props.desc}</p>
      </div>
    </div>
  )
}

const Doctor = () => {
  const doctors = [
    {
      img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.0vtCAITTOU9za5QrepSDdAHaEH%26pid%3DApi&f=1",
      spec: "",
      name: "",
      desc: ""
    }
  ]

  return (
    <>
      <section className="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {doctors.map((doctor, index) => {
              return (<DoctorItem img={doctor.img} spec={doctor.spec} name={doctor.name} desc={doctor.desc} />)
            })}
          </div>
        </div>
      </section>
    </>
  )
}

export default Doctor