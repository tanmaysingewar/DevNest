const express = require('express')
const { demo, createAdmin, loginAdmin, getAllLabs, createLab, updateLab, deleteLab, getLabById, createFaculty, updateFaculty, deleteFaculty, getAllFaculties, getFacultyByNameOrEmailOrContact, updateStudent, deleteStudent, getStudentByNameOrEmailOrContactOrRegNoOrRollNo, getAllStudents, noOfPracticalsOfLab, noOfStudentsOfLab } = require('../controllers/admin')
const { checkAdminToken } = require('../middlewares/admin')
const { analysisStatus, analysisByPracticalId, searchAnalysisOfStudents, practicalListByLabId, resetPractical } = require('../controllers/analysis')
const router = express.Router()

// Admin auth routes
router.post('/login',loginAdmin)
router.post('/create',createAdmin)

// #Lab routes - [All tested]
// Create lab
router.post('/create/lab',checkAdminToken,createLab)
// Update lab
router.patch('/update/lab',checkAdminToken,updateLab)
// Delete lab
router.delete('/delete/lab',checkAdminToken,deleteLab)
// Get lab by id
router.get('/get/lab',checkAdminToken,getLabById)
// Get all lab 
router.get('/all/labs',checkAdminToken,getAllLabs)
// 
router.get('/count/practicals',checkAdminToken,noOfPracticalsOfLab)
// 
router.get('/count/students',checkAdminToken,noOfStudentsOfLab)


// #Faculty routes - [All tested]
// Create faculty
router.post('/create/faculty',checkAdminToken,createFaculty)
// Update faculty
router.patch('/update/faculty',checkAdminToken,updateFaculty)
// Delete faculty
router.delete('/delete/faculty',checkAdminToken,deleteFaculty)
// Get faculty by id name or email
router.get('/get/faculty',checkAdminToken,getFacultyByNameOrEmailOrContact)
// Get all faculty
router.get('/all/faculty',checkAdminToken,getAllFaculties)


// #Student routes - [All tested]
// Update student
router.patch('/update/student',checkAdminToken,updateStudent)
// Get student by id name or email
router.get('/search/student',checkAdminToken,getStudentByNameOrEmailOrContactOrRegNoOrRollNo)
// Get all student
router.get('/all/student',checkAdminToken,getAllStudents)
// Delete student
router.delete('/delete/student',checkAdminToken,deleteStudent)

// #Analysis routes - !Not tested yet
// Get analysis status by lab id and practical id
router.get('/analysis/status',checkAdminToken,analysisStatus)
// get analysis by practical id
router.get('/analysis/practical',checkAdminToken,analysisByPracticalId)
// Search analysis of Students
router.get('/analysis/search',checkAdminToken,searchAnalysisOfStudents)
// get practical list by lab id
router.get('/practical/list',checkAdminToken,practicalListByLabId)
//delete record
router.delete('/reset/record',checkAdminToken,resetPractical)


module.exports = router;