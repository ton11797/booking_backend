import { MongoClient } from 'mongodb'
import { DB_SERVER } from './config'

//this class for database connection layer with Promise(asynchronous)
export default class database {
  constructor (collectionName) {
    this.Collection = collectionName
    this.DbUrl = DB_SERVER.url
  }

  Open () {
    return new Promise((resolve, reject) => {
      MongoClient.connect(this.DbUrl, (err, db) => {
        if (err) reject(err)
        this.client = db
        this.Db = db.db()
        resolve(true)
      })
    })
  }

  Close () {
    return new Promise((resolve, reject) => {
      this.client.close(() => {
        this.IsConnected = false
        resolve(true)
      })
    })
  }

  Insert (data) {
    return new Promise((resolve, reject) => {
      this.Db.collection(this.Collection)
        .insert(data, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
    })
  }

  Update (dataWithCondition) {
    let { data, condition } = dataWithCondition
    data = { '$set': data }
    return new Promise((resolve, reject) => {
      this.Db.collection(this.Collection)
        .update(condition, data, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
    })
  }

  Remove (condition) {
    return new Promise((resolve, reject) => {
      this.Db.collection(this.Collection)
        .remove(condition, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
    })
  }

  Find (condition) {
    return new Promise((resolve, reject) => {
      this.Db.collection(this.Collection)
        .find(condition).toArray((err, result) => {
          if (err) reject(err)
          resolve(result)
        })
    })
  }

}
