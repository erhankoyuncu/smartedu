const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCourse = async (req, res) => { 

    try {
        const course = await Course.create(req.body);
        res.status(201).json({
            status: 'success',
            course
        });
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
        const category = await Category.findOne({slug : categorySlug})
         let filter = {};

         if(categorySlug){
            filter = {category:category._id}
         }

        const categories = await Category.find();
        const courses = await Course.find(filter);
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
        const course = await Course.findOne({slug : req.params.slug});
        res.status(201).render("course-single", {
            page_name : "courses",
            course
        })
    } catch(error)  {
        res.status(400).json({
            status: 'failed',
            error
        });
    } 
 
}