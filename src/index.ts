import { Command, flags } from "@oclif/command";
import { CurrencyExchange } from "./currency";

class CliTestWorkshop extends Command {
  static description = "describe the command here";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),
    // flag with a value (-b, --base=VALUE)
    base: flags.string({ char: "b", description: "base currency to exchange" }),
    service: flags.string({ char: "s", description: "service name to fetch rates" }),
  };

  static args = [{ base: "base", service: "service", name: "file" }];

  async run() {
    const { args, flags } = this.parse(CliTestWorkshop);

    const base = flags.base || "EUR";
    const service = flags.service || "ExchangeRates";

    const currencyExchange = new CurrencyExchange();
    const result = await currencyExchange.getLatest(base, service);
    const json = JSON.stringify(result);

    this.log(`Rates for ${base}: ${json}`);
  }
}

// export default CliTestWorkshop;
export = CliTestWorkshop;
