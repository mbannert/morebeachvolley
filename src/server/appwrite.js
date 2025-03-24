// src/server/appwrite.js

import { Client, Account, Users, Databases } from "node-appwrite";

// The name of your cookie that will store the session
export const SESSION_COOKIE = "morebeachvolley-sesssion";

// Admin client, used to create new accounts
export function createAdminClient() {
  const client = new Client()
    .setEndpoint(import.meta.env.PUBLIC_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT)
    .setKey(import.meta.env.APPWRITE_KEY); // Set the API key here!

  // Return the services you need
  return {
    get admin_account() {
      return new Account(client);
    },
    get admin_users() {
      return new Users(client);
    },
    get admin_databases() {
      return new Databases(client);
    }
  };
}




// Session client, used to make requests on behalf of the logged in user
export function createSessionClient(request) {
  const client = new Client()
    .setEndpoint(import.meta.env.PUBLIC_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.PUBLIC_APPWRITE_PROJECT);

  // Get the session cookie from the request and set the session
  const cookies = parseCookies(request.headers.get("cookie") ?? "");
  const session = cookies.get(SESSION_COOKIE);
  if (!session) {
    throw new Error("Session cookie not found");
  }

  client.setSession(session);

  // Return the services you need
  return {
    get account() {
      return new Account(client);
    },
  };
}




export async function deleteUserProfile(db, account_id){
  const result = await db.deleteDocument(
    '67093d67002873e2c459', // databaseId
    '67254b050023f2b7dd7d', // collectionId
    account_id // documentId
);
return result;
}

// Helper function to parse cookies
function parseCookies(cookies) {
  const map = new Map();
  for (const cookie of cookies.split(";")) {
    const [name, value] = cookie.split("=");
    map.set(name.trim(), value ?? null);
  }
  return map;
}
