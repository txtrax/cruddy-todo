const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

// var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////
/*
  generate an ID (with getNextUniqueId)
  create a file with the path: __dir + data + id + .txt
  write the text into the file
*/
exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err) {
      console.log('id was not generated');
    } else {
      fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
        if (err) {
          callback(err);
        } else {
          callback(null, {id, text});
        }
      })
    }
  })
  // var id = counter.getNextUniqueId();
  // items[id] = text;
  // callback(null, { id, text });
};

/*
  temp []
  look into the datastore/data folder, to read all the filename
    update the temp[]
      {id: id, text: id}
*/
exports.readAll = (callback) => {
  // invoke a method
    // handle success
    // handle error
  // fs.readdir(exports.dataDir)
  //   .then(fileNames => {
  //     var toDoList = _.map(fileNames, (fileName) => {
  //       var id = fileName.substring(0, fileName.length - 4);
  //       return {id: id, text: id};
  //     })
  //     return toDoList;
  //   })
  //   .catch(err => {
  //     throw("Error");
  //   });
  fs.readdir(exports.dataDir, (err, fileNames) => {
    //files = array of names
    //console.log(files);
    if (err) {
      callback("Error reading the directory");
    } else {
      var toDoList = _.map(fileNames, (fileName) => {
        //substring the filename to only get the id
        //create and object {id: id , text: id}
        //push the object into our toDoList[]
        var id = fileName.substring(0, fileName.length - 4);
        //console.log(id);
        return {id: id, text: id};
      })
      callback(err, toDoList);
    }
  })
  // var data = _.map(items, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, data);
};

/*
  look into the data dir
    if the filename matches the id
      text = read that file
      return {id: id, text: text};
*/
exports.readOne = (id, callback) => {
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), (err, text) => {
    if (err) {
      console.log('error with reading the file');
      callback(err);
    } else {
      text = text.toString();
      callback(null, {id, text});
    }
  })
  // var text = items[id];
  // if (!text) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback(null, { id, text });
  // }
};

/*
  go directly into the file
  use a editting method to rewrite the file
  pass updated info back into the callback
*/
exports.update = (id, text, callback) => {
  fs.readFile(path.join(exports.dataDir, `${id}.txt`), (err) => {
    if (err) {
      callback("error with reading file");
    } else {
      fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
        if (err) {
          callback("error with writing file");
        } else {
          //callback(err, {id: id, text: text})
          callback(err, {id, text})
        }
      })
    }
  })
  // var item = items[id];
  // if (!item) {
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   items[id] = text;
  //   callback(null, { id, text });
  // }
};

/*
    delete the file which filename matches the id
      pass err to cb if fail
      pass null to cb if success
*/
exports.delete = (id, callback) => {
  fs.unlink(path.join(exports.dataDir, `${id}.txt`), (err) => {
    if (err) {
      callback(err);
    } else {
      callback(null);
    }
  })
  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
