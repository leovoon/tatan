import type { Writable } from 'svelte/store';
import { writable } from 'svelte-local-storage-store';

export const savedGifs: Writable<string[]> = writable('savedGifs', []);

export const savedKeywords: Writable<string[]> = writable('savedKeywords', []);

export const toast: Writable<boolean> = writable('toast', false);
