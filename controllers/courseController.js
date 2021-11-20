const Category = require('../models/Category');
const Course = require('../models/Course');
const User = require('../models/User');

exports.createCourse = async (req, res) => { 

    try {
        const course = await Course.create({
            name : req.body.name,
            description : req.body.description,
            category : req.body.category,
            user : req.session.userID
        });
        res.status(201).redirect('/users/dashboard')
    } catch(error)  {
        res.status(400).json({
            status: 'failed',
            error
        });
    } 
 
}

//get All Photos 
exports.getAllCourses = async (req, res) => { 

    try {
 
        const categorySlug = req.query.categories;
        const query = req.query.search;

        const category = await Category.findOne({slug : categorySlug});

         let filter = {};

         if(categorySlug){
            filter = {category:category._id}
         }

         if(query){
             filter = {name : query}
         }

         if(!query && !categorySlug) {
            filter.name = "",
            filter.category = null
         }



        
        const courses = await Course.find({
            $or : [
                { name : { $regex : '.*'  + filter.name + '.*', $options: 'i' }},
                {category : filter.category}
            ]
        }).sort('-createdAt').populate('user');

        const categories = await Category.find(); 

        res.status(201).render("courses", {
            page_name : "courses",
            courses,
            categories
        })
    } catch(error)  {
        res.status(400).json({
            status: 'failed',
            error
        });
    } 
 
}

//  Get Single 
exports.getCourse = async (req, res) => { 

    try {

        const user = await User.findById(req.session.userID);

        const course = await Course.findOne({slug : req.params.slug});
        res.status(201).render("course-single", {
            page_name : "courses",
            course,
            user
        })
    } catch(error)  {
        res.status(400).json({
            status: 'failed',
            error
        });
    } 
 
}
exports.enrollCourse = async (req, res) => { 

    try {

        const user = await User.findById(req.session.userID);

        const varmi = await User.findOne({courses: req.body.course_id });

        
            await user.courses.push({_id:req.body.course_id});
            await user.save();
      
        res.status(200).redirect('/users/dashboard');

       
    } catch(error)  {
        res.status(400).json({
            status: 'failed',
            error
        });
    } 
 
}

exports.releaseCourse = async (req, res) => { 

    try {

        const user = await User.findById(req.session.userID);

        const varmi = await User.findOne({courses: req.body.course_id });
 
            await user.courses.pull({_id:req.body.course_id});
            await user.save();
       
        res.status(200).redirect('/users/dashboard');

       
    } catch(error)  {
        res.status(400).json({
            status: 'failed',
            error
        });
    } 
 
}



exports.deleteCourse = async (req, res) => { 

    try {

        const course =  await Course.findOneAndRemove({slug : req.params.slug})
         req.flash("success", `Silme başarılı!`);
         res.status(200).redirect('/users/dashboard');

       
    } catch(error)  {
        res.status(400).json({
            status: 'failed',
            error
        });
    } 
 
}


exports.updateCourse = async (req, res) => {
    try {    
  
      const course = await Course.findOne({slug:req.params.slug});
      course.name = req.body.name;
      course.description = req.body.description;
      course.category = req.body.category;
  
      course.save();
      req.flash("success", `Güncelleme başarılı!`);
      res.status(200).redirect('/users/dashboard');
  
    } catch (error) {
      res.status(400).json({
        status: 'fail',
        error,
      });
    }
  };