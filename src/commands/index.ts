import type { CommandsRegistry, CommandHandler } from "src/types";

export function addCommandToRegistry(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler,
) {
  registry[cmdName] = handler;

  return registry;
}
