import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "IPL Data Fetcher",
  version: "1.0.0",
});

// IPL Data function

async function getIPLByTeam(team = "") {
  const teamData = {
    chennai: {
      trophy: "5",
      captain: "Ruturaj Gaikwad",
      homeGround: "M. A. Chidambaram Stadium",
      teamColors: "Yellow",
      established: "2008",
      nickname: "Super Kings",
      lastTitle: "2023",
    },
    mumbai: {
      trophy: "5",
      captain: "Hardik Pandya",
      homeGround: "Wankhede Stadium",
      teamColors: "Blue and Gold",
      established: "2008",
      nickname: "MI",
      lastTitle: "2020",
    },
    gujarat: {
      trophy: "1",
      captain: "Shubman Gill",
      homeGround: "Narendra Modi Stadium",
      teamColors: "Navy Blue and Gold",
      established: "2022",
      nickname: "Titans",
      lastTitle: "2022",
    },
    bangalore: {
      trophy: "0",
      captain: "Faf du Plessis",
      homeGround: "M. Chinnaswamy Stadium",
      teamColors: "Red and Gold",
      established: "2008",
      nickname: "Royal Challengers",
      lastTitle: "Never",
    },
    kolkata: {
      trophy: "2",
      captain: "Shreyas Iyer",
      homeGround: "Eden Gardens",
      teamColors: "Purple and Gold",
      established: "2008",
      nickname: "Knight Riders",
      lastTitle: "2014",
    },
    delhi: {
      trophy: "0",
      captain: "Rishabh Pant",
      homeGround: "Arun Jaitley Stadium",
      teamColors: "Red and Blue",
      established: "2008",
      nickname: "Capitals",
      lastTitle: "Never",
    },
    punjab: {
      trophy: "0",
      captain: "Shikhar Dhawan",
      homeGround: "Mullanpur Cricket Stadium",
      teamColors: "Red and Silver",
      established: "2008",
      nickname: "Kings",
      lastTitle: "Never",
    },
    rajasthan: {
      trophy: "1",
      captain: "Sanju Samson",
      homeGround: "Sawai Mansingh Stadium",
      teamColors: "Pink and Blue",
      established: "2008",
      nickname: "Royals",
      lastTitle: "2008",
    },
    hyderabad: {
      trophy: "1",
      captain: "Pat Cummins",
      homeGround: "Rajiv Gandhi International Cricket Stadium",
      teamColors: "Orange and Black",
      established: "2013",
      nickname: "Sunrisers",
      lastTitle: "2016",
    },
    lucknow: {
      trophy: "0",
      captain: "KL Rahul",
      homeGround: "BRSABV Ekana Cricket Stadium",
      teamColors: "Mint Green and Black",
      established: "2022",
      nickname: "Super Giants",
      lastTitle: "Never",
    },
  };

  const serachTeam = team.toLowerCase();
  if (teamData[serachTeam]) {
    return teamData[serachTeam];
  }
  return {
    trophy: null,
    error: "Team not found",
  };
}

// registering a tool

server.tool("getIPLDataByTeam", { team: z.string() }, async ({ team }) => {
  return {
    content: [{ type: "text", text: JSON.stringify(await getIPLByTeam(team)) }],
  };
});

async function init() {
  // Start receiving messages on stdin and sending messages on stdout
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

init();
