import {useContext, useState, createContext, ReactNode} from 'react';
import Web3 from 'web3';
import EventNftContract from '../build/contracts/EventNftMarket.json';

type Web3ContextProps = {
    children: ReactNode
}

type IWeb3Context = {
    accounts: any,
    tokenMinted: boolean,
    balance: any,
    connectWallet: () => void
    handleAccountChange: () => void

    fetchOwnedNfts: () => void
    mintNft: (name: string, price: number) => void
    fetchAllNftsOnSale: (nfts: any) => void
}

const provider = window.ethereum;
const web3 = new Web3(provider as any)


export const Web3Context = createContext({} as IWeb3Context)

export const Web3Provider = ({children}: Web3ContextProps) => {
    let [accounts, setAccounts] = useState<string>("")
    let [balance, setBalance] = useState<string | undefined>("");
    let [accountChanged, setAccountChanged] = useState<boolean | undefined>(false);

    let [nfts, setNfts] = useState([])
    const [tokenMinted, setTokenMinted] = useState<boolean | false>(false)

    const connectWallet = async () => {

        if(provider) {
            const currAccount = await window.ethereum!.request({method: "eth_requestAccounts"}) as any

            accounts = currAccount[0];

            const currBalance = await web3.eth.getBalance(currAccount.toString());
            const formattedBalance = Web3.utils.fromWei(currBalance)

            setBalance(formattedBalance as any);
            setAccounts(currAccount[0])

            localStorage.setItem("account", accounts)
            localStorage.setItem("balance", formattedBalance);
            balance = formattedBalance

            console.log(`Current account : ${currAccount}`)

        }

    }

    const handleAccountChange = () => {

        window.ethereum?.on("accountsChanged", (accounts) => {
             console.log(accounts);
             setAccountChanged(!accountChanged);
        })


    }

    const fetchOwnedNfts = async () => {

    }

    const mintNft = async (name: string, price: number) => {
        connectWallet();
        const contractAbi = EventNftContract.abi;

        const nftContract = new web3.eth.Contract(contractAbi as any, EventNftContract.networks["5777"].address as any)
        const mintedNft = await nftContract.methods.mintNftToken(name, price).send({from: "0xce7868dd6be1a4f0ba40267509f55fded1f14bea"});

        console.log( mintedNft)
        return mintedNft
    }

    const fetchAllNftsOnSale = async (nfts: any[]) => {
        return nfts;
    }

    return <Web3Context.Provider value = {{connectWallet, handleAccountChange, accounts, balance, mintNft, fetchAllNftsOnSale, fetchOwnedNfts, tokenMinted}}>
            {children}
    </Web3Context.Provider>
}

export const useWeb3 = () => {
    return useContext(Web3Context);
}