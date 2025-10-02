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

  it("Should add book", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(deployFixture);
    await bookDatabase.registerBook({ title: 'Livro 1', year: 2026})
    const count = await bookDatabase.count();
    expect(count).to.equal(1);
  });

  it("Should edit book", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(deployFixture);
    await bookDatabase.registerBook({ title: 'Livro 1', year: 2026})
    await bookDatabase.editBook(1, { title: 'Livro 2', year: 2026 })
    
    const book =  await bookDatabase.books(1)
    expect(book.title).to.equal('Livro 2');
  });

  it("Should remove book", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(deployFixture);
    await bookDatabase.registerBook({ title: 'Livro 1', year: 2026})
    await bookDatabase.removeBook(1)
    
    const count =  await bookDatabase.count()
    expect(count).to.equal(0);
  });

  it("Should NOT remove book", async function () {
    const { bookDatabase, owner, otherAccount } = await loadFixture(deployFixture);
    const instance = bookDatabase.connect(otherAccount)

    await bookDatabase.registerBook({ title: 'Livro 1', year: 2026 })
    await expect(instance.removeBook(1)).to.be.revertedWith("You don't have permission.");
  });
});
