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
    await noteContract.createNote("Learn solidity", new Date().toDateString());
    index = 1;
    const count = await noteContract.getNoteCount();
    assert.equal(count.toString(), "1");
  });

  it("Should fetch a single note", async () => {
    const note = await noteContract.getNote(index - 1);
    assert.notEqual(note["text"], "Learn Solidity");
  });

  it("Should fetch all notes", async () => {
    const allNotes = await noteContract.getAllNotes();
    assert.notEqual(allNotes.length, 0);
  });

  it("Should update a note", async () => {
    const text = "Master solidity";
    const response = await noteContract.updateNote(index - 1, text);
    const updatedNote = response.logs[0].args;
    assert.equal(updatedNote.text, text);
  });

  it("Should delete a note", async () => {
    await noteContract.removeNote(index - 1);
    const allNotes = await noteContract.getAllNotes();
    const count = allNotes.filter((note) => note["deleted"] == true).length;
    assert.equal(count, 1);
  });
});
