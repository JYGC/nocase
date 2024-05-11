import type { PageLoad } from './$types';

export const load: PageLoad = ({ locals }) => {
  if (locals.user) {
    return {
      user: locals.user
    }
  }

  return {
    user: undefined
  }
};