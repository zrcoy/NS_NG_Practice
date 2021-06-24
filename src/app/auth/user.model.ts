export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get isAuth() {
    return !!this.token;
  }

  get token() {
    if (!this._token) {
      return null;
    }
    if (!this._tokenExpirationDate || this._tokenExpirationDate < new Date()) {
      return null;
    }
    return this._token;
  }

  get timeToExpiry() {
    //remaining time to live in milliseconds
    return this._tokenExpirationDate.getTime() - new Date().getTime();
  }
}
