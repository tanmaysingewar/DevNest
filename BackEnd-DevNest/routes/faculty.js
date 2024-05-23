const express = require('express');
const { checkFacultyToken } = require('../middlewares/faculty');
const { loginFaculty, getFacultyById, updateFacultyById, allLabsWithFaculty, allPracticalsOfLab, createPractical, editPractical, deletePractical, noOfPracticalsOfLab, createProblem, editProblem, deleteProblem, getProblemById, getAllProblemsOfPractical, getAllStudents, getStudentByNameOrEmailOrContactOrRegNoOrRollNo, noOfStudentsOfLab, getPracticalById } = require('../controllers/faculty');
const { analysisStatus, analysisByPracticalId, searchAnalysisOfStudents, practicalListByLabId, resetPractical } = require('../controllers/analysis')
const router = express.Router()

// #Faculty related routes - [All tested]
// Login
router.post('/login',loginFaculty)
// get faculty details by id
router.get('/profile',checkFacultyToken,getFacultyById)
// update Faculty details
router.patch('/update/faculty',checkFacultyToken,updateFacultyById)

// #lab related routes - [All tested]
// all labs details by faculty id
router.get('/get/labs',checkFacultyToken,allLabsWithFaculty)


// #practical related routes - [All tested]
// Create Practical
router.post('/create/practical',checkFacultyToken,createPractical)
// all practicals details by lab id
router.get('/get/all/practicals',checkFacultyToken,allPracticalsOfLab)
// get practical by id
router.get('/get/practical',checkFacultyToken,getPracticalById)
// edit practical details by practical id
router.patch('/update/practical',checkFacultyToken,editPractical)
// delete practical details by practical id
router.delete('/delete/practical',checkFacultyToken,deletePractical)
// Count of practicals by lab id
router.get('/count/practicals',checkFacultyToken,noOfPracticalsOfLab)
// Count of students by lab id
router.get('/count/students',checkFacultyToken,noOfStudentsOfLab)

// #Problem related routes - [All tested]
// Create Problem
router.post('/create/problem',checkFacultyToken,createProblem)
// Get problem details by problem id
router.get('/get/problem',checkFacultyToken,getProblemById)
// all problems details by practical id
router.get('/get/all/problem',checkFacultyToken,getAllProblemsOfPractical)
// edit problem details by problem id
router.patch('/update/problem',checkFacultyToken,editProblem)
// delete problem details by problem id
router.delete('/delete/problem',checkFacultyToken,deleteProblem)


// #Student related routes - [All tested]
// all students details 
router.get('/all/student',checkFacultyToken,getAllStudents)
// get students by name email contact rollNo reg No 
router.get('/search/student',checkFacultyToken,getStudentByNameOrEmailOrContactOrRegNoOrRollNo)


// #Analysis routes 
// Get analysis status by lab id and practical id
router.get('/analysis/status',checkFacultyToken,analysisStatus)
// get analysis by practical id
router.get('/analysis/practical',checkFacultyToken,analysisByPracticalId)
// Search analysis of Students
router.get('/analysis/search',checkFacultyToken,searchAnalysisOfStudents)
// get practical list by lab id
router.get('/practical/list',checkFacultyToken,practicalListByLabId)
// delete the record
router.delete('/reset/record',checkFacultyToken,resetPractical)


module.exports = router;