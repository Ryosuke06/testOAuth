export class Token {
  constructor(public params: any, public grant_type: string) {}

  async ExtractMandatoryParameter(params: any, key: string) {
    const value = params[key];

    if (value != "authorization_code" || value.length === 0) {
      throw new Error("unsupported_grant_type");
    }
    return value;
  }
}
