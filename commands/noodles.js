// TODO: ADD HEADER COMMENTS
// TODO: COMMENT FILE

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require("fs");
const { parse } = require("csv-parse");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('noodles')
		.setDescription('Outputs a random ramen noodle review.'),
	async execute(interaction) {
        await interaction.deferReply();
        
        var num = Math.floor(Math.random() * (501 - 1) + 1).toString();

        var noodle = ["1", "hello", "hello", "hello", "hello", "hello"];
        const promise = new Promise((resolve, reject) => {
            fs.createReadStream("./ramen/ramen-ratings.csv")
                .pipe(parse({ delimiter: ",", from_line: 2 }))
                .on("data", function (row) {
                    if (row[0] == num) {
                        noodle = row;
                        resolve();
                    }
                })
        })

        await promise.then(() => { 
            global.noodleEmbed = new EmbedBuilder()
			.setColor("#FDFD96")
			.setTitle(noodle[2])
            .addFields(
                { name: "Brand", value: noodle[1] },
                { name: "Style", value: noodle[3] },
                { name: "Country of Origin", value: noodle[4] },
                { name: "Rating", value: `${noodle[5]} \u2605`},
                { name: "Thanks to:", value: "Many thanks to Hans Lienesch and The Ramen Rater at https://www.theramenrater.com/ for their fantastic noodle reviews!"}
            )
			.setTimestamp()
        })

		await interaction.editReply({embeds: [noodleEmbed]});
	},
};
