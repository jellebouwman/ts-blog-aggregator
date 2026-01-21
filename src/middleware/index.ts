import { readConfig } from "src/config";
import { getUser } from "src/lib/db/queries/users";
import { CommandHandler, UserCommandHandler } from "src/types";

export function middlewareLoggedIn(
  handler: UserCommandHandler,
): CommandHandler {
  return async (commandName: string, ...args: string[]) => {
    const username = readConfig().currentUserName;
    const user = await getUser(username);

    if (!user) {
      throw new Error(`User ${username} not found`);
    }

    await handler(commandName, user, ...args);
  };
}
