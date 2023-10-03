const { network } = require("hardhat");
const verify = require("../utils/verify");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const developmentChains = ["hardhat", "localhost"];
    const INITIAL_SUPPLY = "1000000000000000000000000"
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const ourToken = await deploy("OurToken", {
        from: deployer,
        args: [INITIAL_SUPPLY],
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })
    log(`Token deployed at ${ourToken.address}`);

    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(ourToken.address, [INITIAL_SUPPLY]);
    }
};

module.exports.tags = ["all", "token"];
