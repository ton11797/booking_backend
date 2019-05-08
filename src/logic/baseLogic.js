import database from '../database'

export default class baseLogic {
  constructor (collection) {
    this.Db = new database(collection)
  }
    async Add (data) {
    let connected = await this.Db.Open()
    let inserted = await this.Db.Insert(data)
    connected = await this.Db.Close()
    return inserted
  }
  async Edit (dataWithCondition) {
    let connected = await this.Db.Open()
    let updated = await this.Db.Update(dataWithCondition)
    connected = await this.Db.Close()
    return updated
  }
  async Delete (condition) {
    let connected = await this.Db.Open()
    let removed = await this.Db.Remove(condition)
    connected = await this.Db.Close()
    return removed
  }
  async Get (condition) {
    let connected = await this.Db.Open()
    let results = await this.Db.Find(condition)
    connected = await this.Db.Close()
    return results
  }
}