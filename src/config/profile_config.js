export const PROFILE_CONTRACT_ADDRESS =
  "0x01AAA88c8E5F4a693fFEA0e1b97f655B6abfE84F";

export const ABI = [
  "constructor()",
  "event Approval(address indexed,address indexed,uint256 indexed)",
  "event ApprovalForAll(address indexed,address indexed,bool)",
  "event Transfer(address indexed,address indexed,uint256 indexed)",
  "event profileCreated(address,uint256)",
  "function approve(address,uint256)",
  "function balanceOf(address) view returns (uint256)",
  "function getApproved(uint256) view returns (address)",
  "function getProfileDetails(uint256) view returns (tuple(string,string,string))",
  "function isApprovedForAll(address,address) view returns (bool)",
  "function mintProfile(string,string,string)",
  "function mintedProfile(address) view returns (bool)",
  "function name() view returns (string)",
  "function ownerOf(uint256) view returns (address)",
  "function profileDetails(uint256) view returns (string, string, string)",
  "function safeTransferFrom(address,address,uint256)",
  "function safeTransferFrom(address,address,uint256,bytes)",
  "function setApprovalForAll(address,bool)",
  "function setDescription(string)",
  "function setName(string)",
  "function setUri(string)",
  "function supportsInterface(bytes4) view returns (bool)",
  "function symbol() view returns (string)",
  "function tokenByIndex(uint256) view returns (uint256)",
  "function tokenOfOwnerByIndex(address,uint256) view returns (uint256)",
  "function tokenURI(uint256) view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function transferFrom(address,address,uint256)",
];