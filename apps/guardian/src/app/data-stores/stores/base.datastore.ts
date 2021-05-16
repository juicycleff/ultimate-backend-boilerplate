export abstract class BaseDatastore<T> {
  connect(): void | Promise<void> {
    throw new Error("Not implemented");
  }

  private _client: T;
  public get client(): T {
    return this._client;
  }
  public set client(value: T) {
    this._client = value;
  }

  close(): void | Promise<void> {
    throw new Error("Not implemented");
  }
}
