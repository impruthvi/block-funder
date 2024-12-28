// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

import "forge-std/Test.sol";

import "../src/CrowdFunding.sol";

contract TestContract is Test {
    CrowdFunding c;

    function setUp() public {
        c = new CrowdFunding();
    }

    function testBar() public {
        assertEq(uint256(1), uint256(1), "ok");
    }
}
