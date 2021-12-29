import { useForm } from "react-hook-form"
import { useState } from 'react'
import { useRouter } from 'next/router'

import AddressBox from '@components/address-box'

const Contact = () => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [_submitted, setSubmitted] = useState(false)
  const router = useRouter()
  const { examined_doctor, ordered_service } = router.query

  const handleSubmit = (e) => {

    console.log('Sending')

    let data = { name, phone, email, message, ordered_service, examined_doctor }

    fetch('https://localhost:7079/api/customers', {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).catch(error => {
      console.log(error)
    })

    // fetch(`/api/customer?&name=${name}&phone=${phone}&email=${email}&message=${message}`)

    fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Access-Control-Allow-Headers': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      console.log('Response received')
      if (res.status === 200) {
        console.log('Responce succeeded!')
        setSubmitted(true)
        setName('')
        setPhone('')
        setEmail('')
        setMessage('')
      }
    })

    e.preventDefault()
  }

  return (
    <>
      <section className="section body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2  dark:bg-gray-900 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe className="absolute inset-0" title="map" marginHeight="0" marginWidth="0" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2654.6085620136805!2d25.931461015654367!3d48.29114607923589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4734089c00766247%3A0xb70a42c616fc9275!2z0JLRltC00L7QutGA0LXQvNC70LXQvdC40Lkg0YHRgtGA0YPQutGC0YPRgNC90LjQuSDQv9GW0LTRgNC-0LfQtNGW0LsgwqvQpNCw0YXQvtCy0LjQuSDQutC-0LvQtdC00LYg0KfQtdGA0L3RltCy0LXRhtGM0LrQvtCz0L4g0L3QsNGG0ZbQvtC90LDQu9GM0L3QvtCz0L4g0YPQvdGW0LLQtdGA0YHQuNGC0LXRgtGDINGW0LzQtdC90ZYg0K7RgNGW0Y8g0KTQtdC00YzQutC-0LLQuNGH0LA!5e0!3m2!1suk!2sua!4v1636035664815!5m2!1suk!2sua" width="100%" height="100%" frameBorder="0"></iframe>
            <AddressBox address='вулиця Банкова, 1, Чернівці, Чернівецька область, 58000'
              email='petto.kurinikku@gmail.com'
              phone='+380444618061' />
          </div>
          <form onSubmit={e => { handleSubmit(e); }} className="lg:w-1/3 md:w-1/2 bg-white dark:bg-gray-900 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="color-text text-lg mb-1 font-medium title-font">Надіслати заявку на запис</h2>
            <div className="relative mb-4">
              <label htmlFor="name" className="conact-label">Ім'я</label>
              <input value={name} onChange={e => { setName(e.target.value) }} placeholder="Ваше ім'я" type="text" id="name" name="name" className="contact-input color-animation color-border" pattern="[А-ЯІЇҐЄ]{1}[а-яіїєґ]{1,}" required />
            </div>
            <div className="relative mb-4">
              <label htmlFor="phone" className="conact-label">Телефон</label>
              <input value={phone} onChange={e => { setPhone(e.target.value) }} placeholder="01234567891" type="text" id="phone" name="phone" className="contact-input color-animation color-border" pattern="^(063|067|068|073|093|095|096|097|098|099)[0-9]{7}$" required />
            </div>
            <div className="relative mb-4">
              <label htmlFor="email" className="conact-label">Пошта</label>
              <input value={email} onChange={e => { setEmail(e.target.value) }} placeholder="Ваша пошта" type="email" id="email" name="email" className="contact-input color-animation color-border" required />
            </div>
            <div className="relative mb-4">
              <label htmlFor="message" className="conact-label">Повідомлення</label>
              <textarea value={message} onChange={e => { setMessage(e.target.value) }} placeholder="Опишіть свою проблему" id="message" name="message" className="contact-input color-animation color-border resize-none leading-6 h-32" ></textarea>
            </div>
            <input type="submit" className="contact-button hover:shadow-lg hover:shadow-cyan-500/50" value="Записатися" />
            <p className="text-xs text-gray-500 mt-3">Ми використовуємо ваші персональні дані виключно для забезпечення надання послуг.</p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact
