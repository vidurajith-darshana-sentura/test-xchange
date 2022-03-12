import moment from "moment";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

export const formatDate = (dateString) => {
    if(dateString){
        let date = new Date(dateString);
        return `${MONTHS[date.getMonth()]} ${date.getDate()} ${date.getFullYear()}`
    }
    return "-"
}

export const reduceDate = (dateString, threshold = 15) => {
    if(dateString){
        return moment(dateString).subtract(threshold,"days").format("YYYY-MM-DD")
    }

    return dateString;
}