module.exports = {
  "stories": ["../stories/**/*.stories.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions", "storybook-addon-react-router-v6"],
  "framework": {
    name: "@storybook/react-vite",
    options: {}
  },
  "core": {},
  "features": {
    "storyStoreV7": true
  }
};