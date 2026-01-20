import { feeds } from "src/lib/db/schema";
import type { CommandsRegistry, CommandHandler } from "src/types";

export function addCommandToRegistry(
  registry: CommandsRegistry,
  cmdName: string,
  handler: CommandHandler,
) {
  registry[cmdName] = handler;

  return registry;
}

type Feed = typeof feeds.$inferSelect;
export function printFeed(feed: Feed) {
  console.log({ feed });
}
