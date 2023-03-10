import { DEFAULT_ADMIN_ROLE, PREDICATE_ROLE } from "@gemunion/contracts-constants";
import { shouldBehaveLikeAccessControl } from "@gemunion/contracts-mocha";
import { shouldBehaveLikeERC20 } from "@gemunion/contracts-erc20";

import { deployErc20 } from "../../src/fixtures";

describe("ERC20PolygonParentTest", function () {
  const factory = () => deployErc20(this.title);

  shouldBehaveLikeAccessControl(factory)(DEFAULT_ADMIN_ROLE, PREDICATE_ROLE);

  shouldBehaveLikeERC20(factory, { MINTER_ROLE: PREDICATE_ROLE });
});
