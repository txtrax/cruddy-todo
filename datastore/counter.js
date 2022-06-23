//file system module
const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

//create a string representing num, the total length of the string is 5, with leading zeros
const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

//input: callback
//output: integer
const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      //console.log("in read = ", Number(fileData));
      callback(null, Number(fileData));
    }
  });
};

//input: integer, callback
//output: integer sting with padding
const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      //console.log("in write = ", count);
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

//input: callback
//output:
exports.getNextUniqueId = (callback) => {
  //readcounter
    //callback :
  readCounter((err, num) => { //read the current count
    // writeCounter(num + 1, (err, stringNum) => {
    //   callback(null, stringNum);
    // })
    if(err){
      throw("error getting ID");
    } else {
      //success block
      writeCounter(num + 1, (err, stringNum) => {
        if (err) {
          console.log('error padding the number');
        } else {
          //once youre done creating a count
          callback(null, stringNum);
        }
      })
    }
  })
  // counter = counter + 1;
  // return zeroPaddedNumber(counter);
};



// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
//...RFP2205.../datastore/counter.txt
//stream
//00001
//00002
//00003 string
