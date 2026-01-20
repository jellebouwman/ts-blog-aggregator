import { getFeeds } from "src/lib/db/queries/feeds";

export async function feedsCommand() {
  const feeds = await getFeeds();

  feeds.forEach((feed) => console.log({ feed }));
}
