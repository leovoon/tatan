import type { Writable } from 'svelte/store';
import { writable } from 'svelte-local-storage-store';

export const savedGifs: Writable<string[]> = writable('savedGifs', []);

export const savedKeywords: Writable<string[]> = writable('savedKeywords', []);
