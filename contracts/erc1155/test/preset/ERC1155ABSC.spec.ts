import { DEFAULT_ADMIN_ROLE, InterfaceId, MINTER_ROLE } from "@gemunion/contracts-constants";
import { shouldBeAccessible, shouldSupportsInterface } from "@gemunion/contracts-mocha";

import { shouldBase } from "../../src/base";
import { shouldBurnable } from "../../src/burnable";
import { shouldSupply } from "../../src/supply";
import { shouldCapped } from "../../src/capped";
import { deployErc1155Base } from "../../src/fixtures";

describe("ERC1155ABSC", function () {
  const factory = () => deployErc1155Base(this.title);

  shouldBeAccessible(factory)(DEFAULT_ADMIN_ROLE, MINTER_ROLE);

  shouldBase(factory);
  shouldBurnable(factory);
  shouldSupply(factory);
  shouldCapped(factory);

  shouldSupportsInterface(factory)(
    InterfaceId.IERC165,
    InterfaceId.IAccessControl,
    InterfaceId.IERC1155,
    InterfaceId.IERC1155Metadata,
  );
});
