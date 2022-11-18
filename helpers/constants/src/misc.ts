import { BigNumber, utils, constants } from "ethers";

export const baseTokenURI = "http://localhost:3000"; // no trailing slash
export const tokenSymbol = "GEM";
export const tokenName = "GEMUNION";
export const tokenId = 666; // value less than 100 will break ERC721ABRK
export const royalty = 100; // 1%
export const nonce = utils.formatBytes32String("nonce");

export const DEFAULT_ADMIN_ROLE = constants.HashZero;

export const MINTER_ROLE = utils.id("MINTER_ROLE");
export const PAUSER_ROLE = utils.id("PAUSER_ROLE");
export const SNAPSHOT_ROLE = utils.id("SNAPSHOT_ROLE");
export const PREDICATE_ROLE = utils.id("PREDICATE_ROLE");
export const DEPOSITOR_ROLE = utils.id("DEPOSITOR_ROLE");

export const decimals = BigNumber.from(10).pow(18);
export const amount = 100000;