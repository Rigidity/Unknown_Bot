import { Category } from "../catagories";
import { Command } from "../command";

const clear: Command = {
    name: "clear",
    category: Category.Moderation,
    description: "Clears {number} of messages from a channel",
    useage: `purge {number}`,
    run: async (message, ...args) => {
        if (!message.member?.permissions.has("MANAGE_MESSAGES")) {
            await message.reply("You dont have permission to use this");
            return;
        }
        if (!args.length) {
            await message.reply("No Arguments Given");
            return;
        }
        if (!+args[0] || +args[0] < 2 || +args[0] > 100) {
            console.log(args);
            await message.reply("Please give a vaild number");
            return;
        }
        if (message.channel.type !== "DM") {
            await message.channel.bulkDelete(+args[0], true);
            const reply = await message.channel.send(
                `${args[0]} messages deleted`
            );
            setTimeout(() => reply.delete().catch(() => {}), 5000);
        }
    },
};

export default clear;
