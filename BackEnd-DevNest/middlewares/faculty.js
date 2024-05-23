const jwt = require('jsonwebtoken'); //setting jwt token 

exports.checkFacultyToken = (req,res,next) => {
    if(!req.headers.authorization){
        return res.status(401).json({
            success : false,
            error : 'no token provided'
        })
    }

    const headerToken = req.headers.authorization.split(" ")
    
    if(!headerToken[1]){
        return res.status(401).json({
            success : false,
            error : 'unAuthorized request'
        })
    }else{
        try{
            const token =  headerToken[1]
            var decoded = jwt.verify(token, process.env.TOKEN_SEC_FACULTY)
            req.id = decoded._id
            next()
        }
        catch(err){
            return res.status(401).json({
                success : false,
                error : 'unAuthorized request'
            })
        }
        
    }
}