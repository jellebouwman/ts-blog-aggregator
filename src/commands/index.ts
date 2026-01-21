import type { CommandsRegistry, CommandHandler } from "src/types";

export function addCommandToRegistry(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler,
) {
  registry[cmdName] = handler;

  return registry;
}

export function printFeed<T extends { name: string; url: string }>(feed: T) {
  console.log(`Feed '${feed.name}' at ${feed.url}`);
}
