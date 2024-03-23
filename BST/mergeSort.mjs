export default function mergeSort(arr) {
  let copy = arr.slice();
  return sliceArr(copy, 0, copy.length - 1);
}

function sliceArr(arr, start, end) {
  if (start < end) {
    let mid = Math.floor((start + end) / 2);
    sliceArr(arr, start, mid);
    sliceArr(arr, mid + 1, end);
    if (arr.length - 1 === end && start === 0) {
      return merge(arr, start, mid + 1, end);
    }
    merge(arr, start, mid + 1, end);
  }
  return;
}

function merge(arr, start, mid, end) {
  let s = start;
  let m = mid;
  let sorted = [];
  for (let i = start; i <= end; i++) {
    if ((arr[s] > arr[m] || s >= mid) && m <= end) {
      sorted.push(arr[m]);
      m++;
      continue;
    }
    sorted.push(arr[s]);
    s++;
  }
  arr.splice(start, sorted.length, ...sorted);
  return arr;
}

let arr = [99, 2, 1, 55, 34, 2, 3, 6, 4, 3, 8, 6, 554, 10, 3, 1, 22, 4, 3];
let sortedArr = mergeSort(arr, 0, arr.length - 1);
