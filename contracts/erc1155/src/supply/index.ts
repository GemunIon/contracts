import { Contract } from "ethers";

import { shouldBurn } from "./burn";
import { shouldBurnBatch } from "./burnBatch";
import { shouldGetTotalSupply } from "./totalSupply";

export function shouldBehaveLikeERC1155Supply(factory: () => Promise<Contract>) {
  shouldBurn(factory);
  shouldBurnBatch(factory);
  shouldGetTotalSupply(factory);
}
