const PhotoChain = artifacts.require('./PhotoChain.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('PhotoChain', ([deployer, author, tipper]) => {
  let photochain

  before(async () => {
    photochain = await PhotoChain.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await PhotoChain.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await photochain.name()
      assert.equal(name, 'PhotoChain')
    })
  })

  describe('photos', async () => {
    let result, photo_count
    const hash = '123abc'
    // const hash = 'QmV8cfu6n4NT5xRr2AHdKxFMTZEJrA44qgrBCr739BN9Wb'

    before(async () => {
      result = await photochain.upload_photo(hash, 'Test photo description', { from: author })
      photo_count = await photochain.photo_count()
    })

    //check event
    it('creates photos', async () => {
      // SUCCESS
      assert.equal(photo_count, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), photo_count.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.description, 'Test photo description', 'description is correct')
      assert.equal(event.tip_amount, '0', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')


      // FAILURE: photo must have hash
      await photochain.upload_photo('', 'Photo description', { from: author }).should.be.rejected;

      // FAILURE: photo must have description
      await photochain.upload_photo('Photo hash', '', { from: author }).should.be.rejected;
    })

    //check from Struct
    it('lists photos', async () => {
      const photo = await photochain.photos(photo_count)
      assert.equal(photo.id.toNumber(), photo_count.toNumber(), 'id is correct')
      assert.equal(photo.hash, hash, 'Hash is correct')
      assert.equal(photo.description, 'Test photo description', 'description is correct')
      assert.equal(photo.tip_amount, '0', 'tip amount is correct')
      assert.equal(photo.author, author, 'author is correct')
    })

    it('allows users to tip photos', async () => {
      // Track the author balance before purchase
      let oldAuthorBalance
      oldAuthorBalance = await web3.eth.getBalance(author)
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

      result = await photochain.tip_photo_owner(photo_count, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

      // SUCCESS
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), photo_count.toNumber(), 'id is correct')
      assert.equal(event.hash, hash, 'Hash is correct')
      assert.equal(event.description, 'Test photo description', 'description is correct')
      assert.equal(event.tip_amount, '1000000000000000000', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')

      // Check that author received funds
      let newAuthorBalance
      newAuthorBalance = await web3.eth.getBalance(author)
      newAuthorBalance = new web3.utils.BN(newAuthorBalance)

      let tipImageOwner
      tipImageOwner = web3.utils.toWei('1', 'Ether')
      tipImageOwner = new web3.utils.BN(tipImageOwner)

      const expectedBalance = oldAuthorBalance.add(tipImageOwner)

      assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

      // FAILURE: Tries to tip a image that does not exist
      await photochain.tip_photo_owner(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
    })
  })
})