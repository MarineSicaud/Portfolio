import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI

if ( !MONGODB_URI ) {
  throw new Error("Veuillez definir votre lien de connection a la base de donnee avant de continuer !")
}

let cache = global.mongoose || (
  global.mongoose = {
    conn: null,
    promise: null
  }
)

async function connectionToDatabase() {
  if ( cache.conn ) {
    console.log("skip connection")

    return cache.conn
  }

  if ( !cache.promise ) {
    cache.promise = mongoose.connect(MONGODB_URI!, {
      dbName: "Portfolio",
      bufferCommands: false,
      serverApi: {
        strict: true,
        version: "1",
        deprecationErrors: true
      }
    })
      .then((db) => db)

    await mongoose.connection.db?.admin().command({ ping: 1 })
  }

  cache.conn = await cache.promise

  return cache.conn
}

export { connectionToDatabase }
