const nodemailer = require('nodemailer')

exports.getHomePage =  (req, res) => {
    console.log(req.session.userID)
    res.status(200).render("index",{
        page_name : "index"
    });
};

exports.getAboutPage =  (req, res) => {
    res.status(200).render("about",{
        page_name : "about"
    });
}
exports.getRegisterPage =  (req, res) => {
    res.status(200).render("register",{
        page_name : "register"
    });
}
exports.getLoginPage =  (req, res) => {
    res.status(200).render("login",{
        page_name : "login"
    });
}

exports.getContactPage = (req, res) => {
    res .status(200).render("contact", {
        page_name : "contact"
    })
}


exports.senEmail = async (req, res) => {


    const mesaj = `

    <div>

        <h1> Merhaba Erhan </h1>
        Adı : ${req.body.first_name} <br>
        Soyadı : ${req.body.last_name} <br>
        Email : ${req.body.email} <br>
        Telefon : ${req.body.phone} <br>
        Mesajı : ${req.body.comments} <br>

    </div>

    `;



    try {

          // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'bilgi@coderhan.net', // generated ethereal user
      pass: '', // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Erhan Koyuncu 👻" <bilgi@coderhan.net>', // sender address
    to: "gerekenbirikim@gmail.com", // list of receivers
    subject: "Node Uygulaması ✔", // Subject line
    text: "Hello world?", // plain text body
    html: mesaj, // html body
  });
  req.flash("success", `Gönderim başarılı!`);

    } catch (error) {
        req.flash("error", `Something happened!`);
    }

  res.status(200).redirect('/contact');


}
