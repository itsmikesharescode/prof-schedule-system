import type { User } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

class UserState {
  #user = $state<User | null>(null);

  set(p: User | null) {
    this.#user = p;
  }

  get() {
    return this.#user;
  }
}

const UserStateKey = Symbol('UserState');

export const initUserState = () => {
  return setContext(UserStateKey, new UserState());
};

export const useUserState = () => {
  return getContext<ReturnType<typeof initUserState>>(UserStateKey);
};
