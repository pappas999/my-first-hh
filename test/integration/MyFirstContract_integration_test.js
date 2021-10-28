const { expect } = require('chai');

var chai = require('chai');
const BN = require('bn.js');
chai.use(require('chai-bn')(BN));


describe('MyFirstContract Integration Test', function () {
    before(async function () {


      MyFirstContract = await ethers.getContractFactory('MyFirstContract');
      myFirstContract = await MyFirstContract.deploy('0x9326BFA02ADD2366b30bacB125260Af641031331');
      await myFirstContract.deployed();
    });

    it('Price feed value greater than 0', async function () {
      let result = await myFirstContract.getLatestPrice()
      console.log('price:' + new ethers.BigNumber.from(result._hex).toString())
      expect((new ethers.BigNumber.from(result._hex).toString())).to.be.a.bignumber.that.is.greaterThan(new ethers.BigNumber.from('0').toString())
    });


  });