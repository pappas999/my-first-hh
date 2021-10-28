const { expect } = require('chai');

var chai = require('chai');
const BN = require('bn.js');
chai.use(require('chai-bn')(BN));

const DECIMALS='18'
const INITIAL_PRICE='200000000000000000000'

describe('MyFirstContract Unit Test', function () {
    before(async function () {
     MockV3Aggregator = await ethers.getContractFactory('MockV3Aggregator');
     mockV3Aggregator = await MockV3Aggregator.deploy(DECIMALS,INITIAL_PRICE);
     await mockV3Aggregator.deployed();

      MyFirstContract = await ethers.getContractFactory('MyFirstContract');
      myFirstContract = await MyFirstContract.deploy(mockV3Aggregator.address);
      await myFirstContract.deployed();
    });

    beforeEach(async function () {
        await myFirstContract.setNumber(0);
    });

    it('Initial value is set to 0', async function () {
        expect((await myFirstContract.getNumber()).toString()).to.equal('0');
      });


    it('retrieve returns a value previously stored', async function () {
      await myFirstContract.setNumber(77);
      expect((await myFirstContract.getNumber()).toString()).to.equal('77');
    });

    it('gets a price feed value', async function () {
        let result = await myFirstContract.getLatestPrice();
        console.log('price:' + new ethers.BigNumber.from(result._hex).toString())
        expect((new ethers.BigNumber.from(result._hex).toString())).equals(INITIAL_PRICE).toString()
      });


  });