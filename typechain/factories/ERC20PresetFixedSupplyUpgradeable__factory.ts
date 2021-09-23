/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  ERC20PresetFixedSupplyUpgradeable,
  ERC20PresetFixedSupplyUpgradeableInterface,
} from "../ERC20PresetFixedSupplyUpgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "initialSupply",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "address",
        name: "recipient",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506122f9806100206000396000f3fe608060405234801561001057600080fd5b50600436106100ea5760003560e01c806370a082311161008c578063a457c2d711610066578063a457c2d71461025f578063a9059cbb1461028f578063bd3a13f6146102bf578063dd62ed3e146102db576100ea565b806370a08231146101f557806379cc67901461022557806395d89b4114610241576100ea565b806323b872dd116100c857806323b872dd1461015b578063313ce5671461018b57806339509351146101a957806342966c68146101d9576100ea565b806306fdde03146100ef578063095ea7b31461010d57806318160ddd1461013d575b600080fd5b6100f761030b565b6040516101049190611a9b565b60405180910390f35b6101276004803603810190610122919061177e565b61039d565b6040516101349190611a80565b60405180910390f35b6101456103bb565b6040516101529190611c3d565b60405180910390f35b6101756004803603810190610170919061172f565b6103c5565b6040516101829190611a80565b60405180910390f35b6101936104bd565b6040516101a09190611c58565b60405180910390f35b6101c360048036038101906101be919061177e565b6104c6565b6040516101d09190611a80565b60405180910390f35b6101f360048036038101906101ee919061184d565b610572565b005b61020f600480360381019061020a91906116ca565b610586565b60405161021c9190611c3d565b60405180910390f35b61023f600480360381019061023a919061177e565b6105cf565b005b61024961064a565b6040516102569190611a9b565b60405180910390f35b6102796004803603810190610274919061177e565b6106dc565b6040516102869190611a80565b60405180910390f35b6102a960048036038101906102a4919061177e565b6107c7565b6040516102b69190611a80565b60405180910390f35b6102d960048036038101906102d491906117ba565b6107e5565b005b6102f560048036038101906102f091906116f3565b6108ce565b6040516103029190611c3d565b60405180910390f35b60606036805461031a90611e06565b80601f016020809104026020016040519081016040528092919081815260200182805461034690611e06565b80156103935780601f1061036857610100808354040283529160200191610393565b820191906000526020600020905b81548152906001019060200180831161037657829003601f168201915b5050505050905090565b60006103b16103aa610955565b848461095d565b6001905092915050565b6000603554905090565b60006103d2848484610b28565b6000603460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600061041d610955565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508281101561049d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161049490611b5d565b60405180910390fd5b6104b1856104a9610955565b85840361095d565b60019150509392505050565b60006012905090565b60006105686104d3610955565b8484603460006104e1610955565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546105639190611ce5565b61095d565b6001905092915050565b61058361057d610955565b82610dac565b50565b6000603360008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b60006105e2836105dd610955565b6108ce565b905081811015610627576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161061e90611b7d565b60405180910390fd5b61063b83610633610955565b84840361095d565b6106458383610dac565b505050565b60606037805461065990611e06565b80601f016020809104026020016040519081016040528092919081815260200182805461068590611e06565b80156106d25780601f106106a7576101008083540402835291602001916106d2565b820191906000526020600020905b8154815290600101906020018083116106b557829003601f168201915b5050505050905090565b600080603460006106eb610955565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050828110156107a8576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161079f90611bfd565b60405180910390fd5b6107bc6107b3610955565b8585840361095d565b600191505092915050565b60006107db6107d4610955565b8484610b28565b6001905092915050565b600060019054906101000a900460ff168061080b575060008054906101000a900460ff16155b61084a576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161084190611b3d565b60405180910390fd5b60008060019054906101000a900460ff16159050801561089a576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6108a685858585610f85565b80156108c75760008060016101000a81548160ff0219169083151502179055505b5050505050565b6000603460008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1614156109cd576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109c490611bdd565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610a3d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a3490611afd565b60405180910390fd5b80603460008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610b1b9190611c3d565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610b98576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b8f90611bbd565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610c08576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610bff90611abd565b60405180910390fd5b610c13838383611088565b6000603360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610c9a576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c9190611b1d565b60405180910390fd5b818103603360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555081603360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610d2f9190611ce5565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610d939190611c3d565b60405180910390a3610da684848461108d565b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610e1c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e1390611b9d565b60405180910390fd5b610e2882600083611088565b6000603360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610eaf576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ea690611add565b60405180910390fd5b818103603360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508160356000828254610f079190611d3b565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610f6c9190611c3d565b60405180910390a3610f808360008461108d565b505050565b600060019054906101000a900460ff1680610fab575060008054906101000a900460ff16155b610fea576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610fe190611b3d565b60405180910390fd5b60008060019054906101000a900460ff16159050801561103a576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b611042611092565b61104c858561116b565b611054611274565b6110608585858561134d565b80156110815760008060016101000a81548160ff0219169083151502179055505b5050505050565b505050565b505050565b600060019054906101000a900460ff16806110b8575060008054906101000a900460ff16155b6110f7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110ee90611b3d565b60405180910390fd5b60008060019054906101000a900460ff161590508015611147576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b80156111685760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680611191575060008054906101000a900460ff16155b6111d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016111c790611b3d565b60405180910390fd5b60008060019054906101000a900460ff161590508015611220576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b8260369080519060200190611236929190611595565b50816037908051906020019061124d929190611595565b50801561126f5760008060016101000a81548160ff0219169083151502179055505b505050565b600060019054906101000a900460ff168061129a575060008054906101000a900460ff16155b6112d9576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016112d090611b3d565b60405180910390fd5b60008060019054906101000a900460ff161590508015611329576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b801561134a5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680611373575060008054906101000a900460ff16155b6113b2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016113a990611b3d565b60405180910390fd5b60008060019054906101000a900460ff161590508015611402576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b61140c8284611434565b801561142d5760008060016101000a81548160ff0219169083151502179055505b5050505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1614156114a4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161149b90611c1d565b60405180910390fd5b6114b060008383611088565b80603560008282546114c29190611ce5565b9250508190555080603360008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546115189190611ce5565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161157d9190611c3d565b60405180910390a36115916000838361108d565b5050565b8280546115a190611e06565b90600052602060002090601f0160209004810192826115c3576000855561160a565b82601f106115dc57805160ff191683800117855561160a565b8280016001018555821561160a579182015b828111156116095782518255916020019190600101906115ee565b5b509050611617919061161b565b5090565b5b8082111561163457600081600090555060010161161c565b5090565b600061164b61164684611c98565b611c73565b90508281526020810184848401111561166357600080fd5b61166e848285611dc4565b509392505050565b60008135905061168581612295565b92915050565b600082601f83011261169c57600080fd5b81356116ac848260208601611638565b91505092915050565b6000813590506116c4816122ac565b92915050565b6000602082840312156116dc57600080fd5b60006116ea84828501611676565b91505092915050565b6000806040838503121561170657600080fd5b600061171485828601611676565b925050602061172585828601611676565b9150509250929050565b60008060006060848603121561174457600080fd5b600061175286828701611676565b935050602061176386828701611676565b9250506040611774868287016116b5565b9150509250925092565b6000806040838503121561179157600080fd5b600061179f85828601611676565b92505060206117b0858286016116b5565b9150509250929050565b600080600080608085870312156117d057600080fd5b600085013567ffffffffffffffff8111156117ea57600080fd5b6117f68782880161168b565b945050602085013567ffffffffffffffff81111561181357600080fd5b61181f8782880161168b565b9350506040611830878288016116b5565b925050606061184187828801611676565b91505092959194509250565b60006020828403121561185f57600080fd5b600061186d848285016116b5565b91505092915050565b61187f81611d81565b82525050565b600061189082611cc9565b61189a8185611cd4565b93506118aa818560208601611dd3565b6118b381611ef6565b840191505092915050565b60006118cb602383611cd4565b91506118d682611f07565b604082019050919050565b60006118ee602283611cd4565b91506118f982611f56565b604082019050919050565b6000611911602283611cd4565b915061191c82611fa5565b604082019050919050565b6000611934602683611cd4565b915061193f82611ff4565b604082019050919050565b6000611957602e83611cd4565b915061196282612043565b604082019050919050565b600061197a602883611cd4565b915061198582612092565b604082019050919050565b600061199d602483611cd4565b91506119a8826120e1565b604082019050919050565b60006119c0602183611cd4565b91506119cb82612130565b604082019050919050565b60006119e3602583611cd4565b91506119ee8261217f565b604082019050919050565b6000611a06602483611cd4565b9150611a11826121ce565b604082019050919050565b6000611a29602583611cd4565b9150611a348261221d565b604082019050919050565b6000611a4c601f83611cd4565b9150611a578261226c565b602082019050919050565b611a6b81611dad565b82525050565b611a7a81611db7565b82525050565b6000602082019050611a956000830184611876565b92915050565b60006020820190508181036000830152611ab58184611885565b905092915050565b60006020820190508181036000830152611ad6816118be565b9050919050565b60006020820190508181036000830152611af6816118e1565b9050919050565b60006020820190508181036000830152611b1681611904565b9050919050565b60006020820190508181036000830152611b3681611927565b9050919050565b60006020820190508181036000830152611b568161194a565b9050919050565b60006020820190508181036000830152611b768161196d565b9050919050565b60006020820190508181036000830152611b9681611990565b9050919050565b60006020820190508181036000830152611bb6816119b3565b9050919050565b60006020820190508181036000830152611bd6816119d6565b9050919050565b60006020820190508181036000830152611bf6816119f9565b9050919050565b60006020820190508181036000830152611c1681611a1c565b9050919050565b60006020820190508181036000830152611c3681611a3f565b9050919050565b6000602082019050611c526000830184611a62565b92915050565b6000602082019050611c6d6000830184611a71565b92915050565b6000611c7d611c8e565b9050611c898282611e38565b919050565b6000604051905090565b600067ffffffffffffffff821115611cb357611cb2611ec7565b5b611cbc82611ef6565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b6000611cf082611dad565b9150611cfb83611dad565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115611d3057611d2f611e69565b5b828201905092915050565b6000611d4682611dad565b9150611d5183611dad565b925082821015611d6457611d63611e69565b5b828203905092915050565b6000611d7a82611d8d565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b82818337600083830152505050565b60005b83811015611df1578082015181840152602081019050611dd6565b83811115611e00576000848401525b50505050565b60006002820490506001821680611e1e57607f821691505b60208210811415611e3257611e31611e98565b5b50919050565b611e4182611ef6565b810181811067ffffffffffffffff82111715611e6057611e5f611ec7565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6000601f19601f8301169050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206160008201527f6c6c6f77616e6365000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f7760008201527f616e636500000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b61229e81611d6f565b81146122a957600080fd5b50565b6122b581611dad565b81146122c057600080fd5b5056fea26469706673582212205648d3483ccbd14be3448ddd107d2d4669fda768f6584b32f2b2d51c08e8c4ee64736f6c63430008040033";

export class ERC20PresetFixedSupplyUpgradeable__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ERC20PresetFixedSupplyUpgradeable> {
    return super.deploy(overrides || {}) as Promise<ERC20PresetFixedSupplyUpgradeable>;
  }
  getDeployTransaction(overrides?: Overrides & { from?: string | Promise<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): ERC20PresetFixedSupplyUpgradeable {
    return super.attach(address) as ERC20PresetFixedSupplyUpgradeable;
  }
  connect(signer: Signer): ERC20PresetFixedSupplyUpgradeable__factory {
    return super.connect(signer) as ERC20PresetFixedSupplyUpgradeable__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ERC20PresetFixedSupplyUpgradeableInterface {
    return new utils.Interface(_abi) as ERC20PresetFixedSupplyUpgradeableInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): ERC20PresetFixedSupplyUpgradeable {
    return new Contract(address, _abi, signerOrProvider) as ERC20PresetFixedSupplyUpgradeable;
  }
}
