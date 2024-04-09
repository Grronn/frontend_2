function task1(arr) {
    return sortNumberArray(arr)
}
function sortNumberArray(arr) {
    arr.sort((a, b) => a - b);
    return arr;
}
