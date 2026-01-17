import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

type Config = {
  currentUserName: string;
  dbUrl: string;
};

export function setUser(user: string) {
  const currentConfig = readConfig();

  const newConfig: Config = {
    ...currentConfig,
    currentUserName: user,
  };

  writeConfig(newConfig);
}

export function readConfig(): Config {
  const filePath = getConfigFilePath();

  const rawBuffer = fs.readFileSync(filePath);

  const validatedConfig = validateConfig(rawBuffer);

  return validatedConfig;
}

const CONFIG_FILE_NAME = ".gatorconfig.json";
function getConfigFilePath(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const rootPath = path.join(__dirname, "..");

  return `${rootPath}/${CONFIG_FILE_NAME}`;
}

function writeConfig(config: Config): void {
  const filePath = getConfigFilePath();

  const objectNotation = {
    current_user_name: config.currentUserName,
    db_url: config.dbUrl,
  };

  try {
    fs.writeFileSync(filePath, JSON.stringify(objectNotation, null, 2));
  } catch (error) {
    throw error;
  }
}

function validateConfig(rawConfig: Buffer): Config {
  try {
    const configString = rawConfig.toString();
    const parsedObject = JSON.parse(configString);

    if ("db_url" in parsedObject && typeof parsedObject["db_url"] == "string") {
      return {
        currentUserName: parsedObject["current_user_name"] ?? "",
        dbUrl: parsedObject["db_url"],
      };
    } else {
      throw new Error(".gatorconfig.json is corrupted");
    }
  } catch (error) {
    console.log({ error });
    throw error;
  }
}
