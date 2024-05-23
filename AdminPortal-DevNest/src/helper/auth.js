
export const authenticate = async (data)=> {
    console.log("Auth DATA",data)

    if (data.success === false) {
        return false
    }
    if (typeof window === 'undefined') {
        return false
    }
    await localStorage.setItem('auth',JSON.stringify({token : data.response.token, admin : data.response.admin}))
    return true
}


export const isAuthenticated =()=> {
    if (typeof window == 'undefined') {
        return false
    }
    if (localStorage.getItem('auth')) {
        return JSON.parse(localStorage.getItem('auth'))
    }
    return false
}