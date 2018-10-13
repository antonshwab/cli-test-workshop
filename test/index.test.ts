import { expect, test } from "@oclif/test";
import * as fs from "fs";
import * as nock from "nock";

const cmd = require("../src");

describe("cli-test-workshop", () => {
  nock.disableNetConnect();

  const exchangeRatesUSD = fs.readFileSync(`${__dirname}/__fixtures__/exchangeRatesUSD.json`, "utf8").toString();

  beforeEach(() => {
    const apiURL = `https://api.exchangeratesapi.io`;
    nock(apiURL)
      .get(`/latest?base=USD`)
      .reply(200, exchangeRatesUSD);
  });

  test
    .stdout()
    .do(() => cmd.run(["--base", "USD"]))
    .it("exchange --base USD", ctx => {
      expect(ctx.stdout).to.contain(`"EUR":0.8640055296`);
    });
});
