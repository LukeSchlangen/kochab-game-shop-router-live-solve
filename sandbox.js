// SANDBOX
// Used to test our function

function isClearance(cost) {
    if(cost - Math.floor(cost) === 0) {
        return true;
    } else {
        return false;
    }
}

console.log(isClearance(19.00));
console.log(isClearance(19.99));