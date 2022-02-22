/*validate employeeCode
 *author: Đức(08/02/2022)
 */
const isEmployeeCode = (value) => {
    return /^NV-\d{4,6}$/.test(value) ? true : false;
};

/*validate các trường bắt buộc
 *author: Đức(08/02/2022)
 */
const isRequired = (value) => {
    if (value) return true;
    return false;
};

/*validate email
 *author: Đức(08/02/2022)
 */
const isEmail = (value) => {
    if (!value) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : false;
};

/*validate phoneNumber
 *author: Đức(08/02/2022)
 */
const isPhoneNumber = (value) => {
    if (!value) return true;
    return /^\d+$/.test(value) ? true : false;
};

/*validate datetime
 *author: Đức(08/02/2022)
 */
const isDateLessThan = (value, cmpVal) => {
    if (!value || isNaN(Date.parse(value))) return true;
    return Date.parse(value) < cmpVal ? true : false;
};

/*validate number
 *author: Đức(08/02/2022)
 */
const isNumber = (value) => {
    if (!value) return true;
    return /^\d+$/.test(value) ? true : false;
};
export { isRequired, isEmail, isPhoneNumber, isDateLessThan, isNumber, isEmployeeCode };