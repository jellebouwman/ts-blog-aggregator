import { createFeed } from "src/lib/db/queries/feeds";
import { printFeed } from ".";
import { createFeedFollow } from "src/lib/db/queries/feed-follow";
import { User } from "src/types";

export async function addFeedCommand(
  _commandName: string,
  user: User,
  name: string,
  url: string,
) {
  if (!name) {
    throw new Error("Need a name to add a feed.");
  }

  if (!url) {
    throw new Error("Need a url to add a feed.");
  }

  const newFeed = await createFeed(name, url, user.id);
  const newFeedFollow = await createFeedFollow(user.id, newFeed.id);
  printFeed(newFeed);

  console.log(`${user.name} now follows ${newFeedFollow.feedName}!`);
}
