export class Client {
  constructor(
    private _clientId: number,
    private _clientName: string,
    private _redirectUris: string[]
  ) {}

  static create(clientId: number, clientName: string, redirectUri: string[]) {
    return new Client(clientId, clientName, redirectUri);
  }
}
