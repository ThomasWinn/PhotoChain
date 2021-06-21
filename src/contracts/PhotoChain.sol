pragma solidity ^0.5.0;

contract PhotoChain {

  // Code goes here...
  string public name = "PhotoChain";

  // Store Photos
  uint public photo_count = 0;
  mapping(uint => Photo) public photos;

  struct Photo 
  {
    uint id;
    string hash;
    string description;
    uint tip_amount;
    address payable author;
  }

  event Photo_Created 
  (
    uint id,
    string hash,
    string description,
    uint tip_amount,
    address payable author
  );



  // Create Photos
  function upload_photo(string memory _photo_hash, string memory _description) public 
  {
    photo_count++;
    photos[photo_count] = Photo(photo_count, _photo_hash, _description, 0, msg.sender);

    emit Photo_Created(photo_count, _photo_hash, _description, 0, msg.sender);
  }

  // Tip Photos
}