
const jwt = require('jsonwebtoken');
const { BadRequest } = require('../functions/BadRequest');
const { response } = require('../functions/response');
const Faculty = require('../models/faculty');
const Lab = require('../models/lab');
const Practical = require('../models/practical');
const Problem = require('../models/problem');
const Student = require('../models/student');
const { ObjectId } = require('mongodb');

// # Faculty related controllers
// login faculty
exports.loginFaculty = async (req, res) => {
    const { email, password } = req.body

    try {
        if (BadRequest(req, res, ["email", "password"])) {
            return false;
        }

        await Faculty.findOne({ email: email }, 'name email f_id collage_id ency_password salt')
            .then((faculty) => {
                if (!faculty) {
                    return res.status(400).json(response({ success: false, message: "Faculty does not exist" }))
                }

                if (!faculty.authenticate(password)) {
                    return res.status(400).json(response({ success: false, message: "Email and password do not match" }))
                }

                const token = jwt.sign({ _id: faculty._id }, process.env.TOKEN_SEC_FACULTY, { expiresIn: '1d' })

                return res.json(response({
                    success: true,
                    message: "Faculty is logged in successfully",
                    response: {
                        token,
                        faculty: {
                            _id: faculty._id,
                            name: faculty.name,
                            email: faculty.email,
                            collage_id: faculty.collage_id
                        }
                    }
                }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Get faculty by id - R
exports.getFacultyById = async (req, res) => {
    console.log(req.id)
    try {
        Faculty.findById({ _id: req.id }, '-ency_password -salt -labs')
            .then((faculty) => {
                if (!faculty) {
                    return res.status(400).json(response({ success: false, message: "Faculty does not exist" }))
                }

                return res.json(response({ success: true, message: "Faculty is found", response: faculty }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }

}
// Update faculty by id - U
exports.updateFacultyById = async (req, res) => {
    const { f_id } = req.query
    const { name, email, gender, dob, joining_date, department, contact, address } = req.body
    try {
        if (BadRequest(req, res, ["name", "email","gender", "dob", "joining_date", "department", "contact", "address"])) {
            return false;
        }

        if (req.id !== f_id) {
            return res.status(400).json(response({ success: false, message: "You are not authorized to update this faculty" }))
        }

        Faculty.findByIdAndUpdate({ _id: f_id }, {
            name, email, gender, dob, joining_date, department, contact, address
        }, { new: true, projection: '-salt -ency_password' })
            .then((faculty) => {
                if (!faculty) {
                    return res.status(400).json(response({ success: false, message: "Faculty is not updated" }))
                }
                return res.json(response({ success: true, message: "Faculty is updated", response: { _id: faculty._id } }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }
}

// #Lab related controllers
// all Labs with faculties having faculty_id  - R
exports.allLabsWithFaculty = async (req, res) => {

    console.log(req.id)
    try {
        Lab.find({ faculties: { $in: req.id } })
            .populate('faculties', 'name')
            .then((labs) => {
                if (!labs) {
                    return res.status(400).json(response({ success: false, message: "Faculty does not exist" }))
                }

                return res.json(response({ success: true, message: "All labs with faculties", response: labs }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }

}

// #Practical related controllers
//get all practicals of a lab with lab_id - R
exports.allPracticalsOfLab = async (req, res) => {
    const { l_id } = req.query

    try {
        if (l_id === undefined) {
            return res.status(400).json(response({ success: false, message: "Lab does not exist" }))
        }

        Practical.find({ lab_id: l_id })
            .then((practicals) => {
                if (!practicals) {
                    return res.status(400).json(response({ success: false, message: "Lab does not exist" }))
                }

                return res.json(response({ success: true, message: "All practicals of a lab", response: practicals }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

exports.getPracticalById = async (req,res) => {
    const { practical_id } = req.query

    try {
        if (practical_id === undefined ||practical_id === "" ) {
            return res.status(400).json(response({ success: false, message: "Lab does not exist" }))
        }

        Practical.findById({_id : practical_id})
            .then((practicals) => {
                if (!practicals) {
                    return res.status(400).json(response({ success: false, message: "Lab does not exist" }))
                }

                return res.json(response({ success: true, message: "All practicals of a lab", response: practicals }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Crate a practical - C
exports.createPractical = async (req, res) => {
    const { name, dec, lab_id } = req.body

    try {
        if (BadRequest(req, res, ["name", "dec", "lab_id"])) {
            return false;
        }

        const practical = new Practical({
            name,
            dec,
            lab_id
        })

        practical.save()
            .then((practical) => {
                if (!practical) {
                    return res.status(400).json(response({ success: false, message: "Practical is not created" }))
                }

                return res.json(response({ success: true, message: "Practical is created", response: practical }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Edit a practical - U
exports.editPractical = async (req, res) => {
    const { practical_id } = req.query
    const { name, dec } = req.body

    try {
        if (BadRequest(req, res, ["name", "dec"])) {
            return false;
        }

        Practical.findByIdAndUpdate({ _id: practical_id }, {
            name,
            dec
        }, { new: true })
            .then((practical) => {
                if (!practical) {
                    return res.status(400).json(response({ success: false, message: "Practical is not updated" }))
                }

                return res.json(response({ success: true, message: "Practical is updated", response: practical }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })
    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }
}
// Delete a practical - D
exports.deletePractical = async (req, res) => {
    const { practical_id } = req.query

    try {
        if (practical_id === undefined) {
            return res.status(400).json(response({ success: false, message: "You are not authorized to delete this practical" }))
        }

        Practical.findByIdAndDelete({ _id: practical_id })
            .then((practical) => {
                if (!practical) {
                    return res.status(400).json(response({ success: false, message: "Practical is not deleted" }))
                }

                return res.json(response({ success: true, message: "Practical is deleted", response: practical }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
                res.status(400).json(response({ success: false, message: "Not able to delete practical" }))
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// No of Practicals of a lab - R
exports.noOfPracticalsOfLab = async (req, res) => {
    const { l_id } = req.query
    try {
        if (l_id === undefined) {
            return res.status(400).json(response({ success: false, message: "Lab does not exist" }))
        }

        Practical.find({ lab_id: l_id }, '_id')
            .then((practicals) => {
                if (!practicals) {
                    return res.status(400).json(response({ success: false, message: "Lab does not exist" }))
                }

                return res.json(response({ success: true, message: "No of practicals of a lab", response: practicals.length }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

exports.noOfStudentsOfLab = async (req, res) => {
    const { l_id } = req.query

    try {
        if (l_id === undefined) {
            return res.status(400).json(response({ success: false, message: "Lab does not exist" }))
        }

        Lab.findById({ _id: l_id }, '_id year branch sem section')
            .then((lab) => {
                if (!lab) {
                    return res.status(400).json(response({ success: false, message: "Lab does not exist" }))
                }
                Student.find({ currentYear: lab.year, branch: lab.branch, currentSem: lab.sem, section: lab.section }, '_id')
                    .then((students) => {
                        if (!students) {
                            return res.status(400).json(response({ success: false, message: "Lab does not exist" }))
                        }
                        return res.json(response({ success: true, message: "No of students of a lab", response: students.length }))
                    })
                    .catch((err) => {
                        console.log("Late Error : ", err);
                    })


            }
            )

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

// #Problem related Controller
// Create a problem - C
exports.createProblem = async (req, res) => {
    const { practical_id, problem_name, problem_statement, problem_dec, input_format, output_format, example, test_cases } = req.body

    try {
        if (BadRequest(req, res, ["problem_name", "problem_statement", "problem_dec", "input_format", "output_format", "example", "test_cases"])) {
            return false;
        }

        const problem = new Problem({
            practical_id,
            problem_name,
            problem_statement,
            problem_dec,
            input_format,
            output_format,
            example,
            test_cases
        })

        problem.save()
            .then((problem) => {
                if (!problem) {
                    return res.status(400).json(response({ success: false, message: "Problem is not created" }))
                }

                return res.json(response({ success: true, message: "Problem is created", response: problem }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Edit a problem - U
exports.editProblem = async (req, res) => {
    console.log(req.query)
    const { problem_id } = req.query
    const { problem_name, problem_statement, problem_dec, input_format, output_format, example, test_cases } = req.body

    try {
        if (BadRequest(req, res, ["problem_name", "problem_statement", "problem_dec", "input_format", "output_format", "example", "test_cases"])) {
            return false;
        }

        Problem.findByIdAndUpdate({ _id: problem_id }, {
            problem_name,
            problem_statement,
            problem_dec,
            input_format,
            output_format,
            example,
            test_cases
        }, { new: true })
            .then((problem) => {
                if (!problem) {
                    return res.status(400).json(response({ success: false, message: "Problem is not updated" }))
                }

                return res.json(response({ success: true, message: "Problem is updated", response: problem }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }

}
// Delete a problem - D
exports.deleteProblem = async (req, res) => {
    const { problem_id } = req.query

    try {
        if (problem_id === undefined) {
            return res.status(400).json(response({ success: false, message: "Problem does not exist" }))
        }

        Problem.findByIdAndDelete({ _id: problem_id })
            .then((problem) => {
                if (!problem) {
                    return res.status(400).json(response({ success: false, message: "Problem is not deleted" }))
                }

                return res.json(response({ success: true, message: "Problem is deleted", response: problem }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Get problems by id - R
exports.getProblemById = async (req, res) => {
    const { problem_id } = req.query

    try {
        if (problem_id === undefined) {
            return res.status(400).json(response({ success: false, message: "1Problem does not exist" }))
        }

        Problem.findById({ _id: problem_id })
            .then((problem) => {
                if (!problem) {
                    return res.status(400).json(response({ success: false, message: "Problem does not exist" }))
                }

                return res.json(response({ success: true, message: "Problem is found", response: problem }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })
    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Get all problems of a practical - R
exports.getAllProblemsOfPractical = async (req, res) => {
    const { practical_id } = req.query

    try {
        if (practical_id === undefined) {
            return res.status(400).json(response({ success: false, message: "Practical does not exist" }))
        }
        Problem.find({ practical_id }, 'problem_name _id')
            .then((problems) => {
                if (!problems) {
                    return res.status(400).json(response({ success: false, message: "Practical does not exist" }))
                }

                return res.json(response({ success: true, message: "All problems of a practical", response: problems }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

// #Student related Controller
// Get all students - R
exports.getAllStudents = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    try {
        Student.find({}, '-ency_password -salt -labs')
            .limit(limit)
            .skip(skip)
            .then((students) => {
                return res.json(response({ success: true, message: "All students are fetched successfully", response: students }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to get from DB' }))
            });

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Get student by id name email rollNo regNo- R
exports.getStudentByNameOrEmailOrContactOrRegNoOrRollNo = async (req, res) => {
    const search_data = req.query.search;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;

    try {
        if (search_data == undefined) {
            return res.status(400).json(response({ success: false, message: 'Search Data is not given' }))
        }

        // { username : {$regex: search,$options: 'i'}
        Student.find({
            $or: [{ name: { $regex: search_data, $options: 'i' } }, { email: { $regex: search_data, $options: 'i' } }, { contact: { $regex: search_data, $options: 'i' } }, {
                $where:
                    `/^${parseInt(search_data) ? parseInt(search_data) : 0}.*/.test(this.regNo)`
            }, {
                $where:
                    `/^${parseInt(search_data) ? parseInt(search_data) : 0}.*/.test(this.rollNo)`
            }]
        }, '-ency_password -salt -labs')
            .limit(limit)
            .skip(skip)
            .then((faculties) => {
                return res.json(response({ success: true, message: "All faculties are fetched successfully", response: faculties }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to get from DB : err' }))
            });

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

