import { generateUsername } from "$lib/utils"
import { error, redirect, type Actions } from "@sveltejs/kit";

const register = async ({ locals, request }) => {
  const body = Object.fromEntries(await request.formData())
  let username = generateUsername(body.name.split(' ').join('')).toLowerCase();

  try {
    await locals.pb.collection('users').create({ username, ...body });
    await locals.pb.collection('users').requestVerification(body.email);
  } catch (err) {
    console.log('Error: ', err);
    throw error(500, 'Something went wrong');
  }

  throw redirect(303, '/login');
}

export const actions = {
  register
} satisfies Actions;