const jwt = require('jsonwebtoken');
const Lab = require('../models/lab');
const Student = require('../models/student');
const { BadRequest } = require('../functions/BadRequest');
const { response } = require('../functions/response');
const Practical = require('../models/practical');
const Problem = require('../models/problem');
const Analysis = require('../models/analysis');

// #Student related controllers
// Create account student
exports.createAccount = async (req, res) => {
    const { name, email, gender, dob, currentYear, currentSem, branch, section, rollNo, regNo, contact, address, password,collage_code } = req.body;
    try {
        if (BadRequest(req, res, ["name", "email", "gender", "dob", "currentYear", "currentSem", "branch", "section","collage_code", "rollNo", "regNo", "contact", "address", "password"])) {
            return false;
        }
        if (!email.includes("@")) {
            return res.status(400).json(response({ success: false, message: 'Email is not valid' }))
        }
        // Check if email already exists
        const emailExist = await Student.findOne({ email: email });

        if (emailExist) {
            return res.status(400).json(response({ success: false, message: 'Email already exists' }))
        }

        // find labs which have same branch, year, sem, section
        const labsArray = await Lab.find({ branch: branch, year: currentYear, sem: currentSem, section: section }, { _id: 1 });

        const labs = labsArray.map((lab) => {
            return {
                l_id: lab._id
            }
        })

        const student = new Student({
            name, email, gender, dob, currentYear, currentSem, branch, section, rollNo, regNo, contact, address, password, labs,collage_code
        });

        // Send Otp to student by email by node mailer
        // const mail = await sendOTP(email);

        student.save()
            .then(function (models) {
                console.log(models);
                return res.json(response({ success: true, message: "Student is created successfully", response: { name: models.name, email: models.email } }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to save in DB' }))
            });

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Student login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        if (BadRequest(req, res, ["email", "password"])) {
            return false;
        }

        // Check if email exists
        await Student.findOne({ email: email })
            .then((student) => {
                if (!student) {
                    return res.status(400).json(response({ success: false, message: "Student does not exist" }))
                }

                if (!student.authenticate(password)) {
                    return res.status(400).json(response({ success: false, message: "Email and password do not match" }))
                }

                // token expires in 1 day
                const token = jwt.sign({ _id: student._id }, process.env.TOKEN_SEC_STUDENT, { expiresIn: "1d" })

                return res.json(response({
                    success: true,
                    message: "student is logged in successfully",
                    response: {
                        token,
                        student: {
                            _id: student._id,
                            name: student.name,
                            email: student.email,
                            collage_id: student.collage_id,
                            branch: student.branch,
                            sem: student.currentSem,
                            section: student.section,
                            year: student.currentYear,
                        }
                    }
                }))
            })
            .catch((err) => {
                console.log("Late Error : ", err)
            })
    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Get students by s_id
exports.getStudentsByID = async (req, res) => {

    try {
        console.log(req.id)

        await Student.findById({ _id: req.id }, '-ency_password -salt')
            .then((students) => {
                if (!students) {
                    return res.status(400).json(response({ success: false, message: "No students found" }))
                }
                return res.json(response({ success: true, message: "Students found", response: students }))
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Update student by s_id
exports.updateStudentById = async (req, res) => {
    const { name, email, gender, dob, currentYear, currentSem, branch, rollNo, regNo, contact, address,collage_code,section
    } = req.body; // labs is an array of lab ids

    try {
        if (BadRequest(req, res, ["name", "email", "gender", "dob", "currentYear", "currentSem","collage_code","branch", "rollNo", "regNo", "contact", "address","section"])) {
            return false;
        }

        Student.findByIdAndUpdate({ _id: req.id }, { 
            name, email, gender, dob, currentYear, currentSem, branch, rollNo, regNo, contact, address , collage_code,section

        }, { new: true }, '-ency_password -salt -labs')
            .then((student) => {
                return res.json(response({ success: true, message: "Student is updated successfully", response: student }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to update in DB' }))
            });

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

// #Lab related controllers
// Get all labs where lab has same branch, sem, section, year 
exports.getLabs = async (req, res) => {
    const { branch, sem, section, year } = req.body;
    console.log(req.body)

    try {
        if (BadRequest(req, res, ["branch", "sem", "section", "year"])) {
            return false;
        }

        await Lab.find({ branch: { $in: branch }, sem: { $in: sem }, section: { $in: section }, year: { $in: year } })
        .populate('faculties', 'name email')
            .then((labs) => {
                if (!labs) {
                    return res.status(400).json(response({ success: false, message: "No labs found" }))
                }

                return res.json(response({ success: true, message: "Labs found", response: labs }))
            })
            .catch((err) => {
                console.log("Late Error : ", err)
                return res.status(400).json(response({ success: false, message: "No labs found" }))
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

// #Practical related controllers
// Get all Practical by lab id
exports.getPracticals = async (req, res) => {
    const { lab_id } = req.query;

    try {
        if (lab_id === undefined) {
            return res.status(400).json(response({ success: false, message: "lab_id is required" }))
        }

        await Practical.find({ lab_id: lab_id })
            .then((practicals) => {
                if (!practicals) {
                    return res.status(400).json(response({ success: false, message: "No practicals found" }))
                }
                return res.json(response({ success: true, message: "Practicals found", response: practicals }))
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

// #Problem related controllers
// Get all Problems by practical_id from Problem table and select only one problem randomly and send response
exports.getProblem = async (req, res) => {
    const { practical_id } = req.query;

    try {
        if (practical_id === undefined) {
            return res.json(response({ success: false, message: "practical_id is required" }))
        }

        await Problem.find({ practical_id: practical_id })
            .then((problems) => {
                if (!problems) {
                    return res.json({ success: true ,isEmpty : true, message: "No problems found 1" })
                }
                if (problems.length === 0) {
                    return res.json({ success: true ,isEmpty : true, message: "No problems found 1" })
                }
                const randomProblem = Math.floor(Math.random() * problems.length);
                return res.json(response({ success: true, message: "Problem found", response: problems[randomProblem] }))
            })
    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

// #Analysis related controllers
// Get progress and score by lab_id
exports.getLabStats = async (req, res) => {
    const { lab_id } = req.query;

    try {
        if (lab_id === undefined) {
            return res.status(400).json(response({ success: false, message: "lab_id is required" }))
        }

        await Practical.find({ lab_id })
            .then(async (practicals) => {
                if (!practicals) {
                    return res.status(400).json(response({ success: false, message: "No labs found" }))
                }

                const totalPracticals = practicals.length;

                // find all analysis by lab_id and s_id and status = 3
                await Analysis.find({ lab_id: lab_id, status: 3, s_id: req.id })
                    .then((analysis) => {
                        console.log(analysis)
                        const totalAnalysis = analysis.length;
                        const progress = (totalAnalysis / totalPracticals) * 100;
                        const score = analysis.reduce((a, b) => a + (b.score || 0), 0);

                        return res.json(response({ success: true, message: "Analysis found", response: { progress: progress, score: score } }))
                    })
                    .catch((err) => {
                        console.log("Late Error : ", err)
                    })
            })
            .catch((err) => {
                console.log("Late Error : ", err)
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

exports.createAnalysis = async (req, res) => {
    const {  lab_id, practical_id, problem_id, status } = req.body;
    console.log(req.body)

    try {
        if (BadRequest(req, res, ["lab_id", "practical_id", "problem_id"])) {
            return false;
        }

        // chaeck if analysis already exists
        const analysisExist = await Analysis.findOne({ s_id: req.id, lab_id, practical_id, problem_id });

        console.log(analysisExist)

        if (analysisExist) {
            return res.json(response({ success: true,exist : true, message: 'Analysis already exists', response: analysisExist }))
        }

        const analysis = new Analysis({
            s_id: req.id, lab_id, practical_id, problem_id, status : -1, 
            date : Date.now(),
            time : Date.now(),
            attemptTime : Date.now(),
        });

        console.log("New",analysis)

        analysis.save()
            .then(function (models) {
                console.log(models);
                return res.json(response({ success: true, message: "Analysis is created successfully", response: models, exist : false }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to save in DB' }))
            });

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

exports.checkAnalysisStatus = async (req, res) => {
    const { lab_id, practical_id, problem_id } = req.body;

    try {
        if (BadRequest(req, res, ["lab_id", "practical_id", "problem_id"])) {
            return false;
        }

        await Analysis.findOne({ s_id: req.id, lab_id, practical_id, problem_id }, '_id status attemptTime')
            .then((analysis) => {
                if (!analysis) {
                    return res.json(response({ success: true, message: "Analysis not found", response: { status: -1 } }))
                }
                return res.json(response({ success: true, message: "Analysis found", response: analysis }))
            })
            .catch((err) => {
                console.log("Late Error : ", err)
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }

}