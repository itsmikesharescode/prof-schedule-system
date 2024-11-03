import type { SupabaseClient } from '@supabase/supabase-js';
import { getContext, setContext } from 'svelte';

class SupabaseState {
  #supabase = $state<SupabaseClient>();

  set(p: SupabaseClient) {
    this.#supabase = p;
  }

  get() {
    return this.#supabase;
  }
}

const SupabaseStateKey = Symbol('SupabaseState');

export const initSupabaseState = () => {
  return setContext(SupabaseStateKey, new SupabaseState());
};

export const useSupabaseState = () => {
  return getContext<ReturnType<typeof initSupabaseState>>(SupabaseStateKey);
};
