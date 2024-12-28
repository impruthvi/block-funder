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
        bool isActive;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public numberOfCampaigns = 0;

    event CampaignCreated(
        uint256 indexed campaignId,
        address indexed owner,
        uint256 target
    );
    event DonationReceived(
        uint256 indexed campaignId,
        address indexed donor,
        uint256 amount
    );
    event CampaignClosed(uint256 indexed campaignId);

    modifier campaignExists(uint256 _id) {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        _;
    }

    modifier activeCampaign(uint256 _id) {
        require(campaigns[_id].isActive, "Campaign is not active");
        require(
            block.timestamp <= campaigns[_id].deadline,
            "Campaign has ended"
        );
        _;
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        require(_owner != address(0), "Invalid owner address");
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_target > 0, "Target amount must be greater than 0");
        require(
            _deadline > block.timestamp,
            "The deadline should be a date in the future"
        );

        Campaign storage campaign = campaigns[numberOfCampaigns];

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.description = _description;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;
        campaign.isActive = true;

        emit CampaignCreated(numberOfCampaigns, _owner, _target);

        numberOfCampaigns++;
        return numberOfCampaigns - 1;
    }

    function donateToCampaign(
        uint256 _id
    ) public payable campaignExists(_id) activeCampaign(_id) {
        require(msg.value > 0, "Donation amount must be greater than 0");

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);

        (bool sent, ) = payable(campaign.owner).call{value: msg.value}("");
        require(sent, "Failed to send Ether");

        campaign.amountCollected += msg.value;

        if (campaign.amountCollected >= campaign.target) {
            campaign.isActive = false;
            emit CampaignClosed(_id);
        }

        emit DonationReceived(_id, msg.sender, msg.value);
    }

    function getDonators(
        uint256 _id
    )
        public
        view
        campaignExists(_id)
        returns (address[] memory, uint256[] memory)
    {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }

    function closeCampaign(uint256 _id) public campaignExists(_id) {
        Campaign storage campaign = campaigns[_id];
        require(
            msg.sender == campaign.owner,
            "Only campaign owner can close campaign"
        );
        require(campaign.isActive, "Campaign is already closed");

        campaign.isActive = false;
        emit CampaignClosed(_id);
    }
}
