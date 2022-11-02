import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import esbuild, { minify } from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts';
import babel from '@rollup/plugin-babel';

export default [
  {
    external: ['react', 'react-dom', 'react-router-dom'],
    input: "./index.ts",
    output: [
      {
        name:'@eran-or/rr-pagination',
        inlineDynamicImports: true,
        dir: 'dist',
        format: "umd",
        globals: {
          react: 'React',
          "react-dom": 'ReactDOM',
          "react-router-dom": "ReactRouterDOM"
        }
      },

    ],
    plugins: [
      resolve(),
      commonjs(),
      babel({ babelHelpers: 'bundled', exclude: ['/node_modules/**', '/stories/**'] }),
      peerDepsExternal(),
      esbuild({
        minify: true,
        target: 'esnext', // default, or 'es20XX', 'esnext'
        jsx: 'transform', // default, or 'preserve'
        jsxFactory: 'React.createElement',
        jsxFragment: 'React.Fragment',
        
        // Like @rollup/plugin-replace
        define: {
          __VERSION__: '"x.y.z"',
        },
        tsconfig: 'tsconfig.json', // default
        // Add extra loaders
        loaders: {
          // Add .json files support
          // require @rollup/plugin-commonjs
          '.json': 'json',
          // Enable JSX in .js files too
          '.js': 'jsx',
          '.modules.css':'css'
        }
      }),
      postcss({
        plugins: [autoprefixer()],
                sourceMap: true,
                extract: true,
                modules: true,
                minimize: true,
      }),
      
    ],
   
  },
  
  {
    input: "./index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [
      dts()
    ],
    external: [/\.css$/],
  },
];

