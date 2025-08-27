const myArray = [1,2,3,4,5];

export function mapMethod(req, res) {
    let result = myArray.map(item => item * 2);
    res.json(result);
}

export function filterMethod(req, res) {
    let result = myArray.filter(item => item % 2 === 0);
    res.json(result);
}

export function findMethod(req, res) {
    let result = myArray.find(item => item > 4);
    res.json(result);
}

export function someMethod(req, res) {
    /* 
        - if at LEAST ONE element in the array passes a condition.
        - the result is boolean.
    */
    let result = myArray.some(item => item % 2 === 0);
    res.json(result);
}

export function everyMethod(req, res) {
    /* 
        - if ALL element in the array match a condition.
        - the result is boolean.
    */
    let result = myArray.every(item => item % 2 === 0);
    res.json(result);
}

export function reduceMethod(req, res) {
    /* 
        - combine all elements into a single value
        - It works step by step, carrying forward a running total (or result).
        - It's commonly used for sums, averages or totals
    */
    let result = myArray.reduce((acc, num)=> acc + num, 0);
    res.json(result);
}