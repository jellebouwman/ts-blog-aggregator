import { inspect } from "util";
import { fetchFeed } from "src/lib/db/rss";
import { scrapeFeeds } from "src/lib/db/queries/feeds";

const TIME_IN_MS_BETWEEN_REQS = 5000;
const FEED_URL = "https://www.wagslane.dev/index.xml";
export async function aggregateCommand() {
  console.log(`Collecting feeds every ${TIME_IN_MS_BETWEEN_REQS}ms`);
  scrapeFeeds();

  const interval = setInterval(() => {
    scrapeFeeds().catch((e) => console.log({ e }));
  }, TIME_IN_MS_BETWEEN_REQS);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("Shutting down feed aggregator...");
      clearInterval(interval);
      resolve();
      process.exit(0);
    });
  });
}
