import SubCommand from "../sub_command.js";
import QuoteDAO from "../../quote_dao.js";

export default class AddSubcommand extends SubCommand {
  async process(params) {
    let message = params.message;
    let quoteMsg = this.parseParams(params.quoteMsg);
    try {
      if (quoteMsg !== null && quoteMsg !== '') {
        if (quoteMsg.length <= 300) {
          await QuoteDAO.addQuote(params.author, quoteMsg);
          message.channel.send(`Poof! ${message.author}'s quote was added to the quote list.`);
        } else {
          message.channel.send(`Oof! That quote is too mighty and big. 300 characters only!`);
        }
      } else {
        throw new Error(`Invalid add quote param type.`);
      }
    } catch (err) {
      message.channel.send(`Oof! Failed to add ${message.author}'s quote.`);
    }
  }
}