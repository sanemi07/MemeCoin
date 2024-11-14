const { expect } = require("chai");
const { ethers } = require("hardhat");

let mytoken;
let accounts;

beforeEach(async () => {
    mytoken = await ethers.deployContract("HeraPheriCoin");
    accounts = await ethers.getSigners();
});

describe("Deployment", async () => {
    it("name and Symbol should be same", async () => {
        const name = await mytoken.name();
        const symbol = await mytoken.symbol();

        expect(name).to.equal("HeraPheriCoin");
        expect(symbol).to.equal("HRC");
    });

    it("total supply check", async () => {
        const totalsupply = await mytoken.totalSupply();
        expect(totalsupply).to.equal(ethers.parseEther("7000000000"));
    });

    it("balance of owner", async () => {
        const balance = await mytoken.balanceOf(accounts[0]);
        expect(balance).to.equal(ethers.parseEther("7000000000"));
    });
});

describe("minting and approval", async () => {
    it("minting", async () => {
        const transferAmount = ethers.parseEther("1000000000");
        await mytoken.transfer(accounts[1], transferAmount);

        const senderBalance = await mytoken.balanceOf(accounts[0]);
        const receiverBalance = await mytoken.balanceOf(accounts[1]);

        expect(senderBalance).to.equal(ethers.parseEther("6000000000"));
        expect(receiverBalance).to.equal(ethers.parseEther("1000000000"));
    });
    it("allowance to sender by owner", async () => {
        const owner = accounts[0];
        const spender = accounts[2];
        const approveAmount = ethers.parseEther("1000000000");
    
        
        await mytoken.approve(spender,approveAmount);
    
       
        const approval = await mytoken.allowance(owner.address, spender.address);
        expect(approval).to.equal(approveAmount);
    });
    
    
});
describe("buytoken and withdraw",async()=>{
    it("should allow buyer to buy tokens", async () => {
        const [owner, , , buyer] = accounts; // Destructure accounts to get buyer and owner
        const amount = ethers.parseEther("1000000000"); // Amount to be transferred (in wei)
    
        // First, owner approves buyer to spend 'amount' of tokens
        await mytoken.connect(owner).approve(buyer, amount);
    
        // Now, buyer can transfer tokens from the owner's balance
        await mytoken.connect(buyer).transferFrom(owner, buyer, amount);
    
        // Check buyer's balance
        const buyerBalance = await mytoken.balanceOf(buyer);
        expect(buyerBalance).to.equal(amount);
    });
    

});
