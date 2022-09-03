import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import {viteExternalsPlugin} from 'vite-plugin-externals'
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

const externals = viteExternalsPlugin({
  'sku/treat': 'sku/treat',
  // 'sku/react-treat': 'sku/react-treat',
  // 'escape-string-regexp': 'escape-string-regexp',
  // 'cssesc': 'cssesc',
  // 'css-what': 'css-what',
  // 'chalk': 'chalk',
  // 'deepmerge': 'deepmerge',
  // 'braid-design-system': 'braid-design-system',
  // 'lodash': 'lodash',
});
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), vanillaExtractPlugin(), externals],
  define: {
    'process.env': {}
  }
})
