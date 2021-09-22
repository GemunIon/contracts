/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { Dex, DexInterface } from "../Dex";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Bought",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Received",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Sold",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "acceptedToken",
    outputs: [
      {
        internalType: "contract IERC20Upgradeable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "buy",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_acceptedToken",
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
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amountOfToken",
        type: "uint256",
      },
    ],
    name: "sell",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b50600060019054906101000a900460ff168062000039575060008054906101000a900460ff16155b6200007b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000072906200011c565b60405180910390fd5b60008060019054906101000a900460ff161590508015620000cc576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b8015620000ee5760008060016101000a81548160ff0219169083151502179055505b506200019e565b600062000104602e836200013e565b915062000111826200014f565b604082019050919050565b600060208201905081810360008301526200013781620000f5565b9050919050565b600082825260208201905092915050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b6118ff80620001ae6000396000f3fe60806040526004361061008a5760003560e01c80638da5cb5b116100595780638da5cb5b14610151578063a6f2ae3a1461017c578063c4d66de814610186578063e4849b32146101af578063f2fde38b146101d8576100c8565b80633ccfd60b146100cd578063451c3d80146100e45780635c975abb1461010f578063715018a61461013a576100c8565b366100c8577fa8142743f8f70a4c26f3691cf4ed59718381fb2f18070ec52be1f1022d855557346040516100be91906115ba565b60405180910390a1005b600080fd5b3480156100d957600080fd5b506100e2610201565b005b3480156100f057600080fd5b506100f961030f565b604051610106919061145f565b60405180910390f35b34801561011b57600080fd5b50610124610335565b6040516101319190611444565b60405180910390f35b34801561014657600080fd5b5061014f61034c565b005b34801561015d57600080fd5b506101666103d4565b60405161017391906113a0565b60405180910390f35b6101846103fe565b005b34801561019257600080fd5b506101ad60048036038101906101a89190611162565b61066b565b005b3480156101bb57600080fd5b506101d660048036038101906101d191906111b4565b6107f4565b005b3480156101e457600080fd5b506101ff60048036038101906101fa9190611162565b610aad565b005b610209610ba5565b73ffffffffffffffffffffffffffffffffffffffff166102276103d4565b73ffffffffffffffffffffffffffffffffffffffff161461027d576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102749061153a565b60405180910390fd5b6000479050600081116102c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102bc9061155a565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561030b573d6000803e3d6000fd5b5050565b609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000603360009054906101000a900460ff16905090565b610354610ba5565b73ffffffffffffffffffffffffffffffffffffffff166103726103d4565b73ffffffffffffffffffffffffffffffffffffffff16146103c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103bf9061153a565b60405180910390fd5b6103d26000610bad565b565b6000606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b610406610335565b15610446576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161043d906114da565b60405180910390fd5b60003411610489576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104809061159a565b60405180910390fd5b60003490506000609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b81526004016104eb91906113a0565b60206040518083038186803b15801561050357600080fd5b505afa158015610517573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061053b91906111dd565b905080821115610580576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105779061157a565b60405180910390fd5b609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33846040518363ffffffff1660e01b81526004016105dd92919061141b565b602060405180830381600087803b1580156105f757600080fd5b505af115801561060b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061062f919061118b565b507f4e08ba899977cf7d4c2964bce71c6b9a7ef76ee5166a4c1249a1e08016e33ef18260405161065f91906115ba565b60405180910390a15050565b600060019054906101000a900460ff1680610691575060008054906101000a900460ff16155b6106d0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106c79061151a565b60405180910390fd5b60008060019054906101000a900460ff161590508015610720576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610728610c73565b610730610d5c565b61074f8273ffffffffffffffffffffffffffffffffffffffff16610e45565b61078e576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107859061147a565b60405180910390fd5b81609760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080156107f05760008060016101000a81548160ff0219169083151502179055505b5050565b6107fc610335565b1561083c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610833906114da565b60405180910390fd5b6000811161087f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610876906114ba565b60405180910390fd5b6000609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b81526004016108de9291906113bb565b60206040518083038186803b1580156108f657600080fd5b505afa15801561090a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061092e91906111dd565b905081811015610973576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161096a906114fa565b60405180910390fd5b6000829050609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330866040518463ffffffff1660e01b81526004016109d7939291906113e4565b602060405180830381600087803b1580156109f157600080fd5b505af1158015610a05573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610a29919061118b565b503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f19350505050158015610a70573d6000803e3d6000fd5b507f92f64ca637d023f354075a4be751b169c1a8a9ccb6d33cdd0cb352054399572783604051610aa091906115ba565b60405180910390a1505050565b610ab5610ba5565b73ffffffffffffffffffffffffffffffffffffffff16610ad36103d4565b73ffffffffffffffffffffffffffffffffffffffff1614610b29576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b209061153a565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610b99576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b909061149a565b60405180910390fd5b610ba281610bad565b50565b600033905090565b6000606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081606560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600060019054906101000a900460ff1680610c99575060008054906101000a900460ff16155b610cd8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ccf9061151a565b60405180910390fd5b60008060019054906101000a900460ff161590508015610d28576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610d30610e58565b610d38610f31565b8015610d595760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680610d82575060008054906101000a900460ff16155b610dc1576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610db89061151a565b60405180910390fd5b60008060019054906101000a900460ff161590508015610e11576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610e19610e58565b610e21611025565b8015610e425760008060016101000a81548160ff0219169083151502179055505b50565b600080823b905060008111915050919050565b600060019054906101000a900460ff1680610e7e575060008054906101000a900460ff16155b610ebd576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610eb49061151a565b60405180910390fd5b60008060019054906101000a900460ff161590508015610f0d576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b8015610f2e5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680610f57575060008054906101000a900460ff16155b610f96576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610f8d9061151a565b60405180910390fd5b60008060019054906101000a900460ff161590508015610fe6576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6000603360006101000a81548160ff02191690831515021790555080156110225760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff168061104b575060008054906101000a900460ff16155b61108a576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016110819061151a565b60405180910390fd5b60008060019054906101000a900460ff1615905080156110da576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6110ea6110e5610ba5565b610bad565b801561110b5760008060016101000a81548160ff0219169083151502179055505b50565b60008135905061111d81611884565b92915050565b6000815190506111328161189b565b92915050565b600081359050611147816118b2565b92915050565b60008151905061115c816118b2565b92915050565b60006020828403121561117457600080fd5b60006111828482850161110e565b91505092915050565b60006020828403121561119d57600080fd5b60006111ab84828501611123565b91505092915050565b6000602082840312156111c657600080fd5b60006111d484828501611138565b91505092915050565b6000602082840312156111ef57600080fd5b60006111fd8482850161114d565b91505092915050565b61120f816115e6565b82525050565b61121e816115f8565b82525050565b61122d8161162e565b82525050565b60006112406036836115d5565b915061124b82611652565b604082019050919050565b60006112636026836115d5565b915061126e826116a1565b604082019050919050565b60006112866025836115d5565b9150611291826116f0565b604082019050919050565b60006112a96010836115d5565b91506112b48261173f565b602082019050919050565b60006112cc6019836115d5565b91506112d782611768565b602082019050919050565b60006112ef602e836115d5565b91506112fa82611791565b604082019050919050565b60006113126020836115d5565b915061131d826117e0565b602082019050919050565b60006113356020836115d5565b915061134082611809565b602082019050919050565b60006113586020836115d5565b915061136382611832565b602082019050919050565b600061137b601b836115d5565b91506113868261185b565b602082019050919050565b61139a81611624565b82525050565b60006020820190506113b56000830184611206565b92915050565b60006040820190506113d06000830185611206565b6113dd6020830184611206565b9392505050565b60006060820190506113f96000830186611206565b6114066020830185611206565b6114136040830184611391565b949350505050565b60006040820190506114306000830185611206565b61143d6020830184611391565b9392505050565b60006020820190506114596000830184611215565b92915050565b60006020820190506114746000830184611224565b92915050565b6000602082019050818103600083015261149381611233565b9050919050565b600060208201905081810360008301526114b381611256565b9050919050565b600060208201905081810360008301526114d381611279565b9050919050565b600060208201905081810360008301526114f38161129c565b9050919050565b60006020820190508181036000830152611513816112bf565b9050919050565b60006020820190508181036000830152611533816112e2565b9050919050565b6000602082019050818103600083015261155381611305565b9050919050565b6000602082019050818103600083015261157381611328565b9050919050565b600060208201905081810360008301526115938161134b565b9050919050565b600060208201905081810360008301526115b38161136e565b9050919050565b60006020820190506115cf6000830184611391565b92915050565b600082825260208201905092915050565b60006115f182611604565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061163982611640565b9050919050565b600061164b82611604565b9050919050565b7f54686520616363657074656420746f6b656e2061646472657373206d7573742060008201527f62652061206465706c6f79656420636f6e747261637400000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f596f75206e65656420746f2073656c6c206174206c6561737420736f6d65207460008201527f6f6b656e73000000000000000000000000000000000000000000000000000000602082015250565b7f5061757361626c653a2070617573656400000000000000000000000000000000600082015250565b7f436865636b2074686520746f6b656e20616c6c6f77616e636500000000000000600082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f4f776e657220686173206e6f2062616c616e636520746f207769746864726177600082015250565b7f4e6f7420656e6f75676820746f6b656e7320696e207468652072657365727665600082015250565b7f596f75206e65656420746f2073656e6420736f6d652065746865720000000000600082015250565b61188d816115e6565b811461189857600080fd5b50565b6118a4816115f8565b81146118af57600080fd5b50565b6118bb81611624565b81146118c657600080fd5b5056fea2646970667358221220490356631e129aa765a5bc18055c2e45071007c0a745524dc16b5b4cf8264f7864736f6c63430008040033";

export class Dex__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(overrides?: Overrides & { from?: string | Promise<string> }): Promise<Dex> {
    return super.deploy(overrides || {}) as Promise<Dex>;
  }
  getDeployTransaction(overrides?: Overrides & { from?: string | Promise<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Dex {
    return super.attach(address) as Dex;
  }
  connect(signer: Signer): Dex__factory {
    return super.connect(signer) as Dex__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DexInterface {
    return new utils.Interface(_abi) as DexInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Dex {
    return new Contract(address, _abi, signerOrProvider) as Dex;
  }
}
