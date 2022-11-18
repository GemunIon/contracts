import { use } from "chai";
import { solidity } from "ethereum-waffle";

import { DEFAULT_ADMIN_ROLE, InterfaceId, MINTER_ROLE } from "@gemunion/contracts-constants";
import { shouldBeAccessible, shouldSupportsInterface } from "@gemunion/contracts-mocha";

import { shouldERC721Burnable } from "../../src/basic/burnable/burn";
import { shouldERC721Storage } from "../../src/basic/storage/storage";
import { shouldERC721Capped } from "../../src/basic/capped/capped";
import { shouldERC721Base } from "../../src/basic/base";
import { shouldERC721Royalty } from "../../src/basic/royalty";
import { deployErc721Base } from "../../src/fixtures";

use(solidity);

describe("ERC721ABCRS", function () {
  const factory = () => deployErc721Base(this.title);

  shouldERC721Base(factory);
  shouldBeAccessible(factory)(DEFAULT_ADMIN_ROLE, MINTER_ROLE);
  shouldERC721Burnable(factory);
  shouldERC721Capped(factory);
  shouldERC721Royalty(factory);
  shouldERC721Storage(factory);

  shouldSupportsInterface(factory)(
    InterfaceId.IERC165,
    InterfaceId.IAccessControl,
    InterfaceId.IERC721,
    InterfaceId.IERC721Metadata,
    InterfaceId.IRoyalty,
  );
});
