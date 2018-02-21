# Note
This component includes the note data model. The data model is useful for storing notes, loading from files, and interacting with notes in the user interface.

## Note Model
Notes are just json objects. They have these main keys:
- `id`: auto-incremented id
- `uuid`: a uuid
- `created_at`: when note was created. Should be unix timestamp?
- `updated_at`: when note was last updated
- `tags`: an array of tag objects. Tags have a single string.
- `content`: content of a note. Should be serialized, ready for storage in a database.
- `mutationName`: This is the name of the mutation that serializes the content.

## To use:
To instantiate a note:
```
new NoteModel(content: Object, mutationName: string, tags: [Tags], options: Object): NoteModel
```
Where `options` could contain a value for the keys `id` and `date`. If not included, then they will take on default timestamp values. `content` should be serialized already and ready for storage in a database.

To instantiate a tag:
```
new Tag(value: string): Tag
```

Some helpful functions to work with notes:
```
addTag(tag)

removeTag(tagID)

setContent(Object) : Object

getContent(callback) // callback takes in a content object
```

## Changes
If this note model is insufficient in some way, please make a pull request and we'll see if your new changes work!
