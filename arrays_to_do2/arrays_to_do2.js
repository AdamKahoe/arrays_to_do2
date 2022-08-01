function reverseArray(arr) {
    // Loop through the array - but only halfway (otherwise we unreverse and get the original array back)
    for (var i = 0; i < arr.length / 2; i++) {
        // Swap values
        var temp = arr[i];
        arr[i] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i] = temp;
    }
}

// First version of rotate array - includes option to rotate backwards (negative values) and with improved efficiency
function rotateArr(arr, moveBy) {
    // [1, 2, 3, 4, 5], move to the right by 2
    // [5, 1, 2, 3, 4]
    /*
        Loop through the amount of rotations needed
            To rotate to the right one:
            1. Create a temp variable that holds the last value.
            2. Move all the items in the array to the right one index.  This is a for loop.
            3. Put the temp value at the beginning of the array.

    */

    /* Negative values
    [1, 2, 3, 4, 5], move to the left by 2 -> [3, 4, 5, 1, 2]: temp = 1
    [2, 3, 4, 5, 1]
        Loop through the amount of rotations needed
            To rotate to the left one:
            1. Create a temp variable that holds the first value.
            2. Move all the items in the array to the left one index.  This is a for loop.
            3. Put the temp value at the end of the array.
    */

    // If I rotate an array of 5 items a total of 21 times, it's the same as rotating one time because 21 % 5 = 1

    // Improve efficency to get the actual number of rotations needed
    var actualMovementsNeeded;
    if (moveBy > 0) {
        actualMovementsNeeded = moveBy % arr.length;
    } else {
        actualMovementsNeeded = Math.abs(moveBy) % arr.length;
    }
    if (moveBy > 0) {
        /* Handle rotations to the right */
        // Loop through all the rotations
        for (var i = 0; i < actualMovementsNeeded; i++) {
            // Handle the single rotation
            var temp = arr[arr.length - 1];
            // Loop moves items to the right one index
            for (var k = arr.length - 2; k >= 0; k--) {
                arr[k+1] = arr[k];
            }
            arr[0] = temp; // Put temp value at the beginning of the array
        }
    } else {
        /* Handle rotations to the left */
        for (var i = 0; i < actualMovementsNeeded; i++) {
            var temp = arr[0];
            // Loop moves items to the left one index
            for (var k = 1; k < arr.length; k++) {
                arr[k-1] = arr[k];
                // console.log(arr);
            }
            arr[arr.length - 1] = temp; // Put temp value at end of array
            // console.log("Array after this rotation:",arr);
        }
    }
}

// Second version: reversing portions of arrays
function rotateArrV2(arr, moveBy) {
    reverseArr(arr); // Reverse entire array
    var actualMovementsNeeded;
    if (moveBy > 0) {
        actualMovementsNeeded = moveBy % arr.length;
    } else {
        actualMovementsNeeded = Math.abs(moveBy) % arr.length;
    }
    if (moveBy > 0) {
        reverseArr(arr,0,actualMovementsNeeded - 1);
        reverseArr(arr,actualMovementsNeeded, arr.length - 1);
    } else {
        reverseArr(arr,0,arr.length-actualMovementsNeeded - 1);
        reverseArr(arr, arr.length - actualMovementsNeeded,arr.length - 1);
    }
}

// Helper function to reverse portions of arrays
function reverseArr(arr, startingInd = 0, endingInd = arr.length - 1) {
    var numIterations = 0; // Number of full iterations of the following for loop
    for (var k = startingInd; k < (startingInd+endingInd)/2; k++) {
        var temp = arr[k];
        arr[k] = arr[endingInd - numIterations];
        arr[endingInd - numIterations] = temp;
        numIterations++;
    }
}

// First version with nested for loops
function filterRange(arr, minVal, maxVal) {
    /*
    Loop through the array
    If the value is NOT between min and max:
        then move all values after current index to the left one <-- Loop
        shorten the length of the array
    Else:
        Move on to next index
    */
    for (var i = 0; i < arr.length; i++) {
        // If value is NOT from min to max (inclusively)
        if (arr[i] < minVal || arr[i] > maxVal) {
            // Move everything that comes afterwards left one index
            for (var k = i+1; k < arr.length; k++) {
                arr[k-1] = arr[k];
            }
            arr.length--; // Decrease the length of the array by one
            i--; // To cancel the i++ operation effectively
        }
    }
}

// Second version with only one for loop
function filterRangeV2(arr, minVal, maxVal) {
    var nextInd = 0; // Index where the next array value that's from min to max (inclusively) will go
    // Loop through the array
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] >= minVal && arr[i] <= maxVal) {
            arr[nextInd] = arr[i];
            nextInd++; // Increment index for next valid value found
        }
    }
    arr.length = nextInd; // Chop off excess values
}

// First version
function concatArrays(arr1, arr2) {
    var newArr = [];
    var curInd = 0; // Current index for where we'll put new items
    // Loop through the first array and push those items into the new array
    for (var i = 0; i < arr1.length; i++) {
        // newArr.push(arr1[i]);
        newArr[curInd] = arr1[i];
        curInd++;
    }
    // Loop through the first array and push those items into the new array
    for (var i = 0; i < arr2.length; i++) {
        // newArr.push(arr1[i]);
        newArr[curInd] = arr2[i];
        curInd++;
    }
    return newArr;
}

// Second version - with redundancy removed - using a helper function we define
function concatArraysV2(arr1, arr2) {
    var newArr = [];
    buildFrom(newArr,arr1); // Add values from first array to the new array
    buildFrom(newArr,arr2); // From second array
    return newArr;
}

function buildFrom(arrayToBuild, arrayFrom) {
    var curInd = arrayToBuild.length; // Starting index
    // Loop to add values to new array
    for (var i = 0; i < arrayFrom.length; i++) {
        arrayToBuild[curInd] = arrayFrom[i];
        curInd++;
    }
}