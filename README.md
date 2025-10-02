# Book Database Smart Contract

A decentralized book database built on Ethereum using Solidity smart contracts. This project allows users to store, manage, and organize books on the blockchain with ownership controls and persistent storage.

## Features

- **Add Books**: Register new books with title and publication year
- **Edit Books**: Update existing book information (title and year)
- **Remove Books**: Delete books from the database (owner-only)
- **View Books**: Query stored books by ID
- **Access Control**: Only contract owner can remove books
- **Book Counter**: Track total number of books in the database

## Smart Contract Details

The `BookDatabase` contract includes:

- **Book Structure**: Each book contains a title (string) and publication year (uint16)
- **Unique IDs**: Auto-incrementing IDs for each book
- **Owner Permissions**: Only the contract deployer can remove books
- **Data Validation**: Prevents empty titles and invalid years

## Technology Stack

- **Solidity** ^0.8.28 - Smart contract development
- **Hardhat** - Development framework and testing
- **TypeScript** - Type-safe development
- **Ethers.js** - Ethereum interaction
- **Chai** - Testing assertions

## Prerequisites

- Node.js (v20 or higher)
- pnpm package manager
- Git

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd book-database
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file in the root directory:
```bash
INFURA_URL=your_infura_endpoint
SECRET=your_wallet_mnemonic
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## Usage

### Development

Start a local Hardhat node:
```bash
pnpm start
```

### Testing

Run the test suite:
```bash
pnpm test
```

Run tests with gas reporting:
```bash
REPORT_GAS=true pnpm test
```

### Deployment

Deploy to local network:
```bash
pnpm run deploy:dev
```

Deploy to Sepolia testnet:
```bash
pnpm run deploy:prod
```

### Interacting with the Contract

Use Hardhat console for direct interaction:
```bash
pnpm run console
```

Example interactions:
```javascript
// Get contract instance
const BookDatabase = await ethers.getContractFactory("BookDatabase");
const bookDatabase = await BookDatabase.attach("CONTRACT_ADDRESS");

// Add a book
await bookDatabase.registerBook({ title: "The Great Gatsby", year: 1925 });

// Get book count
const count = await bookDatabase.count();

// Get book by ID
const book = await bookDatabase.books(1);

// Edit a book
await bookDatabase.editBook(1, { title: "Updated Title", year: 1925 });
```

## Contract Functions

### Public Functions

- `registerBook(Book memory newBook)` - Add a new book to the database
- `editBook(uint32 id, Book memory newBook)` - Update an existing book
- `removeBook(uint32 id)` - Remove a book (owner only)
- `books(uint32 id)` - View book details by ID
- `count()` - Get total number of books

### Access Control

- `removeBook()` function is restricted to the contract owner
- All other functions are publicly accessible

## Testing

The project includes comprehensive tests covering:

- Book registration and counting
- Book editing functionality
- Book removal with proper permissions
- Access control enforcement

## Networks

- **Local**: Hardhat development network (Chain ID: 31337)
- **Sepolia**: Ethereum testnet (Chain ID: 11155111)

## License

This project is licensed under the MIT License.
