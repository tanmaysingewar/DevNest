
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Lab = require('../models/lab');
const Faculty = require('../models/faculty');
const Student = require('../models/student');
const { BadRequest } = require('../functions/BadRequest');
const { response } = require('../functions/response');
const { ObjectId } = require('mongodb');
const Practical = require('../models/practical');


// #Admin related functions
exports.createAdmin = (req, res) => {
    const { name, email, password, collage_code } = req.body;

    try {
        if (BadRequest(req, res, ["name", "email", "password", "collage_code"])) {
            return false;
        }

        if (!email.includes("@")) {
            return res.status(400).json(response({ success: false, message: 'Email is not valid' }))
        }

        const admin = new Admin({
            name,
            email,
            collage_code,
            password // Hashing will be handled by mongoose in modals --- check modals to see Hashing method !!
        });

        admin.save()
            .then(function (models) {
                if (!models) {
                    return res.status(400).json(response({ success: false, message: 'Not able to save in DB' }))
                }

                return res.json(response({ success: true, message: "Admin is created successfully", response: { name: models.name, email: models.email } }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to save in DB' }))
            });

    }
    catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }



}
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

    try {
        if (BadRequest(req, res, ["email", "password"])) {
            return false;
        }

        await Admin.findOne({ email: email }, 'name email collage_code ency_password')
            .then((admin) => {
                if (!admin) {
                    return res.status(400).json(response({ success: false, message: "Admin does not exist" }))
                }

                if (!admin.authenticate(password)) {
                    return res.status(400).json(response({ success: false, message: "Email and password do not match" }))
                }

                const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SEC_ADMIN, { expiresIn: '1d' })

                return res.json(response({
                    success: true,
                    message: "admin is logged in successfully",
                    response: {
                        token,
                        admin: {
                            name: admin.name,
                            email: admin.email,
                            collage_code: admin.collage_code,
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

// #Lab related functions
// Get all labs - R
exports.getAllLabs = async (req, res) => {
    try {
        Lab.find({})
            .populate("faculties", 'name email')
            .then((labs) => {
                if (!labs) {
                    return res.status(400).json(response({ success: false, message: "Labs are not found" }))
                }
                return res.json(response({ success: true, message: "All labs are fetched successfully", response: labs }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to get from DB' }))
            });
    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }
}
// Get a lab by id - R
exports.getLabById = async (req, res) => {
    const l_id = req.query.l_id;

    try {

        Lab.findById({ _id: l_id })
            .populate("faculties", 'name email')
            .then((lab) => {
                if (!lab) {
                    return res.status(400).json(response({ success: false, message: "Lab is not found" }))
                }
                return res.json(response({ success: true, message: "Lab is fetched successfully", response: lab }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to get from DB' }))
            });
    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }

}
// Create a lab - C
exports.createLab = async (req, res) => {
    const { id, name, description, year, branch, semester, section, faculty, collage_code } = req.body; // faculties is an array of faculty ids

    try {
        if (BadRequest(req, res, ["id", "name", "description", "year", "branch", "semester", "section", "faculty", "collage_code"])) {
            return false;
        }
        else {
            const lab = new Lab({
                l_id: id,
                name,
                dec: description,
                year,
                branch,
                sem: semester,
                section,
                collage_code,
                faculties: [faculty]
            })

            lab.save()
                .then((lab) => {
                    if (!lab) {
                        return res.status(400).json(response({ success: false, message: 'Not able to save in DB' }))
                    } else {
                        return res.json(response({ success: true, message: "Lab is created successfully", response: lab }))
                    }
                })
                .catch(function (err) {
                    console.log(err);
                    return res.status(400).json(response({ success: false, message: 'Not able to save in DB' }))
                });
        }

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }

}
// Update a lab - U
exports.updateLab = async (req, res) => {
    const _id = req.query.l_id;
    const { name, description, year, branch, semester, section, faculty } = req.body; // faculties is an array of faculty ids


    try {
        if (BadRequest(req, res, ["name", "description", "year", "branch", "semester", "section", "faculty"])) {
            return false;
        }
        try {
            // return the updated lab
            Lab.findOneAndUpdate({ _id }, {
                name,
                dec: description,
                year,
                branch,
                sem: semester,
                section,
                faculties: [faculty]
            }, { new: true })
                .then((lab) => {
                    if (!lab) {
                        return res.status(400).json(response({ success: false, message: "Lab is not found" }))
                    }
                    return res.json(response({ success: true, message: "Lab is updated successfully", response: lab }))
                })
                .catch(function (err) {
                    console.log(err);
                    return res.status(400).json(response({ success: false, message: 'Not able to update in DB' }))
                });
        }
        catch (err) {
            console.log(err);
            return res.status(400).json(response({ success: false, message: 'Not able to update in DB' }))
        }

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }

}
// Delete a lab - D
exports.deleteLab = async (req, res) => {
    const { l_id } = req.query;

    console.log(l_id)

    try {
        if (l_id === undefined) {
            return res.status(400).json(response({ success: false, message: "Lab does not exist" }))
        }

        Lab.findOneAndDelete({ _id: l_id })
            .then((lab) => {
                if (!lab) {
                    return res.status(400).json(response({ success: false, message: "Lab is not found" }))
                }
                return res.json(response({ success: true, message: "Lab is deleted successfully", response: lab }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to delete in DB' }))
            });

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// no of practical in lab
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

                console.log(practicals)

                return res.json(response({ success: true, message: "No of practicals of a lab", response: practicals.length }))
            })
            .catch((err) => {
                console.log("Late Error : ", err);
            })
    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// no of students in lab
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


            })
    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

// #Faculty related functions
// Create a faculty - C
exports.createFaculty = async (req, res) => {
    const { f_id, name, email, password, collage_code } = req.body; // labs is an array of lab ids

    try {
        if (BadRequest(req, res, ["f_id", "name", "email", "password", "collage_code"])) {
            return false;
        }

        if (!email.includes("@")) {
            return res.status(400).json(response({ success: false, message: 'Email is not valid' }))
        }

        const faculty = new Faculty({
            f_id,
            name,
            email,
            collage_code,
            password
        })

        faculty.save()
            .then((faculty) => {
                // Todo : Send email to the faculty with password
                return res.json(response({ success: true, message: "Faculty is created successfully", response: faculty }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to save in DB' }))
            });
    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Get all faculties - R
exports.getAllFaculties = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const skip = parseInt(req.query.skip) || 0;

    try {
        Faculty.find({}, '-ency_password -salt -labs')
            .limit(limit)
            .skip(skip)
            .then((faculties) => {
                return res.json(response({ success: true, message: "All faculties are fetched successfully", response: faculties }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to get from DB' }))
            });

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Delete a faculty - D
exports.deleteFaculty = async (req, res) => {
    const _id = req.query.id;

    try {
        if (_id === "") {
            return res.status(400).json(response({ success: false, message: "Faculty is not found" }))
        }
        Faculty.findByIdAndDelete({ _id },)
            .then((faculty) => {
                if (!faculty) {
                    return res.status(400).json(response({ success: false, message: "Faculty is not found" }))
                }
                return res.json(response({ success: true, message: "Faculty is deleted successfully", response: faculty }))
            })
    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Update a faculty - U
exports.updateFaculty = async (req, res) => {
    // all parameters from faculty model can be updated
    const _id = req.query.id;

    const { f_id, name, email, gender, dob, joining_date, department, collage_id, contact, address } = req.body; // labs is an array of lab ids

    try {

        if ((BadRequest(req, res, ["f_id", "name", "email", "gender", "dob", "joining_date", "department", "collage_id", "contact", "address"]))) {
            return false;
        }

        Faculty.findByIdAndUpdate({ _id }, { f_id, name, email, gender, dob, joining_date, department, collage_id, contact, address }, { new: true }, '-ency_password -salt -labs')
            .then((faculty) => {
                if (!faculty) {
                    return res.status(400).json(response({ success: false, message: "Faculty is not found" }))
                }

                return res.json(response({ success: true, message: "Faculty is updated successfully", response: faculty }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to update in DB', response: err }))
            });

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Get faculty by name or email or contact - R
exports.getFacultyByNameOrEmailOrContact = async (req, res) => {
    const search_data = req.query.search;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 5;
    console.log(search_data)

    try {
        if (search_data == "") {
            return res.status(400).json(response({ success: false, message: 'Not able to get from DB' }))
        }

        // { username : {$regex: search,$options: 'i'}
        Faculty.find({ $or: [{ f_id: { $regex: search_data, $options: 'i' } }, { name: { $regex: search_data, $options: 'i' } }, { email: { $regex: search_data, $options: 'i' } }, { contact: { $regex: search_data, $options: 'i' } }] }, '-ency_password -salt -labs')
            .limit(limit)
            .skip(skip)
            .then((faculties) => {
                return res.json(response({ success: true, message: "All faculties are fetched successfully", response: faculties }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to get from DB' }))
            });

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

// #Student related functions
// !Create a student - C - Not allowed to create student from admin panel
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
// Delete a student - D
exports.deleteStudent = async (req, res) => {
    const s_id = req.query.s_id;
    try {
        if (s_id === "") {
            return res.status(400).json(response({ success: false, message: 'Not able to get from DB' }))
        }

        Student.findOneAndDelete({ _id: s_id })
            .then((student) => {
                return res.json(response({ success: true, message: "Student is deleted successfully", response: student }))
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// Update a student - U
exports.updateStudent = async (req, res) => {
    const _id = req.query.s_id;

    const { name, email, gender, dob, currentYear, currentSem, branch, rollNo, regNo, contact, address } = req.body; // labs is an array of lab ids

    try {
        if (BadRequest(req, res, ["name", "email", "gender", "dob", "currentYear", "currentSem", "branch", "rollNo", "regNo", "contact", "address"])) {
            return false;
        }

        Student.findByIdAndUpdate({ _id }, { name, email, gender, dob, currentYear, currentSem, branch, rollNo, regNo, contact, address }, { new: true }, '-ency_password -salt -labs')
            .then((student) => {
                if (!student) {
                    return res.status(400).json(response({ success: false, message: "Student is not found" }))
                }
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
// Get student by name or email or contact or regNo or rollNo  - R
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