import adapter from '@sveltejs/adapter-cloudflare';
import preprocessor from 'svelte-preprocess';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocessor(),
	kit: {
		adapter: adapter()
	}
};

export default config;
