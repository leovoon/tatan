import type { Writable } from 'svelte/store';
import { persisted } from 'svelte-local-storage-store';

export const savedGifs: Writable<string[]> = persisted('savedGifs', []);

export const savedKeywords: Writable<string[]> = persisted('savedKeywords', []);

export const toast: Writable<boolean> = persisted('toast', false);
