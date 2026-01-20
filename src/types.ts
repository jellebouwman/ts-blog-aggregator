export type CommandHandler = (
  command: string,
  ...args: string[]
) => Promise<void>;

export type CommandsRegistry = Record<string, CommandHandler>;
