export default class Utils{
    formatDate(date) {
        var newDate = new Date(date),
            day = newDate.getDate().toString().padStart(2, '0'),
            month = (newDate.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            year = newDate.getFullYear();
        return `${day}/${month}/${year}`
    }

    formatDateTime(date) {
        var newDate = new Date(date),
            hours = newDate.getHours().toString().padStart(2, '0'),
            minutes = newDate.getMinutes().toString().padStart(2, '0'),
            seconds = newDate.getSeconds().toString().padStart(2, '0'),
            day = newDate.getDate().toString().padStart(2, '0'),
            month = (newDate.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
            year = newDate.getFullYear();
        return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
    }
}