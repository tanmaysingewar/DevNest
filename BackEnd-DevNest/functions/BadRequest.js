exports.BadRequest = (req, res, check) => {

    // check is array of strings which are required fields in request body 
    // check each field in request body

    let error = false;

    for (let i = 0; i < check.length; i++) {
        if (!req.body[check[i]]) {
            res.status(422).json({
                success: false,
                missing : check[i],
                message: "Some fields are missing",
                err: "Bad Request, server understands the content but it was unable to process the contained instructions."
            })
            return true
        }
    }

    return false
}