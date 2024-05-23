
exports.response = ({success, message,response}) => {
    if(response){
        return {
            success : success,
            message : message,
            response : response
        }
    }
    return {
        success : success,
        message : message,
    }
}