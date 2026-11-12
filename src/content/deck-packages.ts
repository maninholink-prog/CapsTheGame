import {expansionPackages} from './expansion.js';
import type {Champion} from './schema.js';

export const startingPackages:Record<Champion,string[]>={...expansionPackages,kylast:['kylast','sword-kylast','joia-rubra'],abe:['abe','aranha','project'],arcata:['arcata','fire-bolt','burning-hands'],rubel:['rubel','healing-word','prayer']};
