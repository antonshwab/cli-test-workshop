import fetch, { Response } from "node-fetch";

export type Req = (url: string) => Promise<any>;

const defaultReq: Req = async (url: string) => {
  const resp: Response = await fetch(url);
  const json = await resp.json();
  return json;
};

export interface IService {
  getLatest(base: string, req: Req): Promise<any>;
}

interface IServices {
  [serviceName: string]: new () => IService;
}

class ExchangeRates implements IService {
  async getLatest(base: string, req: Req): Promise<any> {
    const normalizedBase = base.toUpperCase();
    const url = `https://api.exchangeratesapi.io/latest?base=${normalizedBase}`;
    const json = await req(url);
    return json;
  }
}

export class CurrencyExchange {
  static defaultServices: IServices = {
    [ExchangeRates.name]: ExchangeRates,
  };

  constructor(public services: IServices = CurrencyExchange.defaultServices) {
    this.services = {
      ...services,
      ...CurrencyExchange.defaultServices,
    };
  }

  async getLatest(
    base: string,
    serviceName: string = ExchangeRates.name,
    req: Req = defaultReq): Promise<any> {

    const service = new this.services[serviceName]();
    const json = await service.getLatest(base, req);
    return json;
  }
}
