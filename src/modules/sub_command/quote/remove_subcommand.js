import SubCommand from "../sub_command.js";
import QuoteDAO from "../../quote_dao.js";

export default class RemoveSubcommand extends SubCommand {
    async process(params) {
        let message = params.message;
        let index = this.parseParams(params.index);

        try {
            if (index !== null) {
                let removed = await QuoteDAO.removeQuote(index);
                if (removed) {
                    message.channel.send(`Poof! Quote ${index} is now gone.`);
                } else {
                    throw new Error(`Failed to remove quote with index ${index}`)
                }
            } else {
                throw new Error(`Invalid remove quote param type.`);
            }
        } catch (err) {
            message.channel.send(`Fail! Invalid quote to remove.`);
        }
    }
}