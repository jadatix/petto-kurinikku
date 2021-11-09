export default async function (req, res) {
  require('dotenv').config()

  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    secure: true
  })

  const mailData = {
    from: `Клініка Petto Kurinikku <${process.env.EMAIL_USERNAME}>`,
    to: `${req.body.email}`,
    subject: 'Дякуємо, що обрали нас!',
    text: req.body.message + " | Надіслано для: " + req.body.email,
    html: `<div>Привіт, ${req.body.name}</div><div>Ваша проблема: ${req.body.message}</div><div>Незабаром з вами зв'яжуться на номер ${req.body.phone}.</div>`
  }

  let info = await transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err)
    else console.log(info)
  })

  console.log(req.body)
  res.send('success')
}