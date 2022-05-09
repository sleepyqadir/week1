const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const { plonk } = require("snarkjs");

function unstringifyBigInts(o) {
  if ((typeof (o) == "string") && (/^[0-9]+$/.test(o))) {
    return BigInt(o);
  } else if ((typeof (o) == "string") && (/^0x[0-9a-fA-F]+$/.test(o))) {
    return BigInt(o);
  } else if (Array.isArray(o)) {
    return o.map(unstringifyBigInts);
  } else if (typeof o == "object") {
    if (o === null) return null;
    const res = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      res[k] = unstringifyBigInts(o[k]);
    });
    return res;
  } else {
    return o;
  }
}

describe("LessThan10", function () {
  let Verifier;
  let verifier;

  beforeEach(async function () {
    Verifier = await ethers.getContractFactory("PlonkVerifier");
    verifier = await Verifier.deploy();
    await verifier.deployed();
  })


  it("Should verify true and return 0 for value greater than ten", async () => {
    const { proof, publicSignals } = await plonk.fullProve({ "in": "17" }, "contracts/circuits/LessThan10/LessThan10_js/LessThan10.wasm", "contracts/circuits/LessThan10/circuit_final.zkey")

    const editedProof = unstringifyBigInts(proof)

    const editedPublicSignals = unstringifyBigInts(publicSignals);

    const calldata = await plonk.exportSolidityCallData(editedProof, editedPublicSignals)

    const argv = calldata.replace(/["[\]\s]/g, "").split(',')

    const a = argv[0]
    const b = parseInt(argv[1])

    expect(b).to.equals(0)
    expect(await verifier.verifyProof(a, [b])).to.be.true

  })

  it("Should verify true and return 1 for value less than ten", async () => {
    const { proof, publicSignals } = await plonk.fullProve({ "in": "5" }, "contracts/circuits/LessThan10/LessThan10_js/LessThan10.wasm", "contracts/circuits/LessThan10/circuit_final.zkey")

    const editedProof = unstringifyBigInts(proof)

    const editedPublicSignals = unstringifyBigInts(publicSignals);

    const calldata = await plonk.exportSolidityCallData(editedProof, editedPublicSignals)


    const argv = calldata.replace(/["[\]\s]/g, "").split(',')

    const a = argv[0]
    const b = parseInt(argv[1])
    expect(b).to.equals(1)
    expect(await verifier.verifyProof(a, [b])).to.be.true
  })

});