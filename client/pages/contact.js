const Contact = () => {
  return (
    <>
      <section className="section body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2  dark:bg-gray-900 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe className="absolute inset-0" title="map" marginheight="0" marginwidth="0" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2654.6085620136805!2d25.931461015654367!3d48.29114607923589!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4734089c00766247%3A0xb70a42c616fc9275!2z0JLRltC00L7QutGA0LXQvNC70LXQvdC40Lkg0YHRgtGA0YPQutGC0YPRgNC90LjQuSDQv9GW0LTRgNC-0LfQtNGW0LsgwqvQpNCw0YXQvtCy0LjQuSDQutC-0LvQtdC00LYg0KfQtdGA0L3RltCy0LXRhtGM0LrQvtCz0L4g0L3QsNGG0ZbQvtC90LDQu9GM0L3QvtCz0L4g0YPQvdGW0LLQtdGA0YHQuNGC0LXRgtGDINGW0LzQtdC90ZYg0K7RgNGW0Y8g0KTQtdC00YzQutC-0LLQuNGH0LA!5e0!3m2!1suk!2sua!4v1636035664815!5m2!1suk!2sua" width="100%" height="100%" frameborder="0"></iframe>
            <div className="bg-white dark:bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md">
              <div className="lg:w-1/2 px-6">
                <h2 className="title-font text-head color-text">АДРЕСА</h2>
                <p className="mt-1">вулиця Банкова, 1, Чернівці, Чернівецька область, 58000</p>
              </div>
              <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                <h2 className="title-font text-head color-text">ПОШТА</h2>
                <a href="mailto:petto.kurinikku@gmail.com" className="link leading-relaxed">petto.kurinikku@gmail.com</a>
                <h2 className="title-font text-head color-text mt-4">ТЕЛЕФОН</h2>
                <p className="leading-relaxed">+380444618061</p>
              </div>
            </div>
          </div>
          <form className="lg:w-1/3 md:w-1/2 bg-white dark:bg-gray-900 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="color-text text-lg mb-1 font-medium title-font">Надіслати заявку на запис</h2>
            <div className="relative mb-4">
              <label for="name" className="conact-label">Ім'я</label>
              <input placeholder="Ваше ім'я" type="text" id="name" name="name" className="contact-input color-animation color-border" />
            </div>
            <div className="relative mb-4">
              <label for="phone" className="conact-label">Телефон</label>
              <input placeholder="Ваш телефон" type="text" id="phone" name="phone" className="contact-input color-animation color-border" />
            </div>
            <div className="relative mb-4">
              <label for="email" className="conact-label">Пошта</label>
              <input placeholder="Ваша пошта" type="email" id="email" name="email" className="contact-input color-animation color-border" />
            </div>
            <div className="relative mb-4">
              <label for="message" className="conact-label">Повідомлення</label>
              <textarea placeholder="Опишіть свою проблему" id="message" name="message" className="contact-input color-animation color-border resize-none leading-6 h-32"></textarea>
            </div>
            <button className="contact-button">Надіслати</button>
            <p className="text-xs text-gray-500 mt-3">Ми використовуємо ваші персональні дані виключно для забезпечення надання послуг.</p>
          </form>
        </div>
      </section>
    </>
  )
}

export default Contact