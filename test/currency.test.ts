import { assert, expect } from "chai";
import { describe } from "mocha";
import * as fs from "fs";
import { CurrencyExchange, Req, IService } from "../src/currency";

describe("Currency exchange", async () => {

  const exchangeRatesUSD = fs.readFileSync(`${__dirname}/__fixtures__/exchangeRatesUSD.json`, "utf8").toString();

  it("ExchangeRates service", async () => {

    const currExchange = new CurrencyExchange();

    const req: Req = async (url: string) => {
      if (url === "https://api.exchangeratesapi.io/latest?base=USD") {
        return JSON.parse(exchangeRatesUSD);
      }
    };

    const usdExchange = await currExchange.getLatest("USD", "ExchangeRates", req);
    expect(usdExchange.base).be.eq("USD");
    expect(usdExchange.rates.EUR).be.eq(0.8640055296);
  });
});
