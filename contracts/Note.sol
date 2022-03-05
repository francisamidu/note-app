//SPDX-License-Identifier:MIT
pragma solidity 0.8.11;

contract Note{
    struct NoteItem{
        uint id;
        string text;
        string createdAt;
        bool deleted;
        bool pinned;
    }

    address _owner;  

    NoteItem[] _notes;

    uint _noteCount;

    event NoteCreated(uint id, string text, string createdAt,uint index);

    event NoteUpdated(uint id, string text, string createdAt,bool deleted);

    event NotePinned(uint id, bool pinned);

    event NoteDeleted(uint id);

    modifier onlyOwner(){
        require(msg.sender == _owner,"Only the owner is authorized to perform this action");
        _;
    }
    constructor(){
        _owner = msg.sender;
    }

    function createNote(string memory _text, string memory _createdAt)public onlyOwner() returns(uint id,
        string memory text,
        string memory createdAt,
        bool deleted) {
        require(bytes(_text).length > 0, "Note text is required");
        NoteItem memory noteItem = NoteItem({
            id: _noteCount + 1,
            text: _text,
            createdAt: _createdAt,
            deleted: false,
            pinned: false
        });     
        _notes.push(noteItem);
        _noteCount++;   
        emit NoteCreated(noteItem.id, noteItem.text, noteItem.createdAt, _noteCount - 1);
        return (
            noteItem.id,
            noteItem.text,
            noteItem.createdAt,
            noteItem.deleted            
        );
    }

    function updateNote(uint _id, string memory _text) public onlyOwner() returns(uint id,
        string memory text,
        string memory createdAt,
        bool deleted) {        
        NoteItem memory noteItem = _notes[_id];
        noteItem.text = _text;
        _notes[_id] = noteItem;
        emit NoteUpdated(
            noteItem.id,
            noteItem.text,
            noteItem.createdAt,
            noteItem.deleted
            );
        return (
            noteItem.id,
            noteItem.text,
            noteItem.createdAt,
            noteItem.deleted
        );
    }

    function removeNote(uint _id) public onlyOwner() {
        NoteItem memory noteItem = _notes[_id];
        noteItem.deleted = true;
        _notes[_id] = noteItem;
        emit NoteDeleted(_id);
    }

    function getNote(uint _id) public view returns(uint id,
        string memory text,
        string memory createdAt,
        bool deleted){
        NoteItem memory noteItem = _notes[_id];
        return (
            noteItem.id,
            noteItem.text,
            noteItem.createdAt,
            noteItem.deleted
        );
    }
    
    function getAllNotes() public view returns(NoteItem[] memory notes){
        return _notes;
    }

    function getNoteCount() public view returns(uint count){
        return _noteCount;
    }

    function pinNote(uint _id,bool _pinned) public  {
        NoteItem memory noteItem = _notes[_id];
        noteItem.pinned = _pinned;
        _notes[_id] = noteItem;     
        emit NotePinned(_id,noteItem.pinned);  
    }
}