import { NoteModel, Tag } from "../note";
import { serializeContent, EDITOR_NAME } from "../editor";
import { contentFromText } from "./editor-util.js";

const newNote = (text, tags = []) => {
  const content = contentFromText(text);
  const tagObjects = tags.map(tag => {
    return new Tag(tag);
  });
  return new NoteModel(serializeContent(content), EDITOR_NAME, tagObjects);
};

export { newNote };
