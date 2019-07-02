const regexPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.{7,})/
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,20})+$/
const regexBirthday = /^(0[1-9]|[12][0-9]|3[01])[\-.](?:(0[1-9]|1[012])[\-.](19|20)[0-9]{2})$/

const ROLE = {
    CUSTOMER: 'ROLE_CUSTOMER',
}

module.exports = {
    regexPassword,
    regexEmail,
    regexBirthday,
    ROLE
}