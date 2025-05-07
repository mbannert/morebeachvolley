import { Client, Users, Databases  } from "node-appwrite";
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });

const client = new Client()
    .setEndpoint(process.env.PUBLIC_APPWRITE_ENDPOINT) 
    .setProject(process.env.PUBLIC_APPWRITE_PROJECT)
    .setKey(process.env.APPWRITE_KEY); 

const users = new Users(client);
const databases = new Databases(client);

const DATABASE_ID = process.env.DATABASE_ID;
const COLLECTION_ID = process.env.COLLECTION_ID;

async function getUserProfiles() {
    try {
        const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        return response.documents;
    } catch (error) {
        console.error("Error fetching user profiles:", error);
        return [];
    }
}

async function exportUsersWithProfiles() {
    try {
        const usersResponse = await users.list();
        
        // Process users asynchronously
        const userList = await Promise.all(usersResponse.users.map(async (user) => {
            try {
                const user_profile = await databases.getDocument(DATABASE_ID, COLLECTION_ID, user.$id);
                console.log(user.$id); // Now this will log actual data
                return `${user.email},${user.name},${user.$id},${user_profile?.newsletter || ""},${user_profile?.zip || ""}`;
            } catch (error) {
                console.error(`Error fetching profile for user ${user.$id}:`, error);
                return `${user.email},${user.name},${user.$id},,,`; // Handle missing profile
            }
        }));

        // Write to CSV
        fs.writeFileSync("morebeachvolley_user_export.csv", "Email,Name,UserID,Newsletter,Zip\n" + userList.join("\n"));
        console.log("User data with profiles exported successfully!");
    } catch (error) {
        console.error("Error exporting users:", error);
    }
}

exportUsersWithProfiles();