import SubCommand from "../sub_command.js";
import QuoteDAO from "../../quote_dao.js";
import QuoteEmbed from "../../../views/quote_embed.js";

export default class ListSubcommand extends SubCommand {
    async process(params) {
        let message = params.message;
        let startAt = this.parseParams(params.startAt);

        try {
            // check input and use 0 if bigger than amount of quotes
            const stats = await QuoteDAO.getQuoteStats();
            const numberOfQuotes = stats.number_of_quotes;
            if (startAt > numberOfQuotes || startAt <= 0) {
                startAt = 1;
            }

            // check total quotes and update upper limit
            let endAt = startAt + QuoteDAO.QUOTES_PER_LISTING;
            if (startAt + endAt > numberOfQuotes) {
                endAt = numberOfQuotes;
            }

            // fetch view and send
            const quotes = await QuoteDAO.getQuotes(startAt);
            const embed = await QuoteEmbed.getQuoteListEmbed(quotes, startAt, endAt, numberOfQuotes);
            message.channel.send({ embed: embed })
        } catch (err) {
            message.channel.send(`Fail! Could not list quotes.`);
        }
    }
}