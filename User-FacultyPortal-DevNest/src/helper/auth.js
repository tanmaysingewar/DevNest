
export const authenticate = async (data)=> {
    console.log("Auth DATA",data)

    if (data.success === false) {
        return false
    }
    if (typeof window === 'undefined') {
        return false
    }

    if(data.student){
        await localStorage.setItem('student_auth',JSON.stringify(data))
        return true
    }

    if(data.faculty){
        await localStorage.setItem('faculty_auth',JSON.stringify(data))
        return true
    }
    return false
}


export const isAuthenticated =()=> {
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('faculty_auth')) {
        return JSON.parse(localStorage.getItem('faculty_auth'))
    }
    if (localStorage.getItem('student_auth')) {
        return JSON.parse(localStorage.getItem('student_auth'))
    }
    return false
}