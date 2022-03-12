export const validateEmailAddress = (email) =>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return true;
    }
    return false;
}

export const validatePassword = (password) =>{
    if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(password)) {
        return true;
    }
    return false;
}

export const validateMobileNumber = (mobileNumber) => {
    if (/^\d{10}$/.test(mobileNumber)) {
        return true;
    }
    return false;
}
