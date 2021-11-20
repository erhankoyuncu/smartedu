const User = require('../models/User');
const Category = require('../models/Category');
const bcrypt = require('bcrypt');
const session = require('express-session');
const Course = require('../models/Course');
const { validationResult } = require('express-validator');



exports.createUser = async (req, res) => { 

    try {
        const user = await User.create(req.body);
        res.redirect('/login')
    } catch(error)  {
       
        const errors = validationResult(req);


            for(let i = 0; i < errors.array().length; i++){

                req.flash("error", `${errors.array()[i].msg}` );
            }
 
        res.redirect('/register')


    } 
 
} 

exports.loginUser =   (req, res) => { 

    try {
        const {email, password} = req.body;

          User.findOne({email}, (err, user) => {
            if(user){
                bcrypt.compare(password , user.password, (err, same) => {
                    if(same){
                        req.session.userID = user._id;
                        console.log("Giriş yapıdı")
                        res.status(200).redirect('/users/dashboard')
                    }else{

                    req.flash("error", "Kullanıcı adı yada şifre yanlış")           
                    res.status(400).redirect('/login')
                    }
                })
            }else{
                req.flash("error", "Kullanıcı bulunamadı")           
                    res.status(400).redirect('/login')
            }
        })
        
    } catch(error)  {
        res.status(400).json({
            status: 'failed',
            error
        });
    } 
 
} 


exports.logoutUser = (req, res) => {
   req.session.destroy ( () => {
      res.redirect('/') 
   })
}

exports.getDashboardPage = async (req, res) => {

    const user = await  User.findOne({_id : req.session.userID}).populate('courses'); 
    const categories = await Category.find();
    const courses = await Course.find({user: req.session.userID})

    res.status(200).render("dashboard",{
        page_name : "dashboard",
        user,
        categories,
        courses
    });
}