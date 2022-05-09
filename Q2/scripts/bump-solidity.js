const fs = require("fs");
const solidityRegex = /pragma solidity \^\d+\.\d+\.\d+/

const verifierRegex = /contract Verifier/

let helloWorldContent = fs.readFileSync("./contracts/HelloWorldVerifier.sol", { encoding: 'utf-8' });

let helloWorldbumped = helloWorldContent.replace(solidityRegex, 'pragma solidity ^0.8.0');

helloWorldbumped = helloWorldbumped.replace(verifierRegex, 'contract HelloWorldVerifier');

fs.writeFileSync("./contracts/HelloWorldVerifier.sol", helloWorldbumped);

// [assignment] add your own scripts below to modify the other verifier contracts you will build during the assignment

let multiplier3Content = fs.readFileSync("./contracts/Multiplier3Verifier.sol", { encoding: 'utf-8' });

let multiplier3Bumped = multiplier3Content.replace(solidityRegex, 'pragma solidity ^0.8.0');

multiplier3Bumped = multiplier3Bumped.replace(verifierRegex, "contract Multiplier3Verifier")

fs.writeFileSync("./contracts/Multiplier3Verifier.sol", multiplier3Bumped)
