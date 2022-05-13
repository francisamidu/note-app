//SPDX-License-Identifier:MIT
pragma solidity 0.8.11;

contract Note{
    struct NoteItem{
        address owner;
        uint id;
        string text;
        string createdAt;
        bool deleted;
        bool pinned;
    }

    mapping(address=>NoteItem) public _notes;

    uint256 public _noteCount;

    event NoteCreated(uint id, string text, string createdAt,uint index);

    event NoteUpdated(uint id, string text, string createdAt,bool deleted);

    event NotePinned(uint id, bool pinned);

    event NoteDeleted(uint id);

    function createNote(string memory _text, string memory _createdAt)public {
        require(bytes(_text).length > 0, "Note text is required");
        NoteItem memory noteItem = NoteItem({
            id: _noteCount + 1,
            text: _text,
            createdAt: _createdAt,
            deleted: false,
            pinned: false,
            owner: msg.sender
        });     
        _notes[msg.sender] = noteItem;
        _noteCount++;   
        emit NoteCreated(noteItem.id, noteItem.text, noteItem.createdAt, _noteCount - 1);       
    }

    function updateNote(uint _id, string memory _text) public {        
        NoteItem memory noteItem = _notes[_id];
        noteItem.text = _text;
        _notes[_id] = noteItem;
        emit NoteUpdated(
            noteItem.id,
            noteItem.text,
            noteItem.createdAt,
            noteItem.deleted
            );        
    }

    function removeNote(uint _id) public {
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