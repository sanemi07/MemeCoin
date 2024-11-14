const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TokenModule = buildModule("Token", (m) => {  // Changed TokenModule to "Token"
    const token = m.contract("HeraPheriCoin");
    return { token };
});

module.exports = TokenModule;