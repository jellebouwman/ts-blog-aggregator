export type CommandHandler = (command: string, ...args: string[]) => void;

export type CommandsRegistry = Record<string, CommandHandler>;
