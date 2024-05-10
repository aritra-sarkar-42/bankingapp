'use server';

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email,password }:signInProps) =>{
    try {
        //mutaution/database/ fetch 
        const { account } = await createAdminClient();
        
        const response = await account.createEmailPasswordSession(email,password);

        return parseStringify(response);
    } catch (error) {
        console.error('Error',error);
    }
}

export const signUp = async (userData : SignUpParams) =>{
    const {email,password,firstName,lastName} = userData;
    try {
        //create a user account 
        const { account } = await createAdminClient();

         const newUserAccount = await account.create(ID.unique(), 
         email, 
         password, 
         `${firstName} ${lastName}`
         );
         const session = await account.createEmailPasswordSession(email, password);
         cookies().set("appwrite-session", session.secret, {
             path: "/",
             httpOnly: true,
             sameSite: "strict",
             secure: true,
         });

         return parseStringify(newUserAccount);
    } catch (error) {
        console.error('Error',error);
    }
}

// ... your initilization functions

export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user =  await account.get();

      return parseStringify(user);
    } catch (error) {
      return null;
    }
  }
  
  //see again from 3:05:52 and also need to resolve the routing problem to the home page