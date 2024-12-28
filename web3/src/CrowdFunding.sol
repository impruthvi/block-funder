// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.13;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 numberOfCampaigns = 0;

    function createCampaign() public {}
    function donateToCampaign() public {}
    function getDonators() public {}
    function getCampaigns() public {}
}
