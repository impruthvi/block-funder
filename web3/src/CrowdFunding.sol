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

    uint256 public numberOfCampaigns = 0;

    /**
     * @notice Creates a new crowdfunding campaign.
     * @param _owner The address of the campaign owner.
     * @param _title The title of the campaign.
     * @param _description A brief description of the campaign.
     * @param _target The funding target for the campaign in wei.
     * @param _deadline The deadline for the campaign in Unix timestamp.
     * @param _image A URL to an image representing the campaign.
     * @return The ID of the newly created campaign.
     * @dev The deadline must be a date in the future.
     */
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(
            _deadline > block.timestamp,
            "The deadline should be a date in the future"
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    /**
     * @notice Allows a user to donate to a specific campaign.
     * @dev The function accepts Ether and transfers it to the campaign owner.
     *      It also updates the campaign's donators and donations arrays, and the total amount collected.
     * @param _id The ID of the campaign to donate to.
     */
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }
    function getDonators() public {}
    function getCampaigns() public {}
}
