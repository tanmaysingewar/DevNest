const jwt = require('jsonwebtoken'); //setting jwt token 


exports.checkAdminToken = (req,res,next) => {

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
            var decoded = jwt.verify(token, process.env.TOKEN_SEC_ADMIN)
            console.log(decoded)
            req.id = decoded.data
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