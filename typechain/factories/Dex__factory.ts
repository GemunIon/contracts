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
        name: "amount",
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
  "0x60806040523480156200001157600080fd5b50600060019054906101000a900460ff168062000039575060008054906101000a900460ff16155b6200007b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040162000072906200011c565b60405180910390fd5b60008060019054906101000a900460ff161590508015620000cc576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b8015620000ee5760008060016101000a81548160ff0219169083151502179055505b506200019e565b600062000104602e836200013e565b915062000111826200014f565b604082019050919050565b600060208201905081810360008301526200013781620000f5565b9050919050565b600082825260208201905092915050565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b61182380620001ae6000396000f3fe60806040526004361061008a5760003560e01c80638da5cb5b116100595780638da5cb5b14610151578063a6f2ae3a1461017c578063c4d66de814610186578063e4849b32146101af578063f2fde38b146101d8576100c8565b80633ccfd60b146100cd578063451c3d80146100e45780635c975abb1461010f578063715018a61461013a576100c8565b366100c8577fa8142743f8f70a4c26f3691cf4ed59718381fb2f18070ec52be1f1022d855557346040516100be91906114e1565b60405180910390a1005b600080fd5b3480156100d957600080fd5b506100e2610201565b005b3480156100f057600080fd5b506100f961030f565b60405161010691906113a6565b60405180910390f35b34801561011b57600080fd5b50610124610335565b604051610131919061138b565b60405180910390f35b34801561014657600080fd5b5061014f61034c565b005b34801561015d57600080fd5b506101666103d4565b60405161017391906112e7565b60405180910390f35b6101846103fe565b005b34801561019257600080fd5b506101ad60048036038101906101a891906110cc565b610623565b005b3480156101bb57600080fd5b506101d660048036038101906101d1919061111e565b6107ac565b005b3480156101e457600080fd5b506101ff60048036038101906101fa91906110cc565b610a17565b005b610209610b0f565b73ffffffffffffffffffffffffffffffffffffffff166102276103d4565b73ffffffffffffffffffffffffffffffffffffffff161461027d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161027490611461565b60405180910390fd5b6000479050600081116102c5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016102bc90611481565b60405180910390fd5b3373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505015801561030b573d6000803e3d6000fd5b5050565b609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b6000603360009054906101000a900460ff16905090565b610354610b0f565b73ffffffffffffffffffffffffffffffffffffffff166103726103d4565b73ffffffffffffffffffffffffffffffffffffffff16146103c8576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103bf90611461565b60405180910390fd5b6103d26000610b17565b565b6000606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b60003490506000609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161046091906112e7565b60206040518083038186803b15801561047857600080fd5b505afa15801561048c573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104b09190611147565b9050600082116104f5576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ec906114c1565b60405180910390fd5b80821115610538576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161052f906114a1565b60405180910390fd5b609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663a9059cbb33846040518363ffffffff1660e01b8152600401610595929190611362565b602060405180830381600087803b1580156105af57600080fd5b505af11580156105c3573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105e791906110f5565b507f4e08ba899977cf7d4c2964bce71c6b9a7ef76ee5166a4c1249a1e08016e33ef18260405161061791906114e1565b60405180910390a15050565b600060019054906101000a900460ff1680610649575060008054906101000a900460ff16155b610688576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161067f90611441565b60405180910390fd5b60008060019054906101000a900460ff1615905080156106d8576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6106e0610bdd565b6106e8610cc6565b6107078273ffffffffffffffffffffffffffffffffffffffff16610daf565b610746576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161073d906113c1565b60405180910390fd5b81609760006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080156107a85760008060016101000a81548160ff0219169083151502179055505b5050565b600081116107ef576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107e690611401565b60405180910390fd5b6000609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dd62ed3e33306040518363ffffffff1660e01b815260040161084e929190611302565b60206040518083038186803b15801561086657600080fd5b505afa15801561087a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061089e9190611147565b9050818110156108e3576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016108da90611421565b60405180910390fd5b609760009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd3330856040518463ffffffff1660e01b81526004016109429392919061132b565b602060405180830381600087803b15801561095c57600080fd5b505af1158015610970573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061099491906110f5565b503373ffffffffffffffffffffffffffffffffffffffff166108fc839081150290604051600060405180830381858888f193505050501580156109db573d6000803e3d6000fd5b507f92f64ca637d023f354075a4be751b169c1a8a9ccb6d33cdd0cb352054399572782604051610a0b91906114e1565b60405180910390a15050565b610a1f610b0f565b73ffffffffffffffffffffffffffffffffffffffff16610a3d6103d4565b73ffffffffffffffffffffffffffffffffffffffff1614610a93576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a8a90611461565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff161415610b03576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610afa906113e1565b60405180910390fd5b610b0c81610b17565b50565b600033905090565b6000606560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081606560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600060019054906101000a900460ff1680610c03575060008054906101000a900460ff16155b610c42576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c3990611441565b60405180910390fd5b60008060019054906101000a900460ff161590508015610c92576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610c9a610dc2565b610ca2610e9b565b8015610cc35760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680610cec575060008054906101000a900460ff16155b610d2b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d2290611441565b60405180910390fd5b60008060019054906101000a900460ff161590508015610d7b576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b610d83610dc2565b610d8b610f8f565b8015610dac5760008060016101000a81548160ff0219169083151502179055505b50565b600080823b905060008111915050919050565b600060019054906101000a900460ff1680610de8575060008054906101000a900460ff16155b610e27576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610e1e90611441565b60405180910390fd5b60008060019054906101000a900460ff161590508015610e77576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b8015610e985760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680610ec1575060008054906101000a900460ff16155b610f00576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ef790611441565b60405180910390fd5b60008060019054906101000a900460ff161590508015610f50576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b6000603360006101000a81548160ff0219169083151502179055508015610f8c5760008060016101000a81548160ff0219169083151502179055505b50565b600060019054906101000a900460ff1680610fb5575060008054906101000a900460ff16155b610ff4576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610feb90611441565b60405180910390fd5b60008060019054906101000a900460ff161590508015611044576001600060016101000a81548160ff02191690831515021790555060016000806101000a81548160ff0219169083151502179055505b61105461104f610b0f565b610b17565b80156110755760008060016101000a81548160ff0219169083151502179055505b50565b600081359050611087816117a8565b92915050565b60008151905061109c816117bf565b92915050565b6000813590506110b1816117d6565b92915050565b6000815190506110c6816117d6565b92915050565b6000602082840312156110de57600080fd5b60006110ec84828501611078565b91505092915050565b60006020828403121561110757600080fd5b60006111158482850161108d565b91505092915050565b60006020828403121561113057600080fd5b600061113e848285016110a2565b91505092915050565b60006020828403121561115957600080fd5b6000611167848285016110b7565b91505092915050565b6111798161150d565b82525050565b6111888161151f565b82525050565b61119781611555565b82525050565b60006111aa6036836114fc565b91506111b582611579565b604082019050919050565b60006111cd6026836114fc565b91506111d8826115c8565b604082019050919050565b60006111f06025836114fc565b91506111fb82611617565b604082019050919050565b60006112136019836114fc565b915061121e82611666565b602082019050919050565b6000611236602e836114fc565b91506112418261168f565b604082019050919050565b60006112596020836114fc565b9150611264826116de565b602082019050919050565b600061127c6021836114fc565b915061128782611707565b604082019050919050565b600061129f6020836114fc565b91506112aa82611756565b602082019050919050565b60006112c2601b836114fc565b91506112cd8261177f565b602082019050919050565b6112e18161154b565b82525050565b60006020820190506112fc6000830184611170565b92915050565b60006040820190506113176000830185611170565b6113246020830184611170565b9392505050565b60006060820190506113406000830186611170565b61134d6020830185611170565b61135a60408301846112d8565b949350505050565b60006040820190506113776000830185611170565b61138460208301846112d8565b9392505050565b60006020820190506113a0600083018461117f565b92915050565b60006020820190506113bb600083018461118e565b92915050565b600060208201905081810360008301526113da8161119d565b9050919050565b600060208201905081810360008301526113fa816111c0565b9050919050565b6000602082019050818103600083015261141a816111e3565b9050919050565b6000602082019050818103600083015261143a81611206565b9050919050565b6000602082019050818103600083015261145a81611229565b9050919050565b6000602082019050818103600083015261147a8161124c565b9050919050565b6000602082019050818103600083015261149a8161126f565b9050919050565b600060208201905081810360008301526114ba81611292565b9050919050565b600060208201905081810360008301526114da816112b5565b9050919050565b60006020820190506114f660008301846112d8565b92915050565b600082825260208201905092915050565b60006115188261152b565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600061156082611567565b9050919050565b60006115728261152b565b9050919050565b7f54686520616363657074656420746f6b656e2061646472657373206d7573742060008201527f62652061206465706c6f79656420636f6e747261637400000000000000000000602082015250565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b7f596f75206e65656420746f2073656c6c206174206c6561737420736f6d65207460008201527f6f6b656e73000000000000000000000000000000000000000000000000000000602082015250565b7f436865636b2074686520746f6b656e20616c6c6f77616e636500000000000000600082015250565b7f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160008201527f647920696e697469616c697a6564000000000000000000000000000000000000602082015250565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b7f4f776e657220686173206e6f742062616c616e636520746f207769746864726160008201527f7700000000000000000000000000000000000000000000000000000000000000602082015250565b7f4e6f7420656e6f75676820746f6b656e7320696e207468652072657365727665600082015250565b7f596f75206e65656420746f2073656e6420736f6d652065746865720000000000600082015250565b6117b18161150d565b81146117bc57600080fd5b50565b6117c88161151f565b81146117d357600080fd5b50565b6117df8161154b565b81146117ea57600080fd5b5056fea264697066735822122094bd868da72ca161c83f27c7ef0265ddecc940edec9eb71a813ba91f308adec164736f6c63430008040033";

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
