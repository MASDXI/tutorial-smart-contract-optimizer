const { behavior } = require("./behavior.test");
const { benchmark } = require("./benchmark.test");

describe(`testing contract`, async function () {
  behavior(`MyToken20_1`);

  // bechmark
  benchmark(`MyToken20_1`);
  benchmark(`MyToken20_2`);
  benchmark(`MyToken20_3`);
  benchmark(`MyToken20_4`);
  benchmark(`MyToken20_5`);
  benchmark(`MyToken20_6`);
});
