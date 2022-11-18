import { DEFAULT_ADMIN_ROLE, PREDICATE_ROLE } from "@gemunion/contracts-constants";
import { shouldBeAccessible } from "@gemunion/contracts-mocha";
import { deployErc20Base, shouldERC20Base } from "@gemunion/contracts-erc20";

describe("ERC20PolygonParentTest", function () {
  const factory = () => deployErc20Base(this.title);

  shouldBeAccessible(factory)(DEFAULT_ADMIN_ROLE, PREDICATE_ROLE);

  shouldERC20Base(factory, { MINTER_ROLE: PREDICATE_ROLE });
});