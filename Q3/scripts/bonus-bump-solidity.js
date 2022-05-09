const fs = require("fs");
const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/

const verifierRegex = /contract Verifier/

let content = fs.readFileSync("./contracts/SystemOfEquationsVerifier.sol", { encoding: 'utf-8' });
let bumped = content.replace(solidityRegex, 'pragma solidity ^0.8.0');
bumped = bumped.replace(verifierRegex, 'contract SystemOfEquationsVerifier');

let lessThan10Content = fs.readFileSync("./contracts/LessThan10Verifier.sol", { encoding: 'utf-8' })


fs.writeFileSync("./contracts/SystemOfEquationsVerifier.sol", bumped);