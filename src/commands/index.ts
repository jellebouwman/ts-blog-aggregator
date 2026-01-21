import type { CommandsRegistry, CommandHandler } from "src/types";

export * from "./add-feed";
export * from "./aggregate";
export * from "./feeds";
export * from "./follow";
export * from "./following";
export * from "./login";
export * from "./register";
export * from "./reset";
export * from "./users";

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
