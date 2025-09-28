import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import hre from "hardhat";

describe("BookDatabase", function () {
  async function deployFixture() {
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const BookDatabase = await hre.ethers.getContractFactory("BookDatabase");
    const bookDatabase = await BookDatabase.deploy();

    return { bookDatabase, owner, otherAccount };
  }

  it("Should count = 0", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(deployFixture);
    const count = await bookDatabase.count();
    expect(count).to.equal(0);
  });
});
