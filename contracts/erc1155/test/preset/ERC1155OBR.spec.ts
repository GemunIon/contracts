import { use } from "chai";
import { solidity } from "ethereum-waffle";

import { InterfaceId } from "@gemunion/contracts-constants";
import { shouldBehaveLikeOwnable, shouldSupportsInterface } from "@gemunion/contracts-mocha";

import { shouldBehaveLikeERC1155, shouldBehaveLikeERC1155Royalty } from "../../src";
import { deployErc1155Base } from "../../src/fixtures";

use(solidity);

describe("ERC1155OBR", function () {
  const factory = () => deployErc1155Base(this.title);

  shouldBehaveLikeOwnable(factory);

  shouldBehaveLikeERC1155(factory);
  shouldBehaveLikeERC1155Royalty(factory);

  shouldSupportsInterface(factory)(
    InterfaceId.IERC165,
    InterfaceId.IERC1155,
    InterfaceId.IERC1155Metadata,
    InterfaceId.IRoyalty,
  );
});
