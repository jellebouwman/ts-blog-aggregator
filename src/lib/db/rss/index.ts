import { XMLParser } from "fast-xml-parser";

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

function isNonEmptyString(value: any): value is string {
  return typeof value === "string" && value !== "";
}

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
  const response = await fetch(feedURL, {
    headers: {
      "User-Agent": "gator",
    },
  });
  const text = await response.text();

  const parser = new XMLParser();
  const rssFeed = parser.parse(text).rss;

  if ("channel" in rssFeed === false) {
    throw new Error("No channel found in rssFeed response");
  }

  const { channel } = rssFeed;
  if ("title" in channel === false || !isNonEmptyString(channel.title)) {
    throw new Error("No title field found in rssFeed response");
  }
  if ("link" in channel === false || !isNonEmptyString(channel.link)) {
    throw new Error("No link field found in rssFeed response");
  }
  if (
    "description" in channel === false ||
    !isNonEmptyString(channel.description)
  ) {
    throw new Error("No description field found in rssFeed response");
  }

  const rssItems: RSSItem[] = [];

  // Handle both single item and array of items
  if ("item" in channel && channel.item) {
    const items = Array.isArray(channel.item) ? channel.item : [channel.item];

    for (const item of items) {
      // Validate all required fields
      if (
        !isNonEmptyString(item?.title) ||
        !isNonEmptyString(item?.link) ||
        !isNonEmptyString(item?.description) ||
        !isNonEmptyString(item?.pubDate)
      ) {
        continue; // Skip invalid items
      }

      rssItems.push({
        title: item.title,
        link: item.link,
        description: item.description,
        pubDate: item.pubDate,
      });
    }
  }

  const finalRssFeedObject: RSSFeed = {
    channel: {
      title: channel.title,
      description: channel.description,
      link: channel.link,
      item: rssItems,
    },
  };

  return finalRssFeedObject;
}
