require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "embed",
    description: "Sends an embedded message",
  },
  {
    name: "calculate",
    description: "Performs a basic arithmetic operation",
    options: [
      {
        name: "num1",
        description: "First number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "operator",
        description: "Choose the operator",
        type: ApplicationCommandOptionType.String,
        choices: [
          {
            name: "Addition (+)",
            value: "+",
          },
          {
            name: "Subtraction (-)",
            value: "-",
          },
          {
            name: "Multiplication (*)",
            value: "*",
          },
          {
            name: "Division (/)",
            value: "/",
          },
        ],
        required: true,
      },
      {
        name: "num2",
        description: "Second number",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

async function registerCommands() {
  try {
    console.log("Registering slash commands for a specific guild...");

    // Register commands for a specific guild
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ), // Provide GUILD_ID
      { body: commands }
    );

    console.log("Slash commands were registered successfully for the guild!");
  } catch (error) {
    console.error(`There was an error: ${error}`);
  }
}

registerCommands();
