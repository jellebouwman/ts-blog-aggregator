import type { CommandsRegistry, CommandHandler } from "src/types";

export function registerCommand(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler,
) {
  registry[cmdName] = handler;

  return registry;
}

function runCommand(
  registry: CommandsRegistry,
  cmdName: string,
  ...args: string[]
) {}
