const express = require('express');
const router = express.Router();

router.get('/signIn', (req, res) =>{
    res.render('signIn', {title: "Express"});
});
router.get('/studentDashboard', (req, res) =>{
    res.render('studentDashboard', {title: "Express"});
});
router.get('/studentLogin', (req, res) =>{
    res.render('studentLogin', {title: "Express"});
});
router.get('/teacherDashboard', (req, res) =>{
    res.render('teacherDashboard', {title: "Express"});
});
router.get('/teacherLogin', (req, res) =>{
    res.render('teacherLogin', {title: "Express"});
});
router.get('/adminDashboard', (req, res) =>{
    res.render('adminDashboard', {title: "Express"});
});
router.get('/adminLogin', (req, res) =>{
    res.render('adminLogin', {title: "Express"});
});
module.exports = router;

