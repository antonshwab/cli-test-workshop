import * as fs from "fs";
import { CurrencyExchange, Req, IService } from "../src/currency";

describe("Currency exchange", async () => {

  const exchangeRatesUSD = fs.readFileSync(`${__dirname}/__fixtures__/exchangeRatesUSD.json`, "utf8").toString();

  it("ExchangeRates service", async () => {

    const currExchanger = new CurrencyExchange();

    const req: Req = async (url: string) => {
      return JSON.parse(exchangeRatesUSD);
    };

    const usdExchange = await currExchanger.getLatest("USD", "ExchangeRates", req);
    expect(usdExchange.base).toEqual("USD");
    expect(usdExchange.rates.EUR).toEqual(0.8640055296);
  });
});
