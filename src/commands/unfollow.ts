import {
  createFeedFollow,
  deleteFeedFollow,
} from "src/lib/db/queries/feed-follow";
import { getFeedByUrl } from "src/lib/db/queries/feeds";
import { User } from "src/types";

export async function unfollowCommand(
  _commandName: string,
  user: User,
  url: string,
) {
  const feed = await getFeedByUrl(url);
  await deleteFeedFollow(feed.id, user.id);

  console.log(`User '${user.name}' no longer follows feed '${feed.name}'.`);

  return;
}
