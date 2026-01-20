import { readConfig } from "src/config";
import { createFeed } from "src/lib/db/queries/feeds";
import { getUser } from "src/lib/db/queries/users";
import { printFeed } from ".";

export async function addFeedCommand(
  _commandName: string,
  name: string,
  url: string,
) {
  const currentUser = await getUser(readConfig().currentUserName);

  if (!name) {
    throw new Error("Need a name to add a feed.");
  }

  if (!url) {
    throw new Error("Need a url to add a feed.");
  }

  const newFeed = await createFeed(name, url, currentUser.id);

  printFeed(newFeed);
}
