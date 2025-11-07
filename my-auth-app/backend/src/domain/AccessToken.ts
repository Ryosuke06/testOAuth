export class AccessToken {
  constructor(
    private _token: string,
    private _userId: number,
    private _clientId: number,
    private _expiresAt: Date
  ) {}

  static create(token: string, userId: number, clientId: number) {
    const expiredAt = new Date(Date.now() + 10 * 60 * 1000);
  }
}
