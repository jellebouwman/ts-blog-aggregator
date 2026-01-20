import { inspect } from "util";
import { fetchFeed } from "src/lib/db/rss";

const FEED_URL = "https://www.wagslane.dev/index.xml";
export async function aggregateCommand() {
  const rssFeed = await fetchFeed(FEED_URL);
  console.log(inspect(rssFeed, { depth: null, colors: true }));
}
