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

    /**
     * @dev Mapping to store campaigns with their IDs.
     */
    mapping(uint256 => Campaign) public campaigns;

    /**
     * @dev Counter for the number of campaigns created.
     */
    uint256 public numberOfCampaigns = 0;

    /**
     * @dev Event emitted when a new campaign is created.
     * @param campaignId ID of the created campaign.
     * @param owner Address of the campaign owner.
     * @param target Target amount to be raised.
     */
    event CampaignCreated(
        uint256 indexed campaignId,
        address indexed owner,
        uint256 target
    );

    /**
     * @dev Event emitted when a donation is received.
     * @param campaignId ID of the campaign.
     * @param donor Address of the donor.
     * @param amount Amount donated.
     */
    event DonationReceived(
        uint256 indexed campaignId,
        address indexed donor,
        uint256 amount
    );

    /**
     * @dev Even.
     * @param campaignId ID of the closed campaign.
     */
    event CampaignClosed(uint256 indexed campaignId);

    /**
     * @dev Modifier to check if a campaign exists.
     * @param _id ID of the campaign.
     */
    modifier campaignExists(uint256 _id) {
        require(_id < numberOfCampaigns, "Campaign does not exist");
        _;
    }

    /**
     * @dev Modifier to check if a campaign is active and not ended.
     * @param _id ID of the campaign.
     */
    modifier activeCampaign(uint256 _id) {
        require(campaigns[_id].isActive, "Campaign is not active");
        require(
            block.timestamp <= campaigns[_id].deadline,
            "Campaign has ended"
        );
        _;
    }

    /**
     * @notice Creates a new crowdfunding campaign.
     * @param _owner The address of the campaign owner.
     * @param _title The title of the campaign.
     * @param _description A brief description of the campaign.
     * @param _target The target amount to be raised in the campaign.
     * @param _deadline The deadline timestamp by which the target amount should be raised.
     * @param _image A URL to an image representing the campaign.
     * @return The ID of the newly created campaign.
     * @dev Emits a {CampaignCreated} event upon successful creation.
     * @dev Reverts if the owner address is invalid, the title is empty, the target amount is zero, or the deadline is not in the future.
     */
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

    /**
     * @notice Allows a user to donate to a specific campaign.
     * @dev This function can only be called if the campaign exists and is active.
     * @param _id The ID of the campaign to donate to.
     * Requirements:
     * - The donation amount must be greater than 0.
     * - The campaign must exist and be active.
     *
     * Effects:
     * - Adds the sender to the list of donators for the campaign.
     * - Adds the donation amount to the list of donations for the campaign.
     * - Transfers the donation amount to the campaign owner.
     * - Increases the total amount collected for the campaign.
     * - If the campaign's target amount is reached or exceeded, the campaign is marked as inactive and a `CampaignClosed` event is emitted.
     *
     * Emits:
     * - `DonationReceived` event when a donation is successfully made.
     * - `CampaignClosed` event if the campaign's target amount is reached or exceeded.
     */
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

    /**
     * @dev Returns the list of donators and their corresponding donation amounts for a specific campaign.
     * @param _id The ID of the campaign.
     * @return An array of addresses representing the donators and an array of uint256 representing the donation amounts.
     */
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

    /**
     * @dev Returns an array of all campaigns.
     * @return An array of Campaign structs representing all the campaigns.
     */
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);

        for (uint i = 0; i < numberOfCampaigns; i++) {
            allCampaigns[i] = campaigns[i];
        }

        return allCampaigns;
    }

    /**
     * @notice Closes an active campaign.
     * @dev This function can only be called by the owner of the campaign.
     * @param _id The unique identifier of the campaign to be closed.
     * @require The caller must be the owner of the campaign.
     * @require The campaign must be active.
     * @emit CampaignClosed Emits an event when the campaign is successfully closed.
     */
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
