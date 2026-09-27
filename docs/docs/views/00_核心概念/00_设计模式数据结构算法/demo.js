




const arr = [4,1,6,9,3,2,8,7];

function swap(arr, a, b) {
    const tmp = arr[a];
    arr[a] = arr[b];
    arr[b] = tmp;
}

function quickSort2(arr, begin, end) {
    if (begin >= end - 1) return 
    let left = begin;
    let right = end;
    do {
        do left++; while (left < right && arr[left] < arr[begin]);
        do right--; while (right > left && arr[right] > arr[begin]);
        if (left < right) swap(arr, left, right);
    } while (left < right);
    let swapPoint = left === right ? right - 1 : right;
    swap(arr, begin, swapPoint);
    quickSort2(arr, begin, swapPoint)
    quickSort2(arr, swapPoint + 1, end)
}


function quickSort(arr) {
    quickSort2(arr, 0, arr.length);
}

quickSort(arr);

console.log(arr)
