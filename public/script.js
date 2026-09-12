var type = "";

function showEnroll(){
    document.querySelector(".enrollment").classList.toggle("show");
}

function showGrade(){
    document.querySelector(".grades").classList.toggle("show");
}
function showStuds(){
    document.querySelector(".manStud").classList.toggle("adShow");
}
function showEmps(){
    document.querySelector(".manFS").classList.toggle("adShow");
}
function showUstype(){
    document.querySelector(".utype").classList.toggle("showUtype");
}
function showStudType(){
    document.querySelector(".chooseType").classList.toggle("showUtype");
}
function showLevel(){
    document.querySelector(".grdLvlCh").classList.toggle("showUtype");
}
function showSubjects(){
    document.querySelector(".manSub").classList.toggle("adShow");
}
function showSubAdd(){
    document.querySelector(".subAdd").classList.toggle("adShow");
}
function showDelStud(){
    document.querySelector(".manDelStud").classList.toggle("adShow");
}
function showteaAcc(){
    document.querySelector(".teachAcc").classList.toggle("showTeachAcc");
    document.querySelector(".inputGrade").classList.remove("showTeachAcc");
    document.querySelector(".showAssClass").classList.remove("showshhhCl");
    document.querySelector(".sectListSt").classList.remove("showSecList");
}
function showAssigCl(){
    document.querySelector(".showAssClass").classList.toggle("showshhhCl");
    document.querySelector(".teachAcc").classList.remove("showTeachAcc");
    document.querySelector(".teaFormDisp").classList.remove("showPicFormTea");
    document.querySelector(".sectListSt").classList.remove("showSecList");
}
function showStudinSec(){
    document.querySelector(".sectListSt").classList.toggle("showSecList");
    document.querySelector(".inputGrade").classList.remove("showTeachAcc");
    document.querySelector(".showAssClass").classList.remove("showshhhCl");
    document.querySelector(".teaFormDisp").classList.remove("showPicFormTea");
    document.querySelector(".inputGrade").classList.remove("showTeachAcc");
}
function showtAppForm(){
    document.querySelector(".teaFormDisp").classList.toggle("showPicFormTea");
    document.querySelector(".inputGrade").classList.remove("showTeachAcc");
    document.querySelector(".showAssClass").classList.remove("showshhhCl");
    document.querySelector(".inputGrade").classList.remove("showTeachAcc");
    document.querySelector(".sectListSt").classList.remove("showSecList");
}
function showClassMan(){
    document.querySelector(".manWholeClass").classList.toggle("adShow");
}
function showStudSh(){
    document.querySelector(".manStuds").classList.toggle("adShow");
}
function showSectOpt(){
    document.querySelector(".manGroupSec").classList.toggle("adShow");
}
function studEnroll(){
    typeUser = localStorage.getItem("typeUser");
    document.querySelector(".sHome").classList.toggle("hideSHome");
    if(typeUser == "Junior High"){
        document.querySelector(".jhEnroll").classList.toggle("showEnrollment");
    }else if(typeUser == "Senior High"){
        document.querySelector(".shEnroll").classList.toggle("showEnrollment");
    }
}
function showAddSec(){
    document.querySelector(".addSec").classList.toggle("showAddSub");
    document.querySelector(".showManSubsh").classList.remove("showAddSub");
    document.querySelector(".showManSubjh").classList.remove("showAddSub");
    document.querySelector(".showSeniorStud").classList.remove("seeStudTbl");
    document.querySelector(".addSub").classList.remove("showAddSub");
    document.querySelector(".showJuniorStuds").classList.remove("seeStudTbl");
    document.querySelector(".addStn").classList.remove("showAddSub");
    document.querySelector(".delStudentjh").classList.remove("showAddSub");
    document.querySelector(".delStudentsh").classList.remove("showAddSub");
    document.querySelector(".showTeacherssn").classList.remove("seeStudTbl");
    document.querySelector(".delTeacher").classList.remove("showAddSub");
}
function showStrAdd(){
    document.querySelector(".addStn").classList.toggle("showAddSub");
    document.querySelector(".showSeniorStud").classList.remove("seeStudTbl");
    document.querySelector(".addSub").classList.remove("showAddSub");
    document.querySelector(".showJuniorStuds").classList.remove("seeStudTbl");
    document.querySelector(".showManSubsh").classList.remove("showAddSub");
    document.querySelector(".showManSubjh").classList.remove("showAddSub");
    document.querySelector(".addSec").classList.remove("showAddSub");
    document.querySelector(".delStudentjh").classList.remove("showAddSub");
    document.querySelector(".delStudentsh").classList.remove("showAddSub");
    document.querySelector(".showTeacherssn").classList.remove("seeStudTbl");
    document.querySelector(".delTeacher").classList.remove("showAddSub");
}
function showStrand(){
    document.querySelector(".manStand").classList.toggle("adShow");
}
var bastaId ="";
function showJhInput(bastaId){
    document.querySelector(".inputGrade").classList.toggle("showTeachAcc");
    document.querySelector(".teachAcc").classList.remove("showTeachAcc");
    this.bastaId = bastaId;
    console.log(this.bastaId);
    const body = JSON.stringify({
        bastaId : this.bastaId
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("inputjhstud").innerHTML = this.responseText;
        }
    }
    
    xhr.open("POST", "http://localhost:3000/tcDashboard"); // Changed to POST
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(body);
}
function showShInput(bastaId){
    document.querySelector(".inputGradesh").classList.toggle("showTeachAcc");
    document.querySelector(".teachAcc").classList.remove("showTeachAcc");
    this.bastaId = bastaId;
    console.log(this.bastaId);
    const body = JSON.stringify({
        bastaId : this.bastaId
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.getElementById("inputshstud").innerHTML = this.responseText;
        }
    }
    
    xhr.open("POST", "http://localhost:3000/tcyDashboard"); // Changed to POST
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(body);
}


function jhManSubs(){
    document.querySelector(".showManSubjh").classList.toggle("showAddSub");
    document.querySelector(".showManSubsh").classList.remove("showAddSub");
    document.querySelector(".addSec").classList.remove("showAddSub");
    document.querySelector(".showSeniorStud").classList.remove("seeStudTbl");
    document.querySelector(".showJuniorStuds").classList.remove("seeStudTbl");
    document.querySelector(".addSub").classList.remove("showAddSub");
    document.querySelector(".addStn").classList.remove("showAddSub");
    document.querySelector(".sectJuniorHigh").classList.remove("showAddSub");
    document.querySelector(".sectSeniorHigh").classList.remove("showAddSub");
    document.querySelector(".delStudentjh").classList.remove("showAddSub");
    document.querySelector(".delStudentsh").classList.remove("showAddSub");
    document.querySelector(".showTeacherssn").classList.remove("seeStudTbl");
    document.querySelector(".delTeacher").classList.remove("showAddSub");
}
function shManSubs(){
    document.querySelector(".showManSubsh").classList.toggle("showAddSub");
    document.querySelector(".showManSubjh").classList.remove("showAddSub");
    document.querySelector(".addSec").classList.remove("showAddSub");
    document.querySelector(".showSeniorStud").classList.remove("seeStudTbl");
    document.querySelector(".showJuniorStuds").classList.remove("seeStudTbl");
    document.querySelector(".addSub").classList.remove("showAddSub");
    document.querySelector(".addStn").classList.remove("showAddSub");
    document.querySelector(".sectJuniorHigh").classList.remove("showAddSub");
    document.querySelector(".sectSeniorHigh").classList.remove("showAddSub");
    document.querySelector(".delStudentjh").classList.remove("showAddSub");
    document.querySelector(".delStudentsh").classList.remove("showAddSub");
    document.querySelector(".showTeacherssn").classList.remove("seeStudTbl");
    document.querySelector(".delTeacher").classList.remove("showAddSub");
}
function jhSecGroup(){
    document.querySelector(".sectJuniorHigh").classList.toggle("showAddSub");
    document.querySelector(".sectSeniorHigh").classList.remove("showAddSub");
    document.querySelector(".showManSubjh").classList.remove("showAddSub");
    document.querySelector(".showManSubsh").classList.remove("showAddSub");
    document.querySelector(".addSec").classList.remove("showAddSub");
    document.querySelector(".showSeniorStud").classList.remove("seeStudTbl");
    document.querySelector(".showJuniorStuds").classList.remove("seeStudTbl");
    document.querySelector(".addSub").classList.remove("showAddSub");
    document.querySelector(".addStn").classList.remove("showAddSub");
    document.querySelector(".delStudentjh").classList.remove("showAddSub");
    document.querySelector(".delStudentsh").classList.remove("showAddSub");
    document.querySelector(".showTeacherssn").classList.remove("seeStudTbl");
    document.querySelector(".delTeacher").classList.remove("showAddSub");
}
function shSecGroup(){
    document.querySelector(".sectSeniorHigh").classList.toggle("showAddSub");
    document.querySelector(".sectJuniorHigh").classList.remove("showAddSub");
    document.querySelector(".showManSubjh").classList.remove("showAddSub");
    document.querySelector(".showManSubsh").classList.remove("showAddSub");
    document.querySelector(".addSec").classList.remove("showAddSub");
    document.querySelector(".showSeniorStud").classList.remove("seeStudTbl");
    document.querySelector(".showJuniorStuds").classList.remove("seeStudTbl");
    document.querySelector(".addSub").classList.remove("showAddSub");
    document.querySelector(".addStn").classList.remove("showAddSub");
    document.querySelector(".delStudentjh").classList.remove("showAddSub");
    document.querySelector(".delStudentsh").classList.remove("showAddSub");
    document.querySelector(".showTeacherssn").classList.remove("seeStudTbl");
    document.querySelector(".delTeacher").classList.remove("showAddSub");
}
function showJuniortable(){
    document.querySelector(".showJuniorStuds").classList.toggle("seeStudTbl");
    document.querySelector(".showSeniorStud").classList.remove("seeStudTbl");
    document.querySelector(".addSub").classList.remove("showAddSub");
    document.querySelector(".addStn").classList.remove("showAddSub");
    document.querySelector(".sectJuniorHigh").classList.remove("showAddSub");
    document.querySelector(".sectSeniorHigh").classList.remove("showAddSub");
    document.querySelector(".showManSubjh").classList.remove("showAddSub");
    document.querySelector(".showManSubsh").classList.remove("showAddSub");
    document.querySelector(".addSec").classList.remove("showAddSub");
    document.querySelector(".delStudentjh").classList.remove("showAddSub");
    document.querySelector(".delStudentsh").classList.remove("showAddSub");
    document.querySelector(".showTeacherssn").classList.remove("seeStudTbl");
    document.querySelector(".delTeacher").classList.remove("showAddSub");
}
function showSeniortable(){
    document.querySelector(".showSeniorStud").classList.toggle("seeStudTbl");
    document.querySelector(".showJuniorStuds").classList.remove("seeStudTbl");
    document.querySelector(".addSub").classList.remove("showAddSub");
    document.querySelector(".addStn").classList.remove("showAddSub");
    document.querySelector(".sectJuniorHigh").classList.remove("showAddSub");
    document.querySelector(".sectSeniorHigh").classList.remove("showAddSub");
    document.querySelector(".showManSubjh").classList.remove("showAddSub");
    document.querySelector(".showManSubsh").classList.remove("showAddSub");
    document.querySelector(".addSec").classList.remove("showAddSub");
    document.querySelector(".delStudentjh").classList.remove("showAddSub");
    document.querySelector(".delStudentsh").classList.remove("showAddSub");
    document.querySelector(".showTeacherssn").classList.remove("seeStudTbl");
    document.querySelector(".delTeacher").classList.remove("showAddSub");
}
function showTeachertbl(){
    document.querySelector(".showTeacherssn").classList.toggle("seeStudTbl");
    document.querySelector(".showSeniorStud").classList.remove("seeStudTbl");
    document.querySelector(".showJuniorStuds").classList.remove("seeStudTbl");
    document.querySelector(".addSub").classList.remove("showAddSub");
    document.querySelector(".addStn").classList.remove("showAddSub");
    document.querySelector(".sectJuniorHigh").classList.remove("showAddSub");
    document.querySelector(".sectSeniorHigh").classList.remove("showAddSub");
    document.querySelector(".showManSubjh").classList.remove("showAddSub");
    document.querySelector(".showManSubsh").classList.remove("showAddSub");
    document.querySelector(".addSec").classList.remove("showAddSub");
    document.querySelector(".delStudentjh").classList.remove("showAddSub");
    document.querySelector(".delStudentsh").classList.remove("showAddSub");
    document.querySelector(".delTeacher").classList.remove("showAddSub");
}
function addSubSet(type){
    document.querySelector(".addSub").classList.toggle("showAddSub");
    document.querySelector(".showSeniorStud").classList.remove("seeStudTbl");
    document.querySelector(".showJuniorStuds").classList.remove("seeStudTbl");
    document.querySelector(".addStn").classList.remove("showAddSub");
    document.querySelector(".sectJuniorHigh").classList.remove("showAddSub");
    document.querySelector(".sectSeniorHigh").classList.remove("showAddSub");
    document.querySelector(".showManSubjh").classList.remove("showAddSub");
    document.querySelector(".showManSubsh").classList.remove("showAddSub");
    document.querySelector(".addSec").classList.remove("showAddSub");
    document.querySelector(".delStudentjh").classList.remove("showAddSub");
    document.querySelector(".delStudentsh").classList.remove("showAddSub");
    document.querySelector(".showTeacherssn").classList.remove("seeStudTbl");
    document.querySelector(".delTeacher").classList.remove("showAddSub");
    if(type == "Junior High"){
        typeUser = "Junior High";
        document.querySelector(".subAddJunior").classList.add("active");
        document.querySelector(".subAddSenior").classList.remove("active");
    }else if(type == "Senior High"){
        typeUser = "Senior High";
        document.querySelector(".subAddSenior").classList.add("active");
        document.querySelector(".subAddJunior").classList.remove("active");
    }
}
function showDeljhStud(){
    document.querySelector(".delStudentjh").classList.toggle("showAddSub");
    document.querySelector(".delStudentsh").classList.remove("showAddSub");
    document.querySelector(".showManSubjh").classList.remove("showAddSub");
    document.querySelector(".showManSubsh").classList.remove("showAddSub");
    document.querySelector(".addSec").classList.remove("showAddSub");
    document.querySelector(".showSeniorStud").classList.remove("seeStudTbl");
    document.querySelector(".showJuniorStuds").classList.remove("seeStudTbl");
    document.querySelector(".addSub").classList.remove("showAddSub");
    document.querySelector(".addStn").classList.remove("showAddSub");
    document.querySelector(".sectJuniorHigh").classList.remove("showAddSub");
    document.querySelector(".sectSeniorHigh").classList.remove("showAddSub");
    document.querySelector(".delTeacher").classList.remove("showAddSub");
}
function showDelshStud(){
    document.querySelector(".delStudentsh").classList.toggle("showAddSub");
    document.querySelector(".delStudentjh").classList.remove("showAddSub");
    document.querySelector(".showManSubjh").classList.remove("showAddSub");
    document.querySelector(".showManSubsh").classList.remove("showAddSub");
    document.querySelector(".addSec").classList.remove("showAddSub");
    document.querySelector(".showSeniorStud").classList.remove("seeStudTbl");
    document.querySelector(".showJuniorStuds").classList.remove("seeStudTbl");
    document.querySelector(".addSub").classList.remove("showAddSub");
    document.querySelector(".addStn").classList.remove("showAddSub");
    document.querySelector(".sectJuniorHigh").classList.remove("showAddSub");
    document.querySelector(".sectSeniorHigh").classList.remove("showAddSub");
    document.querySelector(".delTeacher").classList.remove("showAddSub");
}
function showDelTeacher(){
    document.querySelector(".delTeacher").classList.toggle("showAddSub");
    document.querySelector(".delStudentsh").classList.remove("showAddSub");
    document.querySelector(".delStudentjh").classList.remove("showAddSub");
    document.querySelector(".showManSubjh").classList.remove("showAddSub");
    document.querySelector(".showManSubsh").classList.remove("showAddSub");
    document.querySelector(".addSec").classList.remove("showAddSub");
    document.querySelector(".showSeniorStud").classList.remove("seeStudTbl");
    document.querySelector(".showJuniorStuds").classList.remove("seeStudTbl");
    document.querySelector(".addSub").classList.remove("showAddSub");
    document.querySelector(".addStn").classList.remove("showAddSub");
    document.querySelector(".sectJuniorHigh").classList.remove("showAddSub");
    document.querySelector(".sectSeniorHigh").classList.remove("showAddSub");
}
function showSAcc(){
    document.querySelector(".studAccInfo").classList.toggle("showStudAccInfo");
    document.querySelector(".sHome").classList.toggle("hideSHome");
    if(typeUser == "Junior High"){
        document.querySelector(".reportGrades_jh").classList.remove("showStable");
    }else if(typeUser == "Senior High"){
        document.querySelector(".reportGrades_sh").classList.remove("showStable")
    }
}
function refreshPage(){
    window.location.reload();
}
var typeUser = "";
function highlightuserType(type){
    document.querySelector(".pickStudent").classList.remove("active");
    document.querySelector(".pickTeacher").classList.remove("active");
    if(type == "Student"){
        document.querySelector(".pickStudent").classList.add("active");
    }else if(type == "Teacher"){
        typeUser = "Teacher";
        document.querySelector(".pickTeacher").classList.add("active");
        document.querySelector(".pickJunior").classList.remove("actives");
        document.querySelector(".pickSenior").classList.remove("actives");
        document.querySelector(".strndss").classList.remove("showHaysst");
        document.querySelector(".grdLvl").classList.remove("showHaysst");
    }
}
function highlightStudType(type) {
    document.querySelector(".pickJunior").classList.remove("actives");
    document.querySelector(".pickSenior").classList.remove("actives");
    if(type == "Junior High"){
        typeUser = "Junior High";
        document.querySelector(".pickStudent").classList.add("active");
        document.querySelector(".pickJunior").classList.add("actives");
        document.querySelector(".pickTeacher").classList.remove("active");
        document.querySelector(".grdLvl").classList.toggle("showHaysst");
        document.querySelector(".strndss").classList.remove("showHaysst");
    }else if(type == "Senior High"){
        typeUser = "Senior High";
        document.querySelector(".pickStudent").classList.add("active");
        document.querySelector(".pickSenior").classList.add("actives");
        document.querySelector(".pickTeacher").classList.remove("active");
        document.querySelector(".strndss").classList.toggle("showHaysst");
        document.querySelector(".grdLvl").classList.remove("showHaysst");
    }
}
function showLogStud(){
    document.querySelector(".logStudType").classList.toggle("showLogStudType");
}
function highlightLogStud(type){
    document.querySelector(".logJunior").classList.remove("activess");
    document.querySelector(".logSenior").classList.remove("activess");
    if(type == "Junior High"){
        typeUser = "Junior High";
        document.querySelector(".logJunior").classList.add("activess");
        document.querySelector(".logSenior").classList.remove("activess");
    }else if(type == "Senior High"){
        typeUser = "Senior High";
        document.querySelector(".logSenior").classList.add("activess");
        document.querySelector(".logJunior").classList.remove("activess");
    }
}
function viewGrades(){
    typeUser = localStorage.getItem("typeUser");
    document.querySelector(".studAccInfo").classList.remove("showStudAccInfo");
    if(typeUser == "Junior High"){
        document.querySelector(".reportGrades_jh").classList.toggle("showStable");
        document.querySelector(".sHome").classList.toggle("hideSHome");
    }else if(typeUser == "Senior High"){
        document.querySelector(".reportGrades_sh").classList.toggle("showStable");
        document.querySelector(".sHome").classList.toggle("hideSHome");
    }
    
}
function delStudjh(){
    const studID = document.getElementById("delJunior").value;
    const body = JSON.stringify({
        studID: studID
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            if(this.responseText == "OK"){
                document.querySelector(".adSuccessPane").classList.toggle("showAdSuccessPane");
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/adfgDashboard");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function delStudsh(){
    const studID = document.getElementById("delSenior").value;
    const body = JSON.stringify({
        studID: studID
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            if(this.responseText == "OK"){
                document.querySelector(".adSuccessPane").classList.toggle("showAdSuccessPane");
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/adfkDashboard");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function delTeache(){
    const teachID = document.getElementById("delTeach").value;
    const body = JSON.stringify({
        teachID: teachID
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            if(this.responseText == "OK"){
                document.querySelector(".adSuccessPane").classList.toggle("showAdSuccessPane");
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/adfjDashboard");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function showSubEnroll() {
    const gradeID = document.getElementById("gradeEnroll").value;

    const body = JSON.stringify({
        gradeID: gradeID
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            document.querySelector(".showGodSub").classList.toggle("showGodssSub");
            document.getElementById("showSubject").innerHTML = this.responseText;
        }
    }
    
    xhr.open("POST", "http://localhost:3000/sdDashboard"); // Changed to POST
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.send(body);
}
function dispStudForm(){
    typeUser = localStorage.getItem("typeUser");
    document.querySelector(".sHome").classList.toggle("hideSHome");
    if(typeUser == "Junior High"){
        document.querySelector(".jhFormDisp").classList.toggle("showPicForm");
    }else if(typeUser == "Senior High"){
        document.querySelector(".shFormDisp").classList.toggle("showPicForm");
    }
}
function saveSec(){
    const sectionID = document.getElementById("secId").value;
    const sectionName = document.getElementById("secName").value;
    const adviser = document.getElementById("secAdviser").value;

    const body = JSON.stringify({
        sectionID: sectionID,
        sectionName: sectionName,
        adviser: adviser
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            if(this.responseText == "OK"){
                document.querySelector(".adSuccessPane").classList.toggle("showAdSuccessPane");
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/adlpDashboard");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function subjhGroupSave(){
    const gradelvl = document.getElementById("gradeMan").value;
    const subjectID = document.getElementById("subjectMan").value;
    
    const body = JSON.stringify({
        gradelvl: gradelvl,
        subjectID: subjectID
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            if(this.responseText == "OK"){
                document.querySelector(".adSuccessPane").classList.toggle("showAdSuccessPane");
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/adldDashboard");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);

}
function subshGroupSave(){
    const strandID = document.getElementById("strandMan").value;
    const subjectID = document.getElementById("subjectMans").value;
    
    const body = JSON.stringify({
        strandID: strandID,
        subjectID: subjectID
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            if(this.responseText == "OK"){
                document.querySelector(".adSuccessPane").classList.toggle("showAdSuccessPane");
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/adlbDashboard");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function sectGroupjhSave(){
    const studentsID = document.getElementById("studGroupSec").value;
    const gradelvl = document.getElementById("gradeGroupSec").value;
    const sectionID = document.getElementById("sectGroupSec").value;

    const body = JSON.stringify({
        studentsID: studentsID,
        gradelvl: gradelvl,
        sectionID: sectionID
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            if(this.responseText == "OK"){
                document.querySelector(".adSuccessPane").classList.toggle("showAdSuccessPane");
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/adlgDashboard");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function sectGroupshSave(){
    const studentsID = document.getElementById("studshGroupSec").value;
    const strandID = document.getElementById("strandGroupSec").value;
    const sectionID = document.getElementById("sectGroupSecsh").value;

    const body = JSON.stringify({
        studentsID: studentsID,
        strandID: strandID,
        sectionID: sectionID
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            if(this.responseText == "OK"){
                document.querySelector(".adSuccessPane").classList.toggle("showAdSuccessPane");
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/adlhDashboard");
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(body);
}

function submit(){
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const gradeLevel = document.getElementById("gradeLevel").value;
    const strand = document.getElementById("strands").value;

    const information = document.getElementById("upload").files[0];
    const urlBlob = URL.createObjectURL(information);

    const img = document.getElementById("tempCanvas");
    const imgContext = img.getContext("2d");
    const imgSrc = new Image();
    imgSrc.src = urlBlob;

    imgSrc.onload = async () => {
        imgContext.drawImage(imgSrc, 0, 0, 370, 500);

        img.toBlob((blob) => {
            console.log(blob)
        });

        const data = img.toDataURL();
        console.log(data)
    
    const body = JSON.stringify({
        typeUser: typeUser,
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password,
        gradeLevel: gradeLevel,
        information: data,
        strand: strand
    });
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            if(this.responseText == "OK"){
                if(typeUser == "Teacher"){
                    window.location.replace("/teacherLogin");
                }else{
                    window.location.replace("/studentLogin");
                }
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/register");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
    }
}
function studentLogIn(){
    const username = document.getElementById("studUsername").value;
    const password = document.getElementById("studPassword").value;
    const body = JSON.stringify({
        typeUser: typeUser,
        username: username,
        password: password
    });

    localStorage.setItem("typeUser",typeUser);
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(this.responseText);
            if(this.responseText == "Error"){
                document.querySelector(".sPaneError").classList.toggle("showSPaneError");
            }else{
                localStorage.setItem("username", this.responseText); // Store nato aron mahi baw'an kinsa ni login
                
                console.log(localStorage.getItem("username")); // kuha sa username
                
                //localStorage.removeItem("username"); // delete sa username inig logout; ibutang sud sa logout nga function
                window.location.replace("/studentDashboard"); // Kadtong naa sa routes gamita
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/studentLogin");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function teacherLogin(){
    const username = document.getElementById("teachUsername").value;
    const password = document.getElementById("teachPassword").value;
    const body = JSON.stringify({
        username: username,
        password: password
    });
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(this.responseText);
            if(this.responseText == "Error"){
                document.querySelector(".tPaneError").classList.toggle("showTPaneError");
            }else{
                localStorage.setItem("username", this.responseText); // Store nato aron mahi baw'an kinsa ni login
                
                console.log(localStorage.getItem("username")); // kuha sa username
                window.location.replace("/teacherDashboard");
                //localStorage.removeItem("username"); // delete sa username inig logout; ibutang sud sa logout nga function
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/teachLogin");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function adminLogin(){
    const username = document.getElementById("adUsername").value;
    const password = document.getElementById("adPassword").value;
    const body = JSON.stringify({
        username: username,
        password: password
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(this.responseText);
            if(this.responseText == "Error"){
                document.querySelector(".aPaneError").classList.toggle("showAPaneError");
            }else{
                window.location.replace("/adminDashboard"); // Kadtong naa sa routes gamita

                localStorage.setItem("username", this.responseText); // Store nato aron mahi baw'an kinsa ni login
                
                console.log(localStorage.getItem("username")); // kuha sa username
                //localStorage.removeItem("username"); // delete sa username inig logout; ibutang sud sa logout nga function
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/adminLogin");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function goEnroll(){
    const gradeID = document.getElementById("gradeEnroll").value;
    const subjectID = document.querySelector(".showGodSub").children;
    let subjId = [];
    for(let i = 0; i < subjectID.length; i++){
        if(subjectID[i].children[0].checked){
            subjId[i] = subjectID[i].children[0].value;
        }
    }
    for(let i = 0; i < subjId.length; i++){
        const body = JSON.stringify({
            gradeID: gradeID,
            subjId: subjId[i]
        }); 
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                console.log(this.responseText);
                if(this.responseText == "OK"){
                    document.querySelector(".studOpSuccess").classList.toggle("showPassCheck");
                }
            }
        }
        
        xhr.open("POST", "http://localhost:3000/stewDashboard");
        xhr.setRequestHeader('content-type', 'application/json');
    
        xhr.send(body);
    }
}
function goEnrollsh(){
    const subjectID = document.querySelector(".showGodSubsh").children;
    let subjId = [];
    for(let i = 0; i < subjectID.length; i++){
        if(subjectID[i].children[0].checked){
            subjId[i] = subjectID[i].children[0].value;
        }
    }
    for(let i = 0; i < subjId.length; i++){
        const body = JSON.stringify({
            subjId: subjId[i]
        }); 
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4 && xhr.status == 200){
                console.log(this.responseText);
                if(this.responseText == "OK"){
                    document.querySelector(".studOpSuccess").classList.toggle("showPassCheck");
                }
            }
        }
        
        xhr.open("POST", "http://localhost:3000/steyDashboard");
        xhr.setRequestHeader('content-type', 'application/json');
    
        xhr.send(body);
    }
}
function studPassChange(){
    typeUser = localStorage.getItem("typeUser");
    const curPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const body = JSON.stringify({
        typeUser: typeUser,
        curPassword: curPassword,
        newPassword: newPassword
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(this.responseText);
            if(this.responseText == "Error"){
                document.querySelector(".curPassError").classList.toggle("showCurPassError");
            }else{
                document.querySelector(".passCheck").classList.toggle("showPassCheck");
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/studDashboard");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function subSave(){
    const subCode = document.getElementById("subjectCode").value;
    const subName = document.getElementById("subjectName").value;
    const subjectshh = document.getElementById("subjectshh").value;
    const teacherID = document.getElementById("teachers").value;
    const body  = JSON.stringify({
        typeUser: typeUser,
        subCode: subCode,
        subName: subName,
        subjectshh: subjectshh,
        teacherID: teacherID
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(this.responseText);
            if(this.responseText == "OK"){
                document.querySelector(".adSuccessPane").classList.toggle("showAdSuccessPane");
            }
        }
    }
    
    xhr.open("POST", "http://localhost:3000/admDashboard");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function strSave(){
    const strCode = document.getElementById("strandCode").value;
    const strName = document.getElementById("strandName").value;
    const body = JSON.stringify({
        strCode: strCode,
        strName: strName
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(this.responseText);
            if(this.responseText == "OK"){
                document.querySelector(".adSuccessPane").classList.toggle("showAdSuccessPane");
            }
            console.log(strCode+" "+strName);
        }
    }
    xhr.open("POST", "http://localhost:3000/amDashboard");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function teaPassChange(){
    const currPass = document.getElementById("tcurPass").value;
    const newPass = document.getElementById("tnewPass").value;
    const body = JSON.stringify({
        currPass: currPass,
        newPass: newPass
    });
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(this.responseText);
            if(this.responseText == "Error"){
                document.querySelector(".tpassError").classList.toggle("showteaSuccess");
            }else{
                document.querySelector(".tpassChanged").classList.toggle("showteaSuccess");
            }
        }
    }
    xhr.open("POST", "http://localhost:3000/teDashboard");
    xhr.setRequestHeader('content-type', 'application/json');

    xhr.send(body);
}
function adminLogout(){
    localStorage.removeItem("username");
    window.location.replace("/adminLogin");
}
function studentLogout(){
    localStorage.removeItem("username");
    window.location.replace("/studentLogin");
}
function teacherLogout(){
    localStorage.removeItem("username");
    window.location.replace("/teacherLogin");
}
console.log(localStorage.getItem("username"));



