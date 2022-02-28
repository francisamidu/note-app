//SPDX-License-Identifier:MIT
pragma solidity 0.8.11;

contract Note{
    struct NoteItem{
        uint id;
        string text;
        string createdAt;
        bool deleted;
    }
    struct User{        
        NoteItem[] _notes;
        address _account;
    }

    mapping (address=>User) _users;

    uint _noteCount;

    event NoteCreated(uint id, string text, string createdAt,uint index);

    event NoteUpdated(uint id, string text);

    event NoteDeleted(uint id);

    modifier onlyOwner(){
        require(msg.sender == _users[msg.sender]._account,"Only the owner is authorized to perform this action");
        _;
    }
    constructor(){
        _users[msg.sender]._account = msg.sender;
    }

    function createNote(string memory _text, string memory _createdAt)public onlyOwner() returns(uint id,
        string memory text,
        string memory createdAt,
        bool deleted) {
        require(bytes(_text).length > 0, "Note text is required");
        _noteCount++;
        NoteItem memory noteItem = NoteItem({
            id: _noteCount,
            text: _text,
            createdAt: _createdAt,
            deleted: false
        });
        if(_users[msg.sender]._notes.length < 1){
            _users[msg.sender]._notes[0] = noteItem;
        }else{
            _users[msg.sender]._notes.push(noteItem);
        }
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
        NoteItem memory noteItem = _users[msg.sender]._notes[_id];
        noteItem.text = _text;
        _users[msg.sender]._notes[_id] = noteItem;
        emit NoteUpdated(
            noteItem.id,
            noteItem.text
            );
        return (
            noteItem.id,
            noteItem.text,
            noteItem.createdAt,
            noteItem.deleted
        );
    }

    function removeNote(uint _id) public onlyOwner() {
        NoteItem memory noteItem = _users[msg.sender]._notes[_id];
        noteItem.deleted = true;
        emit NoteDeleted(_id);
    }

    function getNote(uint _id) public view returns(uint id,
        string memory text,
        string memory createdAt,
        bool deleted){
        NoteItem memory noteItem = _users[msg.sender]._notes[_id];
        return (
            noteItem.id,
            noteItem.text,
            noteItem.createdAt,
            noteItem.deleted
        );
    }
    
    function getAllNotes() public view returns(NoteItem[] memory notes){
        return _users[msg.sender]._notes;
    }

    function getNoteCount() public view returns(uint count){
        return _noteCount;
    }
}