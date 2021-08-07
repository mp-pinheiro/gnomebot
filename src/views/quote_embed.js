import { MessageEmbed } from "discord.js"
import { COMMAND_PREFIX } from "../constants.js"

// TODO: we should add a class for each embed
// that way each view has its own class
// would be way cleaner
// but that's starting to sound like a job
export default class QuoteEmbed {
  static createBaseMessageEmbed() {
    return new MessageEmbed()
      .setColor('#8F00FF');
  }

  static async getQuoteListEmbed(quotes, startAt, endAt, numberOfQuotes) {
    let embed = this.createBaseMessageEmbed()
      .setTitle('Quote List')
      .setDescription('Lists current existing quotes.');

    console.log('quotes', quotes)
    if (quotes.length > 0) {
      for (const [i, quote] of quotes.entries()) {
        embed
          .setFooter(`Showing quotes ${startAt} through ${endAt} (total: ${numberOfQuotes}). ${COMMAND_PREFIX} quote list <number> to see more quotes`)
          .addFields(
            { name: `${quote.index}. ${quote.author} (${quote.date})`, value: `${quote.quote}` }
          );
      }
    } else {
      // no quotes
      embed
        .setFooter(`After adding some quotes, you can fetch a random one using the ${COMMAND_PREFIX} quote random command`)
        .addFields(
          { name: 'No quotes!', value: `You can add quotes by typing \`${COMMAND_PREFIX} quote add <YOUR QUOTE>\`` }
        );
    }

    return embed;
  }

  static async getRandomQuoteEmbed(quote) {
    let embed = this.createBaseMessageEmbed()
      .setTitle('Random Quote')
      .setFooter(`You can look at the quote list with the ${COMMAND_PREFIX} quote list <number>`)
      .addFields(
        { name: `${quote.author} (${quote.date})`, value: `${quote.quote}` }
      );

    return embed;
  }

  static async getHelpQuoteEmbed(quote) {
    let embed = this.createBaseMessageEmbed()
      .setTitle('Help')
      .setFooter(`Emojis are supported! You can do things like ${COMMAND_PREFIX} quote add 👅🍑💦`)
      .addFields(
        // TODO: we should 100% have a subcommand controller and feed the help strings into it
        // so that adding new features doesn't entail in updating this shitty view everytime
        // see the other TODO in the beginning of this file

        // add
        { name: 'Command', value: 'add', inline: true },
        { name: 'Description', value: 'Adds a new quote to the list', inline: true },
        { name: 'Input', value: 'Text', inline: true },
        { name: 'Example', value: `${COMMAND_PREFIX} quote add morreu mamando 🍼`, inline: true },

        // line break
        { name: '\u200B', value: '\u200B' },

        // list
        { name: 'Command', value: 'list', inline: true },
        { name: 'Description', value: 'List 5 quotes. Will use the number given as starting point', inline: true },
        { name: 'Input', value: 'Number', inline: true },
        { name: 'Example', value: `${COMMAND_PREFIX} quote list 2`, inline: true },

        // line break
        { name: '\u200B', value: '\u200B' },

        // remove
        { name: 'Command', value: 'remove', inline: true },
        { name: 'Description', value: 'Removes a quote. Will use the index displayed in list command', inline: true },
        { name: 'Input', value: 'Number', inline: true },
        { name: 'Example', value: `${COMMAND_PREFIX} quote remove 1`, inline: true },

        // line break
        { name: '\u200B', value: '\u200B' },

        // remove
        { name: 'Command', value: 'random', inline: true },
        { name: 'Description', value: 'Displays a random quote', inline: true },

        // line break
        { name: '\u200B', value: '\u200B' },

        // help
        { name: 'Command', value: 'help', inline: true },
        { name: 'Description', value: 'Displays this message', inline: true },
      );

    return embed;
  }
}
