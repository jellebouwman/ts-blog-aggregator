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

export type CommandsRegistry = Record<string, CommandHandler>;

export type User = {
  id: string;
  name: string;
};

export type Feed = typeof feeds.$inferSelect;
