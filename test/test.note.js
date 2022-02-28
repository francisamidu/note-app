const Note = artifacts.require("Note");

contract("deploy", (accounts) => {
  let noteContract = null;
  let index = null;
  before(async () => {
    noteContract = await Note.new();
  });

  it("Should deploy contract successfully", async () => {
    assert.notEqual(noteContract.address, 0x00);
    assert.notEqual(noteContract.address, "");
    assert.notEqual(noteContract.address, undefined);
    assert.notEqual(noteContract.address, null);
  });
  it("Should create a new note", async () => {
    const response = await noteContract.createNote("Learn solidity");
    index = response.logs[0].args.index;
    const count = await noteContract.getNoteCount();
    assert.equal(count, 1);
  });

  it("Should fetch a single note", async () => {
    const note = await noteContract.getNote(index);
    assert.notEqual(note, null);
  });

  it("Should fetch all notes", async () => {
    const allNotes = await noteContract.getAllNotes();
    assert.notEqual(allNotes, null);
  });

  it("Should update a note", async () => {
    const text = "Master solidity";
    const response = await noteContract.updateNote(index, text);
    const updatedNote = response.logs[0].args;
    assert.equal(updatedNote.text, text);
  });

  it("Should delete a note", async () => {
    await noteContract.deleteNote(index);
    const count = await noteContract.getNoteCount();
    assert.equal(count.toString(), "0");
  });
});
