import misaEnum from './misaEnum'
import resources from './resource'
export default {
    /*format ngày tháng
     *author: Đức(08/02/2022)
     */
    formatDate(dateStr, type = 1, delimiter = "/") {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const y = date.getFullYear().toString();
        const m = (date.getMonth() + 1).toString().padStart(2, "0");
        const d = date.getDate().toString().padStart(2, "0");
        if (type == 1) {
            return `${d}${delimiter}${m}${delimiter}${y}`;
        }
        return `${y}${delimiter}${m}${delimiter}${d}`;
    },
    convertDate(dateString) {
        if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateString)) {
            const date = dateString.split('/');
            return `${date[2]}-${date[1]}-${date[0]}`;
        }
        return dateString;
    },

    /*format giới tính từ int sang string
     *author: Đức(08/02/2022)
     */
    formatGender(gender) {
        if (gender == misaEnum.enumGender.female) return resources.resource.VN.femaleGender;
        return gender == misaEnum.enumGender.male ? resources.resource.VN.maleGender : resources.resource.VN.othersGender;
    },

    /*fornat lại giới tính từ string sang int
     *author: Đức(08/02/2022)
     */
    convertGender(gender) {
        if (gender == resources.resource.VN.femaleGender) return misaEnum.enumGender.female;
        return gender == resources.resource.VN.maleGender ? misaEnum.enumGender.male : misaEnum.enumGender.others;
    },

    /*fornat string
     *author: Đức(08/02/2022)
     */
    formatString(str, ...args) {
        return str.replace(/{(\d+)}/g, (match, index) =>
            typeof args[index] != "undefined" ? args[index] : match
        );
    }
};