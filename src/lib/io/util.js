import jetpack from "fs-jetpack";
import { NoteModel } from "../note";
import { auroraRootPath } from "../paths";
const os = require("os");

const noteFolder = "notes";
const databaseJSONFile = "database.json";

const noteFile = note => {
  return note.uuid + ".aur";
};

const auroraRootContext = () => {
  return jetpack.dir(os.homedir()).dir(".aurora");
};

const auroraDirContext = () => {
  return auroraRootContext().dir(process.env.NODE_ENV);
};

const configDir = () => {
  return auroraRootContext();
};

const configFilePath = () => {
  return auroraRootPath() + "/" + databaseJSONFile;
};

const dbFilePath = env => {
  return auroraRootPath() + "/" + env + "/" + env + ".db";
};

function executeIfDefined(callback, param) {
  if (callback !== undefined) {
    if (param !== undefined) {
      callback(param);
    } else {
      callback();
    }
  }
}

function saveTo(data, fileName, dirContext) {
  return dirContext.write(fileName, data);
}

function saveToAsync(data, fileName, dirContext, callback, onFailure) {
  dirContext
    .writeAsync(fileName, data)
    .then(() => {
      executeIfDefined(callback);
    })
    .catch(err => {
      onFailure(err);
    });
}

function saveNoteContent(note) {
  note.getContent().then(content => {
    saveToAsync(content, noteFile(note), auroraDirContext().dir(noteFolder));
  });
}

function deleteNoteContent(note) {
  auroraDirContext()
    .dir(noteFolder)
    .remove(noteFile(note));
}

function readFrom(fileName, dirContext) {
  return dirContext.read(fileName);
}

function readFromAsync(fileName, dirContext, callback, onFailure) {
  dirContext
    .readAsync(fileName)
    .then(data => {
      callback(data);
    })
    .catch(err => {
      onFailure(err);
    });
}

function loadNoteContent(note, callback, onFailure) {
  readFromAsync(
    noteFile(note),
    auroraDirContext().dir(noteFolder),
    callback,
    onFailure
  );
}

function deleteFile(fileName, dirContext) {
  return dirContext.remove(fileName);
}

function dbConfigExists() {
  return configDir().exists(databaseJSONFile);
}

function writeDatabaseJSON(data) {
  return saveTo(data, databaseJSONFile, configDir());
}

function throwIfNotNoteModel(note) {
  if (!(note instanceof NoteModel)) {
    throw new Error("Attempted to use something that is not a NoteModel.");
  }
}

function exists(file) {
  return jetpack.exists(file);
}

export {
  auroraDirContext,
  saveTo,
  readFrom,
  deleteFile,
  saveNoteContent,
  loadNoteContent,
  deleteNoteContent,
  saveToAsync,
  readFromAsync,
  executeIfDefined,
  dbConfigExists,
  writeDatabaseJSON,
  dbFilePath,
  configFilePath,
  throwIfNotNoteModel,
  exists,
  auroraRootPath
};
