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

  event Photo_Tipped
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
    // make sure description is not empty
    require(bytes(_description).length > 0);

    // make sure hash isn't empty
    require(bytes(_photo_hash).length > 0);

    // make sure valid uploader exists
    require(msg.sender != address(0x0));
    photo_count++;
    photos[photo_count] = Photo(photo_count, _photo_hash, _description, 0, msg.sender);

    emit Photo_Created(photo_count, _photo_hash, _description, 0, msg.sender);
  }

  // Tip Photos
  function tip_photo_owner(uint _id) public payable // payable allows for exchange of crypto
  {
    require(_id > 0 && _id <= photo_count);

    Photo memory _photo = photos[_id]; // memory = from the blockchain NOT from CPU memory

    address payable _author = _photo.author;

    address(_author).transfer(msg.value); // msg.value = amount of crypto coming in from this function

    // increment the tip amount 
    _photo.tip_amount = _photo.tip_amount + msg.value;

    // update the image
    photos[_id] = _photo; // put image back on the block chain

    // Trigger this event
    emit Photo_Tipped(_id, _photo.hash, _photo.description, _photo.tip_amount, _author);
  }
}