import { writable } from 'svelte/store';

export const savedGifs = writable([] || JSON.parse(localStorage.getItem('savedGifs') || '[]'));
