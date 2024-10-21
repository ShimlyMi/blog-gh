export function numberFormat(number: any) {
    if (!number) return 0;
    number = typeof number == "number" ? number : parseFloat(number);
    let res: any;
    if (number >= 10000) {
        res = (number / 10000).toFixed(1) + "w";
    } else if (number >= 1000) {
        res = (number / 1000).toFixed(1) + "k";
    } else {
        res = number;
    }
    return res;
}
