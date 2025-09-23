'use server';
import { Client, Account } from 'node-appwrite';
import { cookies } from 'next/headers';
import { createSessionClient1 } from './server/appwrite.actions';

const ENDPOINT = process.env.NEXT_PUBLIC_ENDPOINT;
const PROJECT_ID = process.env.PROJECT_ID;

const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(ENDPOINT!)
    .setProject(PROJECT_ID!)
    .setKey(process.env.API_KEY!);

  return {
    get account() {
      return new Account(client);
    },
  };
};

const createSessionClient = async (request?: any | null) => {
  const client = new Client().setEndpoint(ENDPOINT!).setProject(PROJECT_ID!);

  const session = request.cookies.get('session');
  if (session) {
    client.setSession(session.value);
  }
  return {
    get account() {
      return new Account(client);
    },
  };
};

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient1();
    return await account.get();
  } catch (error) {
    return null;
  }
}

export async function deleteSessionClient() {
  try {
    const cookieStore = cookies();
    const hasCookie = cookieStore.delete('session');
  } catch (error) {
    console.log('error on deleting user session', error);
  }
}

export { createAdminClient, createSessionClient };
