export class User {
  constructor(private _id: number, private _username: string) {}

  static create(id: number, username: string) {
    return new User(id, username);
  }
}
