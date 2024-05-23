const jwt = require('jsonwebtoken');
const Analysis = require('../models/analysis');
const { BadRequest } = require('../functions/BadRequest');
const { response } = require('../functions/response');
const { ObjectId } = require('mongodb');
const Student = require('../models/student');
const Lab = require('../models/lab');
const Practical = require('../models/practical');
const Problem = require('../models/problem');

// #Analysis
// Analysis Status - Total Students | Executions [ SUCCESSFULLY | FAILED | PARTIALLY | NOT EXECUTED ]
exports.analysisStatus = async (req, res) => {
    const { lab_id} = req.query;
    // Find no of students are there who have submitted the practical
   console.log("lab",lab_id)
    try {
        if (lab_id === undefined ) {
            return res.status(400).json(response({ success: false, message: 'Lab id or Practical id is missing' }))
        }
        await Analysis.find({ lab_id}, '_id score status tc_status')
            .then(async (data) => {
                if (data.length === 0) {
                    return res.json(response({ success: false, message: 'No data found',response:data }))
                }
                const totalAttemptedStudents = data.length;
                // Find no of students are there who have successfully executed the practical from data
                // Create and array of all the students who have successfully executed the practical where status is 2
                const successfullyExecuted = data.filter((item) => item.status === 3).length;
                // Find no of students are there who have failed to execute the practical from data status = 0
                const failed = data.filter((item) => item.status === 1).length;
                // Find no of students are there who have partially executed the practical from data status = 1
                const partially = data.filter((item) => item.status === 2).length;
                const terminated = data.filter((item) => item.status === -1).length;
                // send response
                return res.json(response({ success: true, message: "All Analysis fetch successfully ", response: { totalAttemptedStudents, successfullyExecuted, failed, partially, terminated } }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to get from DB' }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to get from DB' }))
            });

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }

}

exports.analysisByPracticalId = async (req, res) => {
    const { lab_id, practical_id } = req.query;
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 500;

    try {
        let toFind = {lab_id, practical_id};
        if (lab_id === undefined ) {
            return res.status(400).json(response({ success: false, message: 'Lab id or Practical id is missing' }))
        }

        if (practical_id === undefined) {
            toFind = { lab_id }
        }

        console.log(toFind)

        await Analysis.find(toFind)
            .populate('s_id', 'name regNo rollNo')
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .then(async (data) => {
                if (data.length === 0) {
                    return res.json(response({ success: true, message: 'No data found',response:data }))
                }
                return res.json(response({ success: true, message: "All Analysis fetch successfully ", response: data }))
            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to get from DB' }))
            })
    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }
}

// Fetch analysis records by User Name or Reg No or Contact no
exports.searchAnalysisOfStudents = async (req, res) => {
    const { lab_id } = req.query;
    const search_data = req.query.search;
    const skip = req.query.skip || 0;
    const limit = req.query.limit || 10;

    console.log(lab_id, search_data, skip, limit)

    try {
        if (lab_id === undefined || search_data === undefined) {
            return res.status(400).json(response({ success: false, message: 'Lab id or Practical id or Search data is missing' }))
        }

        await Student.find({
            $or: [{ name: { $regex: search_data, $options: 'i' } }, { email: { $regex: search_data, $options: 'i' } }, { contact: { $regex: search_data, $options: 'i' } }, {
                $where:
                    `/^${parseInt(search_data) ? parseInt(search_data) : 0}.*/.test(this.regNo)`
            }, {
                $where:
                    `/^${parseInt(search_data) ? parseInt(search_data) : 0}.*/.test(this.rollNo)`
            }]
        }, '_id')
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .then(async (data) => {
                console.log(data)
                if (data.length === 0) {
                    return res.json(response({ success: true, message: 'No data found', response: data}))
                }
                const student_ids = data.map((item) => item._id);
                console.log(student_ids)

                await Analysis.find({ lab_id, s_id: { $in: student_ids } })
                    .populate('s_id', 'name regNo rollNo')
                    .skip(parseInt(skip))
                    .limit(parseInt(limit))
                    .then(async (data) => {
                        if (data.length === 0) {
                            return res.json(response({ success: true, message: 'No data found', response: data }))
                        }
                        return res.json(response({ success: true, message: "All Analysis fetch successfully ", response: data }))
                    })
                    .catch(function (err) {
                        console.log(err);
                        return res.status(400).json(response({ success: false, message: 'Not able to get from DB' }))
                    })

            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}
// #Data
// Get Practical List and Problem List by lab id from LAB
exports.practicalListByLabId = async (req, res) => {
    const { lab_id } = req.query;

    try {
        if (lab_id === undefined) {
            return res.status(400).json(response({ success: false, message: 'Lab id is missing' }))
        }
        await Practical.find({ lab_id }, '_id name')
            .then(async (practicals) => {
                if (practicals.length === 0) {
                    return res.status(400).json(response({ success: false, message: 'No data found' }))
                }
                return res.json(response({ success: true, message: "All Practical fetch successfully ", response: practicals }))

            })
            .catch(function (err) {
                console.log(err);
                return res.status(400).json(response({ success: false, message: 'Not able to get from DB' }))
            })

    } catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }


}

exports.resetPractical = async (req,res) => {
    const record_id = req.query.record_id

    try{
        if (record_id === undefined) {
            return res.status(400).json(response({ success: false, message: "Record Id not provided"}))
        }
    
        Analysis.findByIdAndDelete({_id : record_id})
        .then((record) => {
            if (!record) {
                return res.status(400).json(response({ success: false, message: "Record is not deleted" }))
            }
    
            return res.json(response({ success: true, message: "Record is deleted"}))
        })
        .catch((err) => {
            console.log("Late Error : ", err);
        })
    }
    catch (err) {
        return res.status(400).json(response({ success: false, message: 'Not workout with request', response: err }))
    }
}


