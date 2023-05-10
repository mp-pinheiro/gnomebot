/* eslint-disable no-case-declarations */
import logger from "../util/logger.js"
import AddSubcommand from "../modules/sub_command/quote/add_subcommand.js";
import RemoveSubcommand from "../modules/sub_command/quote/remove_subcommand.js";
import ListSubcommand from "../modules/sub_command/quote/list_subcommand.js";
import RandomSubcommand from "../modules/sub_command/quote/random_subcommand.js";
import HelpSubcommand from "../modules/sub_command/quote/help_subcommand.js";

function parseCommand(cmd) {
    // remove bot and quote commands
    cmd = cmd.replace("!gnome ", "");
    cmd = cmd.replace("quote ", "");

    // split and get operation + message
    let split = cmd.split(" ");
    let op = split[0];
    let params = split.slice(1, split.length).join(" ");

    return {
        'operation': op.toLowerCase(),
        'params': params
    };
}

export default {
    name: "quote",
    desc: "Adds, displays and lists quotes created by users.",
    /**
     *
     * @param {Message} message
     * @param {Array<String>} args
     */
    // eslint-disable-next-line no-unused-vars
    async execute(message, args) {
        try {
            // parse command
            let content = message.content;
            let parsed = parseCommand(content);

            // execute operation
            switch (parsed.operation) {
                case 'add':
                    let addSubcommand = new AddSubcommand('string');
                    await addSubcommand.process({
                        'message': message,
                        'quoteMsg': parsed.params
                    });
                    break;
                case 'remove':
                    let removeSubcommand = new RemoveSubcommand('number', parseInt);
                    await removeSubcommand.process({
                        'message': message,
                        'index': parsed.params
                    });
                    break;
                case 'list':
                    let listSubcommand = new ListSubcommand('number', parseInt, 1);
                    await listSubcommand.process({
                        'message': message,
                        'startAt': parsed.params
                    });
                    break;
                case 'random':
                    let randomSubcommand = new RandomSubcommand('string', null, '');
                    await randomSubcommand.process({
                        'message': message
                    });
                    break;
                case 'help':
                default:
                    let helpSubcommand = new HelpSubcommand('string', null, '');
                    await helpSubcommand.process({
                        'message': message
                    });
                    break;
            }
            message.channel.send(phrase);
        } catch (err) {
            logger.log("An error occured in quote command");
        }
    },
}
