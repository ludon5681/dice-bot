// TODO: ADD HEADER COMMENTS
// TODO: TAKE INTO ACCOUNT MODIFIERS

// discord.js imports
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

// exported to the index.js file
module.exports = {
	// builds a slash command
	data: new SlashCommandBuilder()
		// sets the name of the slash command (displayed to the user before it's used)
		.setName('roll')
		// sets the description of the slash command (displayed to the user before it's used)
		.setDescription('Rolls a die.')
		// adds an option, basically an argument that can get passed to the function when the command is executed
		.addIntegerOption(option =>
			// sets the name of the option
			option.setName('die')
				// sets the description of the option
				.setDescription('The die to roll.')
				// marks the option as required - the usre won't be able to execute the command without specifying it
				.setRequired(true)
				// not required - gives the user a set of input options rather than a text or number input
				.addChoices(
					{ name: "d20", value: 21 },
					{ name: "d100", value: 101},
					{ name: "d12", value: 13 },
					{ name: "d10", value: 11 },
					{ name: "d8", value: 9 },
					{ name: "d6", value: 7 },
					{ name: "d4", value: 5 },
					{ name: "d2", value: 3 },
				))
		.addStringOption(option => 
			option.setName("modifier")
				.setDescription("A modifier to be added to the final roll.")
		),
	// function to execute when the command runs
	async execute(interaction) {
		// get the value from the option
		const die = interaction.options.getInteger("die");


		// get the value from the modifier option - ?? operator sets a default value if the value is null
		var mod = interaction.options.getString("modifier") ?? "0";
		var modReplace = mod.replace(/[a-z]|[A-Z]|\+/gm, '');
		if (modReplace === "") {
			modReplace = 0;
		}


		// generates a random number based on the die selected "* (die - 1) + 1" sets the random number to be within a set 
		// range and takes a format of "* (max - min) + min
		var roll = (Math.floor(Math.random() * (die - 1) + 1));
		var strRollMod = (roll + parseInt(modReplace)).toString()
		
		// sets the default color of the embed
		var color = "82d1f1";

		// if the roll is a d20, set other embed colors based on the result
		if (die == 21) {
			if (strRollMod > 9) {
				color = "#6fc276";
			} else {
				color = "#ec0b00";
			}
		}

		// builds the embed to be sent by the bot
		const diceEmbed = new EmbedBuilder()
			// sets the color
			.setColor(color)
			// sets the title - this one has added complexity because some numbers start with vowels and some don't and thus
			// require a or an, depending
			.setTitle(strRollMod == 8 | strRollMod == 11 | strRollMod == 18 ? `Rolled an ${strRollMod}!` : `Rolled a ${strRollMod}!`)
			// set a description of what happened
			.setDescription(`Rolled a d${die - 1}`)
			.addFields(
				{ name: "Roll", value: roll.toString() },
				{ name: "Modifier", value: `${modReplace < 0 ? "" : "+"}${modReplace.toString()}` }
			)
			// add a timestamp to the embed
			.setTimestamp()
			
		// reply using the embed
		await interaction.reply({embeds: [diceEmbed]});
	},
};

