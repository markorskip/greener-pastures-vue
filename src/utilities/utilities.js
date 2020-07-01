export const thousandsSeparators = num => {
    if (num == null) return 0;
    let numParts = num.toString().split('.');
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return "$" + numParts[0];
};

