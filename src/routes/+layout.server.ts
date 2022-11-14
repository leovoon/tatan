import type { LayoutServerLoad } from './$types';
import { npm_package_version } from '$env/static/private';

export const load: LayoutServerLoad = async () => {
	return {
		npm_package_version
	};
};
