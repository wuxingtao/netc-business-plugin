/**
 * @Desc: rollup.config
 * @Author: wu xingtao
 * @Date: 2023/12/22
 */
import { babel } from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import pkg from './package.json' assert { type: 'json' }

const entryInput = 'src/main.js'
const outputDir = 'dist/'

export default [
  {
    input: entryInput,
    output: {
      file: outputDir + pkg.browser,
      format: 'es',
      name: `${pkg.umd}`,
      // sourcemap: true
    },
    plugins: [
      json(),
      resolve({ browser: true, extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.jsx'] }),
      commonjs({ extensions: ['.js', '.ts'] }),
      babel({
        babelHelpers: 'bundled',
        plugins: [['@babel/plugin-transform-react-jsx', {
          'pragma': 'createElement'
        }]],
        // presets: [
        //   ['@babel/preset-env'],
        //   ['@babel/preset-react', {
        //     'runtime':'automatic'
        //   }]
        // ],
        // plugins: [['@babel/plugin-transform-react-jsx',{
        //   'runtime':'automatic',
        // }]],
      }),
      replace({
        'process.env.NODE_ENV': '"production"',
      }),

    ]
  },
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)

  {
    input: entryInput,
    output: [
      { file: outputDir + pkg.main, format: 'cjs' },
      { file: outputDir + pkg.module, format: 'es' },
    ],
    plugins: [
      json(),
      resolve({ browser: true, extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.jsx'] }),
      commonjs({ extensions: ['.js', '.ts'] }),
      babel({
        babelHelpers: 'bundled',
        plugins: [['@babel/plugin-transform-react-jsx', {
          'pragma': 'createElement'
        }]],
      }),
      replace({
        'process.env.NODE_ENV': '"production"',
      }),
    ],
  },
  // {
  //   input: entryInput,
  //   output: [{ file: outputDir + pkg.iife, format: 'iife', name: `${pkg.umd}` }],
  //   // plugins: [typescript(), terser()],
  // },
]
