const express = require('express');
const { checkUserToken } = require('../middlewares/student');
const { createAccount, login, getLabs, getLabStats, getPracticals, getProblem, getStudentsByID, updateStudentById,createAnalysis, checkAnalysisStatus } = require('../controllers/student');
const router = express.Router()

// #Student related routes
// Create Account
router.post('/create',createAccount)
// login Account 
router.post('/login',login)
// Get students by s_id
router.get('/profile',checkUserToken,getStudentsByID)
// Update student by s_id
router.patch('/update/profile',checkUserToken,updateStudentById)

// #lab related routes
// Get labs
router.post('/labs',checkUserToken,getLabs)

// #Practical related routes
// Get all practicals by lab_id
router.get('/all/practicals',checkUserToken,getPracticals)

// #Problem related routes
// Get problems by practical_id
router.get('/problem',checkUserToken,getProblem)


// #Analysis related routes
// Create Analysis
router.post('/create/analysis',checkUserToken,createAnalysis)
// Get Analysis Status
router.post('/analysis/status',checkUserToken,checkAnalysisStatus)

// Get analysis
router.get('/lab/analysis',checkUserToken,getLabStats)


module.exports = router;
