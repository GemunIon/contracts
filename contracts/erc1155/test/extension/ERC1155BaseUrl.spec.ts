import { use } from "chai";
import { solidity } from "ethereum-waffle";

import { DEFAULT_ADMIN_ROLE, InterfaceId, MINTER_ROLE } from "@gemunion/contracts-constants";
import { shouldBehaveLikeAccessControl, shouldSupportsInterface } from "@gemunion/contracts-mocha";

import {
  shouldBalanceOf,
  shouldBalanceOfBatch,
  shouldBehaveLikeERC1155Burnable,
  shouldCustomURI,
  shouldMint,
  shouldMintBatch,
  shouldSafeBatchTransferFrom,
  shouldSafeTransferFrom,
  shouldSetApprovalForAll,
} from "../../src";
import { deployErc1155Base } from "../../src/fixtures";

use(solidity);

describe("ERC1155BaseUrlTest", function () {
  const factory = () => deployErc1155Base(this.title);

  shouldBehaveLikeAccessControl(factory)(DEFAULT_ADMIN_ROLE, MINTER_ROLE);

  // base without uri
  shouldMint(factory, { minterRole: MINTER_ROLE });
  shouldMintBatch(factory, { minterRole: MINTER_ROLE });
  shouldBalanceOf(factory);
  shouldBalanceOfBatch(factory);
  shouldSetApprovalForAll(factory);
  shouldSafeTransferFrom(factory);
  shouldSafeBatchTransferFrom(factory);

  shouldCustomURI(factory);

  shouldBehaveLikeERC1155Burnable(factory);

  shouldSupportsInterface(factory)(
    InterfaceId.IERC165,
    InterfaceId.IAccessControl,
    InterfaceId.IERC1155,
    InterfaceId.IERC1155Metadata,
  );
});
