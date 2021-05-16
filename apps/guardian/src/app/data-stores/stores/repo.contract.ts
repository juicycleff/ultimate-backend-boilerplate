export interface RepoContract<T> {
  findById(id: string): T;

  findOne(id: string): T;

  save<S>(v: S): T;
}
