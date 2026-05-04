const assert = require("node:assert/strict");
const { normalizeAbiText } = require("./abi-normalizer");

const input = `[{
  type: "event",
  name: "Deposited",
  inputs: [{
    name: "user",
    type: "address",
    indexed: !0,
    internalType: "address"
  }, {
    name: "amount",
    type: "uint256",
    indexed: !1,
    internalType: "uint256"
  }],
  anonymous: !1
}, {
  type: "function",
  name: "getUserMintEvents",
  inputs: [{ name: "user", type: "address", internalType: "address" }],
  outputs: [{
    name: "",
    type: "tuple[]",
    internalType: "struct BCFStaking.MintEvent[]",
    components: [{
      name: "amount",
      type: "uint256",
      internalType: "uint256"
    }]
  }],
  stateMutability: "view",
}]`;

const output = normalizeAbiText(input);
const abi = JSON.parse(output);

assert.equal(abi.length, 2);
assert.equal(abi[0].inputs[0].indexed, true);
assert.equal(abi[0].inputs[1].indexed, false);
assert.equal(abi[0].anonymous, false);
assert.equal(abi[1].outputs[0].components[0].name, "amount");
assert.match(output, /"indexed": true/);
assert.doesNotMatch(output, /!0|!1/);

console.log("abi normalizer tests passed");
