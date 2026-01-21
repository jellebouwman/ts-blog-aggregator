import { getFeeds } from "src/lib/db/queries/feeds";
import { printFeed } from ".";

export async function feedsCommand() {
  const feeds = await getFeeds();

  feeds.forEach((feed) => printFeed(feed));
}
