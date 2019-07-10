const EventEmitter = require("events").EventEmitter;
const fs = require("fs");

const findPattern = (files, regex) => {
  const emitter = new EventEmitter();
  files.forEach(file => {
    fs.readFile(file, "utf8", (err, content) => {
      if (err) return emitter.emit("error", err);
      emitter.emit("fileread", file);
      let match;
      if ((match = content.match(regex)))
        match.forEach(elem => emitter.emit("found", file, elem));
    });
  });
  return emitter;
};

const file = "README.md";
const regex = /.*?# Node.*?/;

findPattern([file], regex)
  .on("fileread", file => console.log("file was read: ", file))
  .on("found", (file, match) => console.log("file was found: ", file, match))
  .on("err", err => console.log("error was found: ", err));