const AddressBox = ({ address, email, phone }) => {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md">
        <div className="lg:w-1/2 px-6">
          <h2 className="title-font text-head color-text">АДРЕСА</h2>
          <p className="mt-1">{address}</p>
        </div>
        <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
          <h2 className="title-font text-head color-text">ПОШТА</h2>
          <a href="mailto:petto.kurinikku@gmail.com" className="link leading-relaxed">{email}</a>
          <h2 className="title-font text-head color-text mt-4">ТЕЛЕФОН</h2>
          <p className="leading-relaxed">{phone}</p>
        </div>
      </div>
    </>
  )
}

export default AddressBox