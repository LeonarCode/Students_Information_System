const express = require("express");
const mysql = require("mysql2");
const indexRouter = require("./routes/index.js");
const cors = require("cors");

const web = express();
web.set("view engine", "ejs");
web.use(express.json());
web.use(cors());


web.locals.message = "";
// web.use(express.urlencoded({extended:true}));

web.use('/', indexRouter);


//Database Connection
const con = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'student_info_system'
}).promise();

web.post('/register', (req, res) => {
    const reqBody = req.body;

    const typeUser = reqBody.typeUser;
    const name = reqBody.firstname + " " +reqBody.lastname;
    const email = reqBody.email;
    const username = reqBody.username;
    const password = reqBody.password;
    const gradeLevel = reqBody.gradeLevel;
    const strand = reqBody.strand;
    const information = reqBody.information;

    async function insertRegister(){
        // Change ra Query !!!!!
        if(typeUser == "Junior High"){
            const [result] = await con.query(`INSERT INTO students (Student_Name, Email, Username, Password, Information, Grade_ID) VALUES (?, ?, ?, ?, ?, ?)`, [name, email, username, password, information, gradeLevel]);
            
            if(result){
                web.locals.message = "OK pre Success";
                res.send("OK").status(200);
            }else{
                web.locals.message = "Error pre";
                res.send("Error").status(200);
            }
    
            console.log(result.insertId);
        }else if(typeUser == "Teacher"){
            const [result] = await con.query(`INSERT INTO teacher (Teacher_Name, Email, Username, Password, Information) VALUES (?, ?, ?, ?, ?)`, [name, email, username, password, information]);
            
            if(result){
                web.locals.message = "OK pre Success";
                res.send("OK").status(200);
            }else{
                web.locals.message = "Error pre";
                res.send("Error").status(200);
            }
    
            console.log(result.insertId);
        }else if(typeUser == "Senior High"){
            const [result] = await con.query(`INSERT INTO sh_students (Student_Name, Email, Username, Password, Information, Strand_ID) VALUES (?, ?, ?, ?, ?, ?)`, [name, email, username, password, information, strand]);
            
            if(result){
                web.locals.message = "OK pre Success";
                res.send("OK").status(200);
            }else{
                web.locals.message = "Error pre";
                res.send("Error").status(200);
            }

            console.log(result.insertId);
        }
    }

    insertRegister();
});
var teacherID;
web.post('/teachLogin', (req, res) =>{
    const reqBody = req.body;
    const username = reqBody.username;
    const password = reqBody.password;
    async function teachEnter(){
        // Change ra Query !!!!!
        const [result] = await con.query(`SELECT * FROM teacher WHERE Username = ? AND Password = ?`, [username, password]);
        
        console.log(result)
        if(result.length > 0){
            res.send(username).status(200);
            web.locals.message = "OK pre";  
            teacherID = result[0].Teacher_ID;
            web.locals.teacher = result[0];
        }else{
            res.send("Error").status(200);
            web.locals.message = "Error";
            web.locals.teacher = "";
        }
    }
    teachEnter();
});
web.post('/adminLogin', (req, res) =>{
    const reqBody = req.body;
    const username = reqBody.username;
    const password = reqBody.password;
    async function adminEnter(){
        // Change ra Query !!!!!
        const [result] = await con.query(`SELECT * FROM admin WHERE Username = ? AND Password = ?`, [username, password]);
        
        console.log(result)
        if(result.length > 0){
            res.send(username).status(200);
            web.locals.message = "OK pre";
            web.locals.admin = result[0];
        }else{
            res.send("Error").status(200);
            web.locals.message = "Error";
            web.locals.admin ="";
        }
    }
    adminEnter();
});
var studentID;
var strandID;
web.post('/studentLogin',(req, res) =>{
    const reqBody = req.body;
    const typeUser = reqBody.typeUser;
    const username = reqBody.username;
    const password = reqBody.password;

    async function showStudAcc(){

        if(typeUser == "Junior High"){
            const [result] = await con.query(`SELECT * FROM students WHERE Username = ? AND Password = ?`,[username,password]);
            console.log(result);
            if(result.length > 0){
                res.send(username).status(200);
                web.locals.message = "OK pre";
                studentID = result[0].Student_ID;
                web.locals.student = result[0];
            }else{
                res.send('Error').status(200);
                web.locals.message = "Error";
                web.locals.student = "";
            }
        }else if(typeUser == "Senior High"){
            const [result] = await con.query(`SELECT * FROM sh_students WHERE Username = ? AND Password = ?`,[username,password]);
            console.log(result);
            if(result.length > 0){
                res.send(username).status(200);
                web.locals.message = "OK pre";
                studentID = result[0].Student_ID;
                strandID = result[0].Strand_ID;
                web.locals.student = result[0];
            }else{
                res.send('Error').status(200);
                web.locals.message = "Error";
                web.locals.student = "";
                web.locals.strandID ="";
            }
        }
    }
    showStudAcc();
});
web.post('/studDashboard',(req, res) =>{
    const reqBody = req.body;
    const typeUser = reqBody.typeUser;
    const curPassword = reqBody.curPassword;
    const newPassword = reqBody.newPassword;
    
    async function updateStudPass(){
        if(typeUser == "Junior High"){
            const [result] = await con.query(`UPDATE students SET Password = '${newPassword}' WHERE Password = '${curPassword}'`);
            if(result.affectedRows > 0){
                res.send("OK").status(200);
                web.locals.message = "OK pre";
                console.log("okkk");
            }else{
                res.send("Error").status(200);
                web.locals.message = "Error";
                console.log("nnnnn");
            }
        }else if(typeUser == "Senior High"){
            const [result] = await con.query(`UPDATE sh_students SET Password = '${newPassword}' WHERE Password = '${curPassword}'`);
            if(result.affectedRows > 0){
                res.send("OK").status(200);
                web.locals.message = "OK pre";
                console.log("okkk");
            }else{
                res.send("Error").status(200);
                web.locals.message = "Error";
                console.log("nnnnn");
            }
        }
    }
    updateStudPass();
});
web.get('/adDashboard',(req ,res)=>{
    async function getTeaher(){
        const [result] = await con.query("SELECT Teacher_ID, Teacher_Name FROM teacher");
        let cmp = "";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += `<option value='${result[i].Teacher_ID}'>${result[i].Teacher_Name}</option>`;
            }
            res.send(cmp).status(200);
        }
    }

    getTeaher();
});
web.get('/adssDashboard',(req,res)=>{
    async function getGradeLevel(){
        const [result] = await con.query("SELECT * FROM grade_lvl ");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Grade_ID+"'>"+result[i].Grade_Name+"</option>";
            }
            res.send(cmp).status(200);
        }
    }
    getGradeLevel();
});
web.get('/adsiDashboard',(req,res)=>{
    async function getSubject(){
        const [result] = await con.query("SELECT * FROM jh_subject");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Subject_ID+"'>"+result[i].Subject_Name+"</option>";
            }
            res.send(cmp).status(200);
        }
    }
    getSubject();
});
web.get('/adshDashboard',(req,res)=>{
    async function getStrand(){
        const [result] = await con.query("SELECT * FROM strand");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Strand_ID+"'>"+result[i].Strand_Name+"</option>";
            }
            res.send(cmp).status(200);
        }
    }
    getStrand();
});
web.get('/adsxDashboard',(req,res)=>{
    async function getSubject(){
        const [result] = await con.query("SELECT * FROM sh_subject");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Subject_ID+"'>"+result[i].Subject_Name+"</option>";
            }
            res.send(cmp).status(200);
        }
    }
    getSubject();
});
web.get('/adskDashboard',(req,res)=>{
    async function getStudent(){
        const [result] = await con.query("SELECT Student_ID, Student_Name FROM students");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Student_ID+"'>"+result[i].Student_Name+"</option>";
            }
            res.send(cmp).status(200);
        }
    }
    getStudent();
});
web.get('/adkhDashboard',(req,res)=>{
    async function getGradeLevel(){
        const [result] = await con.query("SELECT * FROM grade_lvl ");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Grade_ID+"'>"+result[i].Grade_Name+"</option>";
            }
            res.send(cmp).status(200);
        }
    }
    getGradeLevel();
});
web.get('/adkiDashboard',(req,res)=>{
    async function getSection(){
        const [result] = await con.query("SELECT * FROM section");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Section_ID+"'>"+result[i].Section_Name+"</option>";
            }
            res.send(cmp).status(200);
        }
    }
    getSection();
});
web.get('/adkrDashboard',(req,res)=>{
    async function getStudent(){
        const [result] = await con.query("SELECT Student_ID, Student_Name FROM sh_students");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Student_ID+"'>"+result[i].Student_Name+"</option>";
            }
            res.send(cmp).status(200);
        }
    }
    getStudent();
});
web.get('/adpoDashboard',(req,res)=>{
    async function getStudent(){
        const [result] = await con.query("SELECT Student_ID, Student_Name FROM students");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Student_ID+"'>"+result[i].Student_Name+"</option>";
            }
            res.send(cmp).status(200);
        }
    }
    getStudent();
});
web.get('/adprDashboard',(req,res)=>{
    async function getStudent(){
        const [result] = await con.query("SELECT Student_ID, Student_Name FROM sh_students");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Student_ID+"'>"+result[i].Student_Name+"</option>";
            }
            res.send(cmp).status(200);
        }
    }
    getStudent();
});
web.get('/adklDashboard',(req,res)=>{
    async function getStrand(){
        const [result] = await con.query("SELECT * FROM strand");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Strand_ID+"'>"+result[i].Strand_Name+"</option>";
            }
            res.send(cmp).status(200);
        }
    }
    getStrand();
});
web.get('/adkmDashboard',(req,res)=>{
    async function getSection(){
        const [result] = await con.query("SELECT * FROM section");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Section_ID+"'>"+result[i].Section_Name+"</option>";
            }
            res.send(cmp).status(200);
        }
    }
    getSection();
});
web.get('/adiDashboard',(req ,res)=>{
    async function getTeaher(){
        const [result] = await con.query("SELECT Teacher_ID, Teacher_Name FROM teacher");
        let cmp = "";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += `<option value='${result[i].Teacher_ID}'>${result[i].Teacher_Name}</option>`;
            }
            res.send(cmp).status(200);
        }
    }

    getTeaher();
});
web.get('/adkvDashboard',(req ,res)=>{
    async function getTeaher(){
        const [result] = await con.query("SELECT Teacher_ID, Teacher_Name FROM teacher");
        let cmp = "";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += `<option value='${result[i].Teacher_ID}'>${result[i].Teacher_Name}</option>`;
            }
            res.send(cmp).status(200);
        }
    }

    getTeaher();
});
web.post('/adlpDashboard',(req,res)=>{
    const reqBody = req.body;
    const sectionID = reqBody.sectionID;
    const sectionName = reqBody.sectionName;
    const adviser = reqBody.adviser;
    async function addSection(){
        const [result] = await con.query("INSERT INTO section(Section_ID, Section_Name, Teacher_ID) VALUES(?,?,?)",[sectionID,sectionName,adviser]);
        if(result){
            web.locals.message = "OK pre Success";
                res.send("OK").status(200);
        }else{
            web.locals.message = "Error pre";
            res.send("Error").status(200);
        }
    }
    addSection();
});
web.post('/adldDashboard',(req,res)=>{
    const reqBody = req.body;
    const gradelvl = reqBody.gradelvl;
    const subjectID = reqBody.subjectID;
    async function combineJh(){
        const [result] = await con.query("INSERT INTO junior_system(Grade_ID, Subject_ID) VALUES(?,?)",[gradelvl,subjectID]);
        if(result){
            web.locals.message = "OK pre Success";
                res.send("OK").status(200);
        }else{
            web.locals.message = "Error pre";
            res.send("Error").status(200);
        }
    }
    combineJh();
});
web.post('/adlbDashboard',(req,res)=>{
    const reqBody = req.body;
    const strandID = reqBody.strandID;
    const subjectID = reqBody.subjectID;
    async function combineSh(){
        const [result] = await con.query("INSERT INTO senior_system(Strand_ID, Subject_ID) VALUES(?,?)",[strandID,subjectID]);
        if(result){
            web.locals.message = "OK pre Success";
                res.send("OK").status(200);
        }else{
            web.locals.message = "Error pre";
            res.send("Error").status(200);
        }
    }
    combineSh();
});
web.post('/adlgDashboard',(req,res)=>{
    const reqBody = req.body;
    const studentsID = reqBody.studentsID;
    const gradelvl = reqBody.gradelvl;
    const sectionID = reqBody.sectionID;
    async function groupSave(){
        const [result] = await con.query("INSERT INTO junior_group(Student_ID, Grade_ID, Section_ID) VALUES(?,?,?)",[studentsID,gradelvl,sectionID]);
        if(result){
            web.locals.message = "OK pre Success";
                res.send("OK").status(200);
        }else{
            web.locals.message = "Error pre";
            res.send("Error").status(200);
            throw new Error("Sql Error");
        }
    }
    groupSave();
});
web.post('/adlhDashboard',(req,res)=>{
    const reqBody = req.body;
    const studentsID = reqBody.studentsID;
    const strandID = reqBody.strandID;
    const sectionID = reqBody.sectionID;
    async function groupSave(){
        const [result] = await con.query("INSERT INTO senior_group(Student_ID, Strand_ID, Section_ID) VALUES(?,?,?)",[studentsID,strandID,sectionID]);
        if(result){
            web.locals.message = "OK pre Success";
                res.send("OK").status(200);
        }else{   
            web.locals.message = "Error pre";
            res.send("Error").status(200);
        }
    }
    groupSave();
});
web.post('/admDashboard',(req ,res)=>{
    const reqBody = req.body;
    const typeUser = reqBody.typeUser;
    const subCode = reqBody.subCode;
    const subName = reqBody.subName;
    const subjectshh = reqBody.subjectshh;
    const teacherID = reqBody.teacherID;
    async function addSubject(){
        if(typeUser == "Junior High"){
            const [result] = await con.query("INSERT INTO jh_subject(Subject_ID, Subject_Name, Subject_Code, Teacher_ID) VALUES(?,?,?,?)",[subCode,subName,subjectshh,teacherID]);
            if(result){
                web.locals.message = "OK pre Success";
                res.send("OK").status(200);
            }else{
                web.locals.message = "Error pre";
                res.send("Error").status(200);
            }
        }else if(typeUser == "Senior High"){
            const [result] = await con.query("INSERT INTO sh_subject (Subject_ID, Subject_Name, Subject_Code, Teacher_ID) VALUES(?,?,?,?)",[subCode,subName,subjectshh,teacherID]);
            if(result){
                web.locals.message = "OK pre Success";
                res.send("OK").status(200);
            }else{
                web.locals.message = "Error pre";
                res.send("Error").status(200);
            }
        }
    }
    addSubject();
});
web.post("/adfgDashboard",(req,res)=>{
    const reqBody = req.body;
    const studID = reqBody.studID;
    async function deleteStudent(){
        const [result] = await con.query(`DELETE FROM students WHERE Student_ID = ${studID}`);
        if(result.affectedRows > 0){
            res.send("OK").status(200);
            web.locals.message = "OK pre";
            console.log("okkk");
        }else{
            res.send("Error").status(200);
            web.locals.message = "Error";
            console.log("nnnnn");
        }
    }
    deleteStudent();
});
web.post("/adfkDashboard",(req,res)=>{
    const reqBody = req.body;
    const studID = reqBody.studID;
    async function deleteStudent(){
        const [result] = await con.query(`DELETE FROM sh_students WHERE Student_ID = ${studID}`);
        if(result.affectedRows > 0){
            res.send("OK").status(200);
            web.locals.message = "OK pre";
            console.log("okkk");
        }else{
            res.send("Error").status(200);
            web.locals.message = "Error";
            console.log("nnnnn");
        }
    }
    deleteStudent();
});
web.post("/adfjDashboard",(req,res)=>{
    const reqBody = req.body;
    const teachID = reqBody.teachID;
    async function deleteStudent(){
        const [result] = await con.query(`DELETE FROM teacher WHERE Teacher_ID = ${teachID}`);
        if(result.affectedRows > 0){
            res.send("OK").status(200);
            web.locals.message = "OK pre";
            console.log("okkk");
        }else{
            res.send("Error").status(200);
            web.locals.message = "Error";
            console.log("nnnnn");
        }
    }
    deleteStudent();
});
web.get('/signup',(req,res)=>{
    async function showGradeLevel(){
        const [result] = await con.query("SELECT Grade_ID, Grade_Name FROM grade_lvl");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += `<option value='${result[i].Grade_ID}'>${result[i].Grade_Name}</option>`;
            }
            res.send(cmp).status(200);
        }
    }
    showGradeLevel();
});
web.get('/signupp',(req,res)=>{
    async function showStrand(){
        const [result] = await con.query("SELECT Strand_ID, Strand_Name FROM strand");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += `<option value='${result[i].Strand_ID}'>${result[i].Strand_Name}</option>`;
            }
            res.send(cmp).status(200);
        }
    }
    showStrand();
});
web.post('/amDashboard',(req,res)=>{
    const reqBody = req.body;
    const strCode = reqBody.strCode;
    const strName = reqBody.strName;
    async function addStrand(){
        const [result] = await con.query("INSERT INTO strand(Strand_ID, Strand_Name) VALUES(?,?)",[strCode,strName]);
        if(result){
            web.locals.message = "OK pre Success";
            res.send("OK").status(200);
        }else{
            web.locals.message = "Error pre";
            res.send("Error").status(200);
        }
    }
    addStrand();
});
web.get("/aiDashboard",(req,res)=>{
    async function getJuniorStud(){
        const [result] = await con.query("SELECT s.Student_ID, s.Student_Name, s.Email, s.Username, g.Grade_Name FROM students s INNER JOIN grade_lvl g ON s.Grade_ID = g.Grade_ID");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<tr onclick='setStudent()'> <td>"+result[i].Student_ID+"</td> <td>"+result[i].Student_Name+"</td> <td>"+result[i].Email+"</td> <td>"+result[i].Username+"</td> <td>"+result[i].Grade_Name+"</td> </tr>";
            }
            res.send(cmp).status(200);
        }
    }

    getJuniorStud();
});
web.get("/aiiDashboard",(req,res)=>{
    async function getSeniorStud(){
        const [result] = await con.query("SELECT s.Student_ID, s.Student_Name, s.Email, s.Username, sr.Strand_Name FROM sh_students s INNER JOIN strand sr ON s.Strand_ID = sr.Strand_ID");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<tr> <td>"+result[i].Student_ID+"</td> <td>"+result[i].Student_Name+"</td> <td>"+result[i].Email+"</td> <td>"+result[i].Username+"</td> <td>"+result[i].Strand_Name+"</td> </tr>";
            }
            res.send(cmp).status(200);
        }
    }
    getSeniorStud();
});
web.get("/addfDashboard",(req,res)=>{
    async function getSeniorStud(){
        const [result] = await con.query("SELECT Teacher_ID, Teacher_Name, Email, Username FROM teacher");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<tr> <td>"+result[i].Teacher_ID+"</td> <td>"+result[i].Teacher_Name+"</td> <td>"+result[i].Email+"</td> <td>"+result[i].Username+"</td> </tr>";
            }
            res.send(cmp).status(200);
        }
    }
    getSeniorStud();
});
web.post("/teDashboard",(req,res)=>{
    const reqBody = req.body;
    const currPass = reqBody.currPass;
    const newPass = reqBody.newPass;
    async function updateTeaPass(){
        const [result] = await con.query(`UPDATE teacher SET Password = '${newPass}' WHERE Password = '${currPass}'`);
        if(result.affectedRows > 0){
            res.send("OK").status(200);
            web.locals.message = "OK pre";
            console.log("okkk");
        }else{
            res.send("Error").status(200);
            web.locals.message = "Error";
            console.log("nnnnn");
        }
    }
    updateTeaPass();
});
web.get("/taDashboard",(req,res)=>{
    async function seeSections(){
        const [result] = await con.query("SELECT Subject_ID, Subject_Name FROM jh_subject WHERE Teacher_ID = ?",[teacherID]);
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<li onclick='showJhInput(&#x27;"+result[i].Subject_ID+"&#x27;)'>"+result[i].Subject_Name+"</li>";
            }
            res.send(cmp).status(200);
        }
    }
    seeSections();
});
web.get("/teeDashboard",(req,res)=>{
    async function seeSections(){
        const [result] = await con.query("SELECT Subject_ID, Subject_Name FROM sh_subject WHERE Teacher_ID = ?",[teacherID]);
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<li onclick='showShInput(&#x27;"+result[i].Subject_ID+"&#x27;)'>"+result[i].Subject_Name+"</li>";
            }
            res.send(cmp).status(200);
        }
    }
    seeSections();
});

web.post("/tcDashboard",(req,res)=>{
    const reqBody = req.body;
    const bastaId = reqBody.bastaId;
    async function seeStudent(){
        const [result] = await con.query("SELECT s.Student_ID, s.Student_Name FROM jh_record jr INNER JOIN students s ON jr.Student_ID = s.Student_ID WHERE jr.Subject_ID = ?",[bastaId]);
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Student_ID+"'>"+result[i].Student_Name+"</option>";
            }
            res.status(200).send(cmp);
        }

    }
    seeStudent();
});
web.post("/tcyDashboard",(req,res)=>{
    const reqBody = req.body;
    const bastaId = reqBody.bastaId;
    async function seeStudent(){
        const [result] = await con.query("SELECT s.Student_ID, s.Student_Name FROM sh_record sr INNER JOIN sh_students s ON sr.Student_ID = s.Student_ID WHERE sr.Subject_ID = ?",[bastaId]);
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value='"+result[i].Student_ID+"'>"+result[i].Student_Name+"</option>";
            }
            res.status(200).send(cmp);
        }

    }
    seeStudent();
});
web.post("/tweDashboard",(req,res)=>{
    const reqBody = req.body;
    const jhStud = reqBody.jhStud;
    const jhSubs = reqBody.jhSubs;
    const enterGrade = reqBody.enterGrade;
    async function addGrade(){
        if(jhSubs == "First_Grading"){
            const [result] = await con.query(`UPDATE jh_record SET First_Grading ='${enterGrade}' WHERE Student_ID ='${jhStud}'`);
            if(result.affectedRows > 0){
                res.send("OK").status(200);
                web.locals.message = "OK pre";
                console.log("okkk");
            }else{
                res.send("Error").status(200);
                web.locals.message = "Error";
                console.log("nnnnn");
            }
        }else if(jhSubs == "Second_Grading"){
            const [result] = await con.query(`UPDATE jh_record SET Second_Grading ='${enterGrade}' WHERE Student_ID ='${jhStud}'`);
            if(result.affectedRows > 0){
                res.send("OK").status(200);
                web.locals.message = "OK pre";
                console.log("okkk");
            }else{
                res.send("Error").status(200);
                web.locals.message = "Error";
                console.log("nnnnn");
            }
        }else if(jhSubs == "Third_Grading"){
            const [result] = await con.query(`UPDATE jh_record SET Third_Grading ='${enterGrade}' WHERE Student_ID ='${jhStud}'`);
            if(result.affectedRows > 0){
                res.send("OK").status(200);
                web.locals.message = "OK pre";
                console.log("okkk");
            }else{
                res.send("Error").status(200);
                web.locals.message = "Error";
                console.log("nnnnn");
            }
        }else if(jhSubs == "Fourth_Grading"){
            const [result] = await con.query(`UPDATE jh_record SET Fourth_Grading ='${enterGrade}' WHERE Student_ID ='${jhStud}'`);
            if(result.affectedRows > 0){
                res.send("OK").status(200);
                web.locals.message = "OK pre";
                console.log("okkk");
            }else{
                res.send("Error").status(200);
                web.locals.message = "Error";
                console.log("nnnnn");
            }
        }else if(jhSubs == "Final_Grade"){
            const [result] = await con.query(`UPDATE jh_record SET Final_Grade ='${enterGrade}' WHERE Student_ID ='${jhStud}'`);
            if(result.affectedRows > 0){
                res.send("OK").status(200);
                web.locals.message = "OK pre";
                console.log("okkk");
            }else{
                res.send("Error").status(200);
                web.locals.message = "Error";
                console.log("nnnnn");
            }
        }
    }
    addGrade();
});
web.post("/twoDashboard",(req,res)=>{
    const reqBody = req.body;
    const shStud = reqBody.shStud;
    const shSubs = reqBody.shSubs;
    const enterGrade = reqBody.enterGrade;
    async function addGrade(){
        if(shSubs == "First_Grading"){
            const [result] = await con.query(`UPDATE sh_record SET First_Grading ='${enterGrade}' WHERE Student_ID ='${shStud}'`);
            if(result.affectedRows > 0){
                res.send("OK").status(200);
                web.locals.message = "OK pre";
                console.log("okkk");
            }else{
                res.send("Error").status(200);
                web.locals.message = "Error";
                console.log("nnnnn");
            }
        }else if(shSubs == "Second_Grading"){
            const [result] = await con.query(`UPDATE sh_record SET Second_Grading ='${enterGrade}' WHERE Student_ID ='${shStud}'`);
            if(result.affectedRows > 0){
                res.send("OK").status(200);
                web.locals.message = "OK pre";
                console.log("okkk");
            }else{
                res.send("Error").status(200);
                web.locals.message = "Error";
                console.log("nnnnn");
            }
        }else if(shSubs == "Final_Grade"){
            const [result] = await con.query(`UPDATE sh_record SET Final_Grade ='${enterGrade}' WHERE Student_ID ='${shStud}'`);
            if(result.affectedRows > 0){
                res.send("OK").status(200);
                web.locals.message = "OK pre";
                console.log("okkk");
            }else{
                res.send("Error").status(200);
                web.locals.message = "Error";
                console.log("nnnnn");
            }
        }
    }
    addGrade();
});
web.get("/tuoDashboard",(req,res)=>{
    async function getPicture(){
        const[result] = await con.query("SELECT Information FROM teacher WHERE Teacher_ID =?",[teacherID]);
        let cmp= result[0].Information;
        console.log(result);
        res.send(cmp).status(200);
    }
    getPicture();
});
web.get("/tuqDashboard",(req,res)=>{
    async function getStudents(){
        const [result] = await con.query("SELECT s.Student_ID, s.Student_Name FROM junior_group jg INNER JOIN students s ON jg.Student_ID = s.Student_ID INNER JOIN section sc ON jg.Section_ID = sc.Section_ID WHERE sc.Teacher_ID =?",[teacherID]);
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<tr> <td>"+result[i].Student_ID+"</td> <td>"+result[i].Student_Name+"</td> </tr>";
            }
            res.send(cmp).status(200);
        }
    }
    getStudents();
})
web.get("/tsutDashboard",(req,res)=>{
    async function getSection(){
        const [result] = await con.query("SELECT Section_Name FROM section WHERE Teacher_ID =?",[teacherID]);
        let cmp = result[0].Section_Name;
        res.send(cmp).status(200);
    }
    getSection();
});
web.post("/sdDashboard", (req, res) => { // Changed to POST
    const reqBody = req.body;
    const gradeID = reqBody.gradeID;
    
    async function showEnroll() {
        const [result] = await con.query("SELECT s.Subject_ID, s.Subject_Name, s.Subject_Code FROM junior_system js INNER JOIN jh_subject s ON js.Subject_ID = s.Subject_ID WHERE js.Grade_ID= ?", [gradeID]);
        let cmp = ""; // Initialize cmp
        
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                cmp += "<label for='" + result[i].Subject_Code + "'> <input type='checkbox' id='" + result[i].Subject_Code + "' value='" + result[i].Subject_ID + "'>" + result[i].Subject_Name + "</label>"; // Fixed for syntax
            }
            res.status(200).send(cmp);
        } else {
            res.status(200).send("No subjects found."); // Handle no results
        }
    }
    
    showEnroll();
});

web.get("/sderDashboard", (req, res) => {
    async function showEnroll() {
        const [result] = await con.query("SELECT s.Subject_ID, s.Subject_Name, s.Subject_Code FROM senior_system ss INNER JOIN sh_subject s ON ss.Subject_ID = s.Subject_ID WHERE ss.Strand_ID= ?", [strandID]);
        let cmp = ""; // Initialize cmp
        
        if (result.length > 0) {
            for (let i = 0; i < result.length; i++) {
                cmp += "<label for='" + result[i].Subject_Code + "'> <input type='checkbox' id='" + result[i].Subject_Code + "' value='" + result[i].Subject_ID + "'>" + result[i].Subject_Name + "</label>"; // Fixed for syntax
            }
            res.status(200).send(cmp);
        } else {
            res.status(200).send("No subjects found."); // Handle no results
        }
    }
    
    showEnroll();
});

web.get("/stDashboard",(req,res)=>{
    async function viewjhGrade(){
        const[result] = await con.query("SELECT s.Subject_ID, s.Subject_Name, jh.First_Grading, jh.Second_Grading, jh.Third_Grading, jh.Fourth_Grading, jh.Final_Grade FROM jh_record jh INNER JOIN jh_subject s ON jh.Subject_ID = s.Subject_ID WHERE jh.Student_ID = ?",[studentID]);
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<tr> <td>"+result[i].Subject_ID+"</td> <td>"+result[i].Subject_Name+"</td> <td>"+result[i].First_Grading+"</td> <td>"+result[i].Second_Grading+"</td> <td>"+result[i].Third_Grading+"</td> <td>"+result[i].Fourth_Grading+"</td> <td>"+result[i].Final_Grade+"</td> </tr>";
            }
            res.send(cmp).status(200);
        }
    }
    viewjhGrade();
});
web.get('/stroDashboard',(req,res)=>{
    async function getPicture(){
        const[result] = await con.query("SELECT Information FROM students WHERE Student_ID =?",[studentID]);
        let cmp= result[0].Information;
        console.log(result);
        res.send(cmp).status(200);
    }
    getPicture();
});
web.get('/strwDashboard',(req,res)=>{
    async function getPicture(){
        const[result] = await con.query("SELECT Information FROM sh_students WHERE Student_ID =?",[studentID]);
        let cmp= result[0].Information;
        console.log(result);
        res.send(cmp).status(200);
    }
    getPicture();
});
web.get("/suDashboard",(req,res)=>{
    async function viewshGrade(){
        const[result] = await con.query("SELECT s.Subject_ID, s.Subject_Name, sh.First_Grading, sh.Second_Grading, sh.Final_Grade FROM sh_record sh INNER JOIN sh_subject s ON sh.Subject_ID = s.Subject_ID WHERE sh.Student_ID = ?",[studentID]);
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<tr> <td>"+result[i].Subject_ID+"</td> <td>"+result[i].Subject_Name+"</td> <td>"+result[i].First_Grading+"</td> <td>"+result[i].Second_Grading+"</td> <td>"+result[i].Final_Grade+"</td> </tr>";
            }
            res.send(cmp).status(200);
        }
    }
    viewshGrade();
});
web.get('/strDashboard',(req,res)=>{
    async function gradeShow(){
        const [result] = await con.query("SELECT * FROM grade_lvl");
        let cmp ="";
        if(result.length > 0){
            for(let i = 0; i < result.length; i++){
                cmp += "<option value ="+result[i].Grade_ID+">"+result[i].Grade_Name+"</option>";
            }
            res.send(cmp).status(200);
        }
    }
    gradeShow();
});
web.post('/stewDashboard',(req,res)=>{
    const reqBody = req.body;
    const gradeID = reqBody.gradeID;
    const subjId = reqBody.subjId;
    async function enrollStudent(){
        const [result] = await con.query("INSERT INTO jh_record(Student_ID, Grade_ID, Subject_ID) VALUES(?,?,?)",[studentID, gradeID, subjId]);
        if(result){
            web.locals.message = "OK pre Success";
            res.send("OK").status(200);
        }else{
            web.locals.message = "Error pre";
            res.send("Error").status(200);
        }
    }
    enrollStudent();
});
web.post('/steyDashboard',(req,res)=>{
    const reqBody = req.body;
    const subjId = reqBody.subjId;
    async function enrollStudent(){
        const [result] = await con.query("INSERT INTO sh_record(Student_ID, Strand_ID, Subject_ID) VALUES(?,?,?)",[studentID, strandID, subjId]);
        if(result){
            web.locals.message = "OK pre Success";
            res.send("OK").status(200);
        }else{
            web.locals.message = "Error pre";
            res.send("Error").status(200);
        }
    }
    enrollStudent();
});
web.use(express.static("public"));

web.listen(3000, () =>{
    console.log('Express is running on port 3000');

});

