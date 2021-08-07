import SubCommand from "../sub_command.js";
import QuoteDAO from "../../quote_dao.js";
import QuoteEmbed from "../../../views/quote_embed.js";

export default class RandomSubcommand extends SubCommand {
  async process(params) {
    let message = params.message;

    try {
      const quote = await QuoteDAO.getRandomQuote();
      const embed = await QuoteEmbed.getHelpQuoteEmbed(quote);
      message.channel.send({ embed: embed });
    } catch (err) {
      message.channel.send(`Oof! Failed to fetch a random quote.`);
    }
  }
}