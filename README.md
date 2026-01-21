# RSS Blog Aggregator

A command-line RSS feed aggregator built with TypeScript, Node.js, and PostgreSQL. Follow your favorite blogs and view their latest posts in one place.

## Features

- User management (register, login)
- Add and follow RSS feeds
- Continuous background feed aggregation
- Browse latest posts from followed feeds
- Smart duplicate detection
- Relative timestamps ("2 hours ago")

## Prerequisites

Before you can run this project, you'll need:

- **Node.js** version 22.15.0 or higher
- **PostgreSQL** database server
- **npm** (comes with Node.js)

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/jellebouwman/ts-blog-aggregator.git
   cd ts-blog-aggregator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your PostgreSQL database and note the connection URL.

## Configuration

The application uses a configuration file located at `~/.gatorconfig.json` (in your home directory).

### Initial Setup

The config file will be created automatically when you first register or login. However, you need to set your database URL first.

Create `~/.gatorconfig.json` manually with the following structure:

```json
{
  "db_url": "postgres://username:password@localhost:5432/blogagg",
  "current_user_name": ""
}
```

Replace the `db_url` value with your actual PostgreSQL connection string:
- `username`: Your PostgreSQL username
- `password`: Your PostgreSQL password
- `localhost:5432`: Your PostgreSQL host and port
- `blogagg`: Your database name

### Example

```json
{
  "db_url": "postgres://postgres:mypassword@localhost:5432/rss_aggregator",
  "current_user_name": ""
}
```

## Database Setup

The application uses Drizzle ORM for database migrations. Run migrations to set up the database schema:

```bash
npx drizzle-kit push
```

This will create the necessary tables:
- `users` - User accounts
- `feeds` - RSS feeds
- `feed_follows` - User-feed relationships
- `posts` - Aggregated blog posts

## Usage

All commands are run using `npm start <command> [arguments]`.

### Getting Help

```bash
npm start help
```

This displays all available commands with descriptions.

### Quick Start Guide

1. **Register a new user:**
   ```bash
   npm start register yourusername
   ```

2. **Login (if you've already registered):**
   ```bash
   npm start login yourusername
   ```

3. **Add your first RSS feed:**
   ```bash
   npm start addfeed "Boot.dev Blog" https://blog.boot.dev/index.xml
   ```

4. **Start the aggregator** (in one terminal):
   ```bash
   npm start agg
   ```
   
   This runs continuously, fetching new posts every 5 seconds. Leave it running in the background.

5. **Browse posts** (in another terminal):
   ```bash
   npm start browse
   ```
   
   Or view more posts:
   ```bash
   npm start browse 10
   ```

## Available Commands

### User Management

- **`register <username>`** - Create a new user account and log in
  ```bash
  npm start register alice
  ```

- **`login <username>`** - Log in as an existing user
  ```bash
  npm start login alice
  ```

- **`users`** - List all registered users
  ```bash
  npm start users
  ```

### Feed Management

- **`addfeed <name> <url>`** - Add a new RSS feed and automatically follow it
  ```bash
  npm start addfeed "TechCrunch" https://techcrunch.com/feed/
  ```

- **`feeds`** - List all available feeds in the system
  ```bash
  npm start feeds
  ```

- **`follow <url>`** - Follow an existing feed
  ```bash
  npm start follow https://techcrunch.com/feed/
  ```

- **`unfollow <url>`** - Unfollow a feed
  ```bash
  npm start unfollow https://techcrunch.com/feed/
  ```

- **`following`** - List all feeds you're currently following
  ```bash
  npm start following
  ```

### Reading Posts

- **`browse [limit]`** - View latest posts from your followed feeds
  ```bash
  npm start browse      # Shows 2 most recent posts (default)
  npm start browse 5    # Shows 5 most recent posts
  npm start browse 20   # Shows 20 most recent posts
  ```

  Example output:
  ```
  * How to Learn Backend Development
    Description: Backend development is a crucial ski...
    URL: https://blog.boot.dev/backend/learn-backend/
    Published: 2 hours ago
    Feed: Boot.dev Blog
  ```

### Aggregation

- **`agg`** - Start continuous feed aggregation
  ```bash
  npm start agg
  ```
  
  This command runs indefinitely, fetching updates from feeds every 5 seconds. Keep it running in a separate terminal or in the background. Press `Ctrl+C` to stop.

### Maintenance

- **`reset`** - Delete all users and related data (WARNING: destructive!)
  ```bash
  npm start reset
  ```

## Example Workflow

Here's a complete example of using the aggregator:

```bash
# 1. Set up config file with your database URL
echo '{"db_url":"postgres://postgres:pass@localhost:5432/blogagg","current_user_name":""}' > ~/.gatorconfig.json

# 2. Run database migrations
npx drizzle-kit push

# 3. Register yourself
npm start register alice

# 4. Add some feeds
npm start addfeed "Boot.dev" https://blog.boot.dev/index.xml
npm start addfeed "Hacker News" https://news.ycombinator.com/rss
npm start addfeed "Dev.to" https://dev.to/feed

# 5. Start the aggregator (in one terminal)
npm start agg

# 6. In another terminal, browse posts
npm start browse 5

# 7. Check what feeds you're following
npm start following

# 8. View all feeds in the system
npm start feeds
```

## Recommended RSS Feeds

Here are some popular tech blogs to get started:

- **Boot.dev Blog**: `https://blog.boot.dev/index.xml`
- **Hacker News**: `https://news.ycombinator.com/rss`
- **Dev.to**: `https://dev.to/feed`
- **FreeCodeCamp**: `https://www.freecodecamp.org/news/rss/`
- **TechCrunch**: `https://techcrunch.com/feed/`
- **CSS-Tricks**: `https://css-tricks.com/feed/`
- **Smashing Magazine**: `https://www.smashingmagazine.com/feed/`

## Technical Details

### Stack

- **Language**: TypeScript 5.9
- **Runtime**: Node.js 22.15
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **XML Parser**: fast-xml-parser

### Project Structure

```
ts-blog-aggregator/
├── src/
│   ├── commands/          # CLI command implementations
│   ├── lib/
│   │   └── db/
│   │       ├── queries/   # Database query functions
│   │       ├── rss/       # RSS feed fetching
│   │       └── schema.ts  # Database schema
│   ├── middleware/        # Authentication middleware
│   ├── index.ts          # Main entry point
│   └── types.ts          # TypeScript types
├── package.json
├── tsconfig.json
└── drizzle.config.ts
```

### Database Schema

- **users**: User accounts with unique names
- **feeds**: RSS feeds with URLs and metadata
- **feed_follows**: Many-to-many relationship between users and feeds
- **posts**: Aggregated blog posts with titles, descriptions, and publish dates

### Features

- **Duplicate Detection**: Posts with the same URL are automatically skipped
- **Date Parsing**: Handles various RSS date formats (RFC 822, ISO 8601)
- **Error Handling**: Invalid posts are skipped with warnings
- **User Isolation**: Each user only sees posts from feeds they follow
- **Chronological Ordering**: Posts always sorted by publish date (newest first)

## Development

### Running in Development

```bash
npm start <command>
```

### Adding New Commands

1. Create a new file in `src/commands/`
2. Export your command function
3. Register it in `src/index.ts` with `addCommandToRegistry()`

## Troubleshooting

### "Not enough arguments were provided"

Make sure you're passing a command. Run `npm start help` to see available commands.

### "Database connection error"

- Check that PostgreSQL is running
- Verify your `db_url` in `~/.gatorconfig.json` is correct
- Ensure the database exists
- Run `npx drizzle-kit push` to apply migrations

### "Feed with url already exists"

This feed has already been added to the system by another user. Use `npm start follow <url>` instead.

### No posts showing when running browse

- Make sure you've added and followed feeds with `addfeed` or `follow`
- Run `npm start agg` and wait a few seconds for posts to be fetched
- Check that the feeds have recent content

## License

ISC

## Contributing

This is a learning project from Boot.dev. Feel free to fork and experiment!

## Author

Built as part of the Boot.dev backend development curriculum.
