// THIS IS THE LEGACY FORM TO SEND TRANSACTIONS
// Loading dependencies
const fs = require( 'fs' ).promises;
const Web3 = require( 'web3' );
const HDWalletProvider = require( '@truffle/hdwallet-provider' );
const { mnemonicGenerate } = require( '@polkadot/util-crypto' );
const Transaction = require('ethereumjs-tx').Transaction;
const Common = require('ethereumjs-common').default;

async function main () {  
    // Infura rinkeby's url
    const infuraRinkeby = INFURA_HTTPS;

    // Generating bip39 mnemonic
    // const mnemonic = mnemonicGenerate();
    // save the mnemonic in a JSON file in your project directory
    // console.log(mnemonic);

    // Loading previously generated mnemonic
    const mnemonic = ( JSON.parse( await fs.readFile(
                       "FILE_WITH_MNEMONIC.json" ,
                       "utf8" 
                      ) ) ).mnemonic;

    // Generating provider
    const provider = new HDWalletProvider( mnemonic , infuraRinkeby );
    const web3 = new Web3( provider );

    // Declaring rinkeby testnet
    const chain = new Common( 'rinkeby' , 'istanbul' );

    // Getting sending and receiving addresses
    //YOU CAN CHANGE 0 TO SELECT OTHER ADDRESSES
    const sendingAddress = ( await web3.eth.getAccounts() )[0]; 
    const receivingAddress = "DESTINATION_ADDRESS";

    // Getting the private key for the account
    const preKey = ( provider.wallets )[ sendingAddress.toLowerCase() ]
                   .privateKey.toString( 'hex' );
    const privateKey = Buffer.from( preKey , 'hex' );

    // Constructing the raw transaction
    const rawTx = {
        from        :   web3.utils.toHex( sendingAddress ),
        to          :   web3.utils.toHex( receivingAddress ),
        gasPrice    :   web3.utils.toHex( web3.utils.toWei( '1' , 'gwei' ) ),
        gasLimit    :   web3.utils.toHex( 200000 ),
        value       :   web3.utils.toHex( web3.utils.toWei( '0.25' , 'ether' ) ),
        data        :   web3.utils.toHex( 'Hello World!' ),
        nonce       :   web3.utils.toHex( await web3.eth.getTransactionCount( 
                                          sendingAddress ,
                                          'pending'
                                         ) ),
    };

    // Creating a new transaction
    const tx = new Transaction( rawTx , { common : chain } );

    // Signing the transaction
    tx.sign( privateKey );

    // Sending transaction
    await web3.eth.sendSignedTransaction( '0x' + tx.serialize().toString( 'hex' ) )
    .on(