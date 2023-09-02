/** @type { import('@storybook/react-webpack5').StorybookConfig } */

const config = {
	stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/preset-create-react-app",
		"@storybook/addon-interactions",
	],
	framework: {
		name: "@storybook/react-webpack5",
		options: {},
	},
	docs: {
		autodocs: true,
	},
	staticDirs: ["../public"],
	managerWebpack: (config) => {
		config.output.publicPath = '/designsystem/';
		return config;
	},
	webpackFinal: async (config) => {
		config.output.publicPath = '/designsystem/';
		return config;
	},
	managerHead: (head, { configType }) => {
		const injections = [
			`<base href="/designsystem/" />`, // This decide how storybook's iframe visit stories
			`<script>window.PREVIEW_URL = '/designsystem/iframe.html'</script>`, // This decide how storybook's main frame visit stories
		];
		return configType === "PRODUCTION"
			? `${injections.join("\n")}${head}`
			: head;
	},
};
export default config;
