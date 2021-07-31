class ExpressError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
        console.error(this.stack);
    }
}

function validateArray(nums) {
    let valid = true;

    for(num in nums){
        if(isNaN(parseFloat(num))){
            valid = false;
        }
    }
    return valid;
}

function median(nums){
    const arr = nums.split(',');

    for(let count = 0; count < arr.length; count++){
        arr[count] = parseFloat(arr[count]);
    }

    arr.sort(function(a, b){return a - b});
    const length = arr.length;
    if(length % 2 == 1){
        const a = length / 2 - 0.5;
        const b = a + 1;
        return (arr[a] + arr[b]) / 2;
    }
    return arr[length / 2];
}

function mode(nums){
    const arr = nums.split(',');

    for(let count = 0; count < arr.length; count++){
        arr[count] = parseFloat(arr[count]);
    }

    let highestNumber = 0;
    let highestFrequency = 0;

    for(let count = 0; count < arr.length; count++){
        let frequency = 0;
        const number = arr[count];
        for(let fCount = 0; fCount < arr.length; fCount++){
            const comp = arr[fCount];
            if(number == comp){
                frequency++;
            }
        }
        if(frequency > highestFrequency){
            highestFrequency = frequency;
            highestNumber = number;
        }
    }

    return highestNumber;
}

function mean(nums){
    const arr = nums.split(',');

    for(let count = 0; count < arr.length; count++){
        arr[count] = parseFloat(arr[count]);
    }

    let sum = 0;
    for(num of arr){
        sum += num;
    }

    const avg = sum / arr.length;
    return avg;
}

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/',function(req,res){
    return res.send('homepage');
});

app.get('/median', function(req, res) {
    if (!req.query.nums) {
        throw new ExpressError('require a set of numbers', 400);
    }
    const nums = req.query.nums;
    if(!validateArray(nums)){
        throw new ExpressError('you must enter valid numbers',400);
    }

    const r = median(nums);
    let json = {
        operation: "median",
        result: r
    };
    return res.send(json);
});

app.get('/mean', function(req, res) {
    if (!req.query.nums) {
        throw new ExpressError('require a set of numbers', 400);
    }
    const nums = req.query.nums;
    if(!validateArray(nums)){
        throw new ExpressError('you must enter valid numbers',400);
    }

    const r = mean(nums);

    console.log('mean',r);

    let json = {
        operation: "mean",
        result: r
    };
    return res.send(json);
});

app.get('/mode', function(req, res) {
    if (!req.query.nums) {
        throw new ExpressError('require a set of numbers', 400);
    }
    const nums = req.query.nums;
    if(!validateArray(nums)){
        throw new ExpressError('you must enter valid numbers',400);
    }

    const r = mode(nums);
    let json = {
        operation: "mode",
        result: r
    };
    return res.send(json);
});

app.listen(3000, function(){
  console.log('App on port 3000');
}); 
