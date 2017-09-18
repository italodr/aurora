import React from "react";
import Note from "../aurora-note";
import FeedEditor from "./FeedEditor.js";
import search from "../aurora-search";
import styled from "styled-components";
import { EditorState } from "draft-js";
import { save, loadNotes, deleteNote } from "../aurora-file-io";
import _ from "lodash";

/**
 * Adds a "text" version of the editor state to each note in the notes object
 */
const fromNotesToSearchableObjects = notes => {
  const ids = Object.keys(notes);
  return ids.map(id => {
    return {
      text: notes[id].editorState.getCurrentContent().getPlainText(),
      id: id
    };
  });
};

/**
 * Creates data that we can use for a Note
 * @param {EditorState} editorState
 */
const addNewNoteData = (notes, note) => {
  notes[note.id] = note;
  return notes;
};

const removeNoteData = (notes, id) => {
  delete notes[id];
  return notes;
};

const FlexSeperated = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const NoteWrapper = styled.div`
  width: 100%;
  padding-bottom: 50px;
`;

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shownNotes: {}, // The notes that the user sees
      allNotes: {}, // A local copy of all the notes
      inputEditorState: EditorState.createEmpty()
    };

    this.addCard = this.addCard.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.searchCard = this.searchCard.bind(this);
    this.addSavedNotes = this.addSavedNotes.bind(this);
    this.onDelete = this.onDelete.bind(this);
    loadNotes(this.addSavedNotes);
  }

  addSavedNotes(notes) {
    notes.forEach(note => {
      this.addCard(note);
    });
  }

  addCard(note) {
    // Don't add a note if it doesn't exist. AUR-20
    const text = note.editorState.getCurrentContent().getPlainText();
    if (!text || _.trim(text).length === 0) {
      return;
    }

    this.setState(prevState => {
      prevState.shownNotes = addNewNoteData(prevState.shownNotes, note);
      prevState.allNotes = addNewNoteData(prevState.allNotes, note);
      return prevState;
    });
  }

  onChange(editorState) {
    this.setState({
      inputEditorState: editorState
    });
    this.searchCard(editorState);
  }

  searchCard(editorState) {
    this.setState(prevState => {
      const ids = search(
        fromNotesToSearchableObjects(prevState.allNotes),
        editorState.getCurrentContent().getPlainText()
      );

      const notes = ids.map(id => prevState.allNotes[id]);

      if (notes.length === 0) {
        prevState.shownNotes = Object.assign({}, prevState.allNotes); // makes a copy
        return prevState;
      }
      prevState.shownNotes = Object.assign({}, notes); // makes a copy of notes
      return prevState;
    });
  }

  onDelete(id) {
    deleteNote(id);
    this.setState(prevState => {
      prevState.shownNotes = removeNoteData(prevState.shownNotes, id);
      prevState.allNotes = removeNoteData(prevState.allNotes, id);
      return prevState;
    });
  }

  onSubmit(editorState) {
    // Add a card with a copy of the editor state
    const id = save(editorState);
    this.addCard({
      editorState: editorState,
      id: id
    });

    // Clear the main editor's state
    this.setState({
      inputEditorState: EditorState.createEmpty()
    });
  }

  render() {
    // Create a note for each id
    const ids = Object.keys(this.state.shownNotes);
    const notes = ids.map(id => {
      return (
        <Note
          id={id}
          key={id}
          defaultEditorState={this.state.shownNotes[id].editorState}
          onDelete={this.onDelete}
        />
      );
    });

    return (
      <FlexSeperated className="flex-seperated">
        <NoteWrapper className="note-wrapper">{notes}</NoteWrapper>
        <FeedEditor
          className="card-at-bottom-editor"
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          editorState={this.state.inputEditorState}
          focused
        />
      </FlexSeperated>
    );
  }
}

export default Feed;