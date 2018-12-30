export default function pick(arr, checker) {
    for(let item of arr) {
        if(checker(item)) {
            return item;
        }
    }
    return null;
}