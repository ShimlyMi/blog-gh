/** 递归深拷贝 */
export function deepClone(source) {
    if (!source && typeof source !== "object") {
        throw new Error("error arguments", "deepClone");
    }
    const targetObj = source.constructor === Array ? [] : {};
    Object.keys(source).forEach((keys) => {
        if (source[keys] && typeof source[keys] === "object") {
            targetObj[keys] = deepClone(source[keys]);
        } else {
            targetObj[keys] = source[keys];
        }
    });
    return targetObj;
}

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
