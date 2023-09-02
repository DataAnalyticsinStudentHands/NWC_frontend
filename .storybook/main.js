/** @type { import('@storybook/react-webpack5').StorybookConfig } */

const base = 'https://dash.cs.uh.edu/designsystem/';
const config = {
	stories: [
    "../src/**/*.mdx", 
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
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
    	autodocs:true,
	},
	staticDirs: ["../public"],
	managerWebpack: (config, { configType }) => {
		if (configType === 'PRODUCTION') {
		  config.output.publicPath = base;
		}
		return config;
	  },
	webpackFinal: async (config, { configType }) => {
		if (configType === 'PRODUCTION') {
		  config.output.publicPath = base;
		}
		return config;
	},
	managerHead: (head, { configType }) => {
		const injections = [
		  `<link rel="shortcut icon" type="image/x-icon" href="${base}favicon.ico">`, // This set icon for your site.
		  `<script>window.PREVIEW_URL = '${base}iframe.html'</script>` , // This decide how storybook's main frame visit stories 
		]
		return configType === 'PRODUCTION'
		  ? `${head}${injections.join('')}`
		  : head
	  },
};
export default config;
