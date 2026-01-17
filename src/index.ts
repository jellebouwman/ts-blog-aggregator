import { readConfig, setUser } from "./config";
function main() {
  setUser("Jelle");

  const config = readConfig();
  console.log({ config });
}

main();
