# Ticket Block Project

# Abstract

The Ethereum blockchain is starting to become more utilised compared to recent years. Especially with its recent system upgrade known as the merge which cuts down its high energy usage. Nowadays, the most popular type of applications is centralised based applications. Dynamically generated data either gets written to a non-relational database or a relational one that stores data within tables. However, there is a difference between decentralised and centralised applications. In decentralised systems, every single transaction gets placed into the blockchain which is a publicly accessible distributed ledger. Anybody in the world has access to the blockchain database. Its immutability nature renders its data highly secure and reliable. Nowadays, as there are more and more events being organised and hosted by individuals, there are a couple of critical problems that we face. One of them being event tickets being tampered and the second one being replicated and counterfeited versions.

This priject analyses and evaluates the implementation of a basic marketplace used to prevent fake event tickets being resold. Non-fungible tokens are used for this. At the same time conveying how useful these tokens can be for proof of ownership using complex blockchain technologies. Throughout the development of the marketplace which aims to solve the above-mentioned problems, it has been found by observing the code outputs that once a non-fungible token is minted on the blockchain through a smart contract written in solidity, every single transaction is timestamped and recorded sequentially. Hence, copies of them cannot be made. Transaction data can be viewed inside the logs of every meta mask wallet account that is connected to the application. Thus, switching between accounts always shows different transactions that have been processed at various times. For example, when a token was minted, listed on sale, or purchased. Finally, it has also been found that the same token cannot be purchased twice because a unique ID for every token is generated and incremented every time a token is minted. Disallowing the same token from being bought a second time.

# Introduction

Nowadays blockchain-oriented decentralized applications are starting to become more and more popular. These types of applications are adversaries to the typical centralised ones due to its strong tamper-proof, immutability and secure nature. The most widely recognized and heavily used blockchain is Ethereum. In addition to the aforementioned, a serious issue that we come across daily are expensive premium event tickets being tampered and resold on malicious websites by individuals who might create fake tickets. Purposefully counterfeiting them from the original owners to prevent paying for the original ticket to attend an event. Therefore, to overcome this problem, the paper focuses on addressing how we can take advantage of non-fungible tokens to allow ticket buyers to prove that they are the ones who purchased a specific ticket. Eliminating any malicious activity. Disallowing individuals from gaining access to different classes of tickets where they range in price which can cost a lot of money. Furthermore, the proposed web application that is to be developed does not support debit or credit card payments for purchasing event tickets. On the one hand, mainly due to security reasons. On the other hand, the fact that governed authorities such as banks are generally involved to verify the authenticity of transactions. Hence, this can take a very long time and can potentially fail if malicious activity is detected. Instead, to bypass the problem of transaction approval delays, the proposed marketplace system that is going be developed supports smart contract functionality that executes on the blockchain ledger instead.

Smart Contracts that reside on the blockchain are lines of code that are compiled into bytecode which run under certain preconditions that must be met. They are also bulletproof in terms of security since smart contracts make use of asymmetric key cryptography. We take such a public key to encrypt the contents of a token by applying 256-bit encryption which makes it impossible for anyone to tamper with the data as it converts the plaintext data into ciphertext. Rendering the data unreadable and thereby cannot be intercepted. A private key is also required to decrypt its contents. Hence, the proposed system implements a smart contract which executes separately from the system’s backend. Preventing event tickets from being counterfeited by allowing end-users to interact with these contracts that transfers ownership of a token that uniquely identifies an event ticket. Finally, the upcoming sections of this paper are split into the following - Section II of this paper addresses the related work within this field. Section III outlines the implementation approaches of the system. Section IV presents the results produced by the system. Finally, Section V concludes the paper.

# Related Work

Throughout this section of the paper, we explore the relevant work and research that other authors have conducted regarding decentralized systems. The various use cases and advantages are also evaluated based on research. In addition to the previous section, the problem of expensive event tickets being counterfeited and tampered with has been outlined. Thus, this can be circumvented by implementing a non-fungible token marketplace. Relying on smart contract functionality to deliver a proof of ownership solution. Preventing event tickets from being counterfeited. Non-fungible tokens are unique identifiers for rare artwork, game collections or event entertainment tickets that live inside small blocks of data within the blockchain. Commonly known as the memory pool of transactions. According to [1], the authors convey that there are also other variations of tokens available such as fungible and semi fungible. Fungible tokens contain different characteristics and use cases compared to non-fungible ones. These types of tokens can usually be duplicated for other ones that are dissimilar to each other. Therefore, eliminating any form of proof of ownership unlike non-fungible tokens. Which is a big advantage of using NFTs in lieu of fungible tokens. The next section evaluates how the tokens are registered on the blockchain taking into consideration some disadvantages that can be present when minting new tokens. 

According to [2], the authors discuss how these types of tokens can be created by implementing a method of inserting a new token inside the blockchain. Known as minting. This is the process of registering a token whereby any individual can view the contents of the token such as its ID, name, and price. But cannot alter the data because it is immutable. Usually there are gas fees that are associated which is a disadvantage. After the minting process is completed, a transaction is created and added inside the ledger with an associating nonce value that represents the current transaction number that has been processed. Thus, the proposed system is going to support the process of minting, buying, and selling tokens. However, there is a small disadvantage that comes with this. Every transaction generated for minting a token can potentially fail but is very unlikely. A syntax or runtime error within the smart contract can potentially corrupt a transaction and render it invalid. According to [3], the authors convey how transactions are deemed to be costly in terms of price. Every transaction executed on the blockchain typically incurs a fee known as gas. This fee compensates for the GPU power that a machine consumes to solve a complicated mathematical puzzle to verify and approve a transaction from within a temporary location called the memory pool. The more gas that is paid, the faster it gets validated from the memory pool of pending transactions. Also, according to the research performed by [3], various optimization techniques are outlined which aids in the reduction of gas fees which is important in developing a reliable and fast application. Moreover, the next section evaluates a couple of optimization techniques that can be applied inside smart contracts to significantly reduce the gas fees. And, how they can be interfaced with by the frontend of applications to communicate with function declarations to buy, sell, list and transfer ownership of tokens.

According to [4], the authors of the paper mention that smart contracts are capable of handling externally owned accounts (EOAs). These are independent accounts that are unique to a single individual. Each account has an associated private key that must never be shared. Tokens that are bought by that specific account is only available to that user and no other account. Unless ownership is transferred again to a different account. In other words, the new person who purchases the previously bought token becomes the new owner of the token. Users can also view all the transactions the account has made, however, only if the owner of the account decides to transfer ownership of the token to a different account, then a new transaction regarding that purchase is recorded. Figure 1.0 below represents how we can switch between accounts using a piece of software called Meta Mask. Similarly, according to [5], the authors explain how communication with smart contracts can be rendered possible through a JavaScript library called Web3.js. Also, ganache is a popular testing blockchain environment that can be used alongside Web3 APIs to view account balances and the transactions recorded inside the blockchain in real-time. The more transactions that are recorded, the higher the amount of gas fees that are accumulated. To bypass this, the authors in [3] mention that one way to gradually reduce the fees is to store integer variables with less bytes. The results show that on average using 8 bytes of unsigned integer data reduces the gas fees by “18%” compared to integer sizes of 256 bytes.

According to [4], the authors of the paper mention that smart contracts are capable of handling externally owned accounts (EOAs). These are independent accounts that are unique to a single individual. Each account has an associated private key that must never be shared. Tokens that are bought by that specific account is only available to that user and no other account. Unless ownership is transferred again to a different account. In other words, the new person who purchases the previously bought token becomes the new owner of the token. Users can also view all the transactions the account has made, however, only if the owner of the account decides to transfer ownership of the token to a different account, then a new transaction regarding that purchase is recorded. Figure 1.0 below represents how we can switch between accounts using a piece of software called Meta Mask. Similarly, according to [5], the authors explain how communication with smart contracts can be rendered possible through a JavaScript library called Web3.js. Also, ganache is a popular testing blockchain environment that can be used alongside Web3 APIs to view account balances and the transactions recorded inside the blockchain in real-time. The more transactions that are recorded, the higher the amount of gas fees that are accumulated. To bypass this, the authors in [3] mention that one way to gradually reduce the fees is to store integer variables with less bytes. The results show that on average using 8 bytes of unsigned integer data reduces the gas fees by “18%” compared to integer sizes of 256 bytes.

## Figure 1.0 - Externally Owned Meta Mask Accounts

<img width="500" height = "500" alt="image" src="https://user-images.githubusercontent.com/29733613/203999537-e05c49a5-a0a5-4d20-82ca-c19c0419a779.png">

After the smart contract for creating and buying tokens are completed, we can then interact with the compiled contract through a Web3 API called “ethers”. This package is available to install using the node package manager (NPM). The API can be used in React JS to perform several operations with the smart contracts that have been compiled and migrated. A JSON file can be produced after migrating the contract which is then imported into another file which deals with the Context API. For example, fetching the contract data and its associating methods once compiled into bytecode. By default, every account on the blockchain is given a default balance of 100 ETH to use for development purposes. Also, during the development of decentralized applications, truffle can be used as a testing environment for the development of the smart contract and ganache as the local blockchain environment.

The authors in [6] discuss in their paper about the implementation of an e-Voting system to prevent fake and fraudulent votes for electronic campaigns in India. Very similar to the current problem that is being investigated regarding event tickets. The problem that they are facing are physical votes on paper being copied by other voters in a polling place. And placing votes for a wrong candidate by mistake. Thereby the votes cannot be placed a second time, hence rendering the vote invalid. Thus, they are focusing on developing a web application that allows individuals to place votes from anywhere in the world through a smart contract to prevent physical votes from being falsely casted. By doing this, the voters can place their vote by moving their token that uniquely represents a vote to the candidate’s wallet to prevent such problem.

In [7] the author analyses an advantage of using non-fungible tokens. Every token registered is associated with a unique signature in the form of a 20-byte hexadecimal hash that is currently in circulation. Linked to the person who owns the token. Therefore, this way the tokens can easily be tracked. However, on the other hand, the same author outlines one caveat that NFTs face. Intellectual Property Rights can cause an issue. Mainly because there have been instances where individuals have reproduced an authentic token that has already been minted by taking a photo of its meta data which does not fully give way to full proof of ownership. There are uncertainties as to whether the token has been bought belongs to the owner or not. Also, another caveat that the author evaluates is the environmental impact of minting tokens. Based on the studies in [7], it has been estimated that “Ethereum consumes approximately 44.94 Terra-Wat hours of electricity every year which is almost as much as the total electricity consumption of Qatar and Hungary combined in a single year. 

# Solution Implementation

When regular users are accessing the application, by default they should not have access to all the NFTs that are available to mint on the Ethereum network. The application supports a fully-fledged authentication system whereby users must register an account, verify their e-mail and login before viewing available tokens for sale. Figures 1.1 and 1.2 below shows the user interface for registering and verifying the e-mail address. Furthermore, after the authentication process is complete, users can proceed to the section where they can mint an NFT on the blockchain. As previously mentioned, minting a token refers to creating an instance of a transaction on the blockchain for a specific token. This elevates the notion of proof of ownership. Also, whenever a user decides to change accounts using meta mask, the creator address is always stored in an object that is unique from the other accounts. Figures 1.3 and 1.4 shows the form for minting a token and the output that it produces which is vital in proving that the owner of the token is authentic in the form of JSON data.

## Figure 1.1 - Register User Account Interface

Figure shows the user interface for registering a new account on the application

<img width="600" height = "350" alt="image" src="https://user-images.githubusercontent.com/29733613/203999834-6d6ee3b0-0474-43cb-b3f1-ade5e292d7ed.png">

When regular users are accessing the application, by default they should not have access to all the NFTs that are available to mint on the Ethereum network. The application supports a fully-fledged authentication system whereby users must register an account, verify their e-mail and login before viewing available tokens for sale. Figures 1.1 and 1.2 below shows the user interface for registering and verifying the e-mail address. Furthermore, after the authentication process is complete, users can proceed to the section where they can mint an NFT on the blockchain. As previously mentioned, minting a token refers to creating an instance of a transaction on the blockchain for a specific token. This elevates the notion of proof of ownership. Also, whenever a user decides to change accounts using meta mask, the creator address is always stored in an object that is unique from the other accounts. Figures 1.3 and 1.4 shows the form for minting a token and the output that it produces which is vital in proving that the owner of the token is authentic in the form of JSON data.

## Figure 1.2 – Verify E-mail Address User Interface

Figure shows the user interface for verifying the e-mail address used to register

<img width="600" height = "370" alt="image" src="https://user-images.githubusercontent.com/29733613/204000060-8a1e0330-317f-4677-9e3d-f17ba12c4ee6.png">


The output that is produced when an authenticated user mints their desired token is a unique transaction hash. It is associated with the newly generated token ID that has been created which increments every time within the smart contract to prevent the same ID from being used over again. This receipt is very important for proving that the currently logged in user is the one who minted the token and not somebody else. Mainly because the hash belongs to the individual minted token. Therefore, it cannot be replicated. In addition to the mentioned above, global state management is also used as a secondary solution for dealing with the problem being investigated, known as the Context API in React JS. For this application, global state variable management is used which involves connecting the user’s meta mask wallet, fetching available token data, minting a token, and purchasing it. One reason why the Context API is used over local state management is because functions and global variables can be declared within a file named Web3 Context and therefore can be accessed anywhere within the application by instantiating and globally exporting a provider that takes in the defined variables and functions. Also, a custom hook is created out of the context which is wrapped around the main index file that gives access to these functions globally. Also, figure 1.2.1 below shows the authentication and NFT services both running in parallel allowing users to send HTTP requests to the docker containers through two open ports.
