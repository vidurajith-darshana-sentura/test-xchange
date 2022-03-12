export const REMOVE_DUPLICATE_OBJECT = (arr, key) => {
    let uniq = {}
    let arrFiltered = arr.filter(obj => !uniq[obj[`${key}`]] && (uniq[obj[`${key}`]] = true));
    console.log('arrFiltered', arrFiltered)
    return arrFiltered;
}
