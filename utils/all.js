function getCurrentDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Janvier est 0
    const year = today.getFullYear();

    return day + '/' + month + '/' + year;
}

function debounce(func, wait) {
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function createDateFromString(dateString) {
    var parts = dateString.split("/");

    var formattedDate = parts[2] + "-" + parts[1] + "-" + parts[0];

    return new Date(formattedDate);
}

function isWeekend() {
    const today = new Date().getDay();
    if (today === 0 || today === 6) {
        return true;
    }
    return false;
}

export default { getCurrentDate, debounce, createDateFromString, isWeekend }; 