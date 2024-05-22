import { MongoClient } from "mongodb"

if (!process.env.MONGO_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"')
}

interface CustomGlobal extends Global {
  _mongoClientPromise?: Promise<MongoClient>;
}

const globalAny: CustomGlobal = globalThis as any;

const uri = process.env.MONGO_URI
const options = {}

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!globalAny._mongoClientPromise) {
    client = new MongoClient(uri, options)
    globalAny._mongoClientPromise = client.connect()
  }
  clientPromise = globalAny._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise