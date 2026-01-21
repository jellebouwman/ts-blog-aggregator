import { feeds } from "./lib/db/schema";

export type UserCommandHandler = (
  cmdName: string,
  username: User,
  ...args: string[]
) => Promise<void>;

export type CommandHandler = (
  command: string,
  ...args: string[]
) => Promise<void>;

export type CommandInfo = {
  handler: CommandHandler;
  description: string;
};

export type CommandsRegistry = Record<string, CommandInfo>;

export type User = {
  id: string;
  name: string;
};

export type Feed = typeof feeds.$inferSelect;
