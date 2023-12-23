/**
 * @Desc: rollup.config
 * @Author: wu xingtao
 * @Date: 2023/12/22
 */
import { babel } from '@rollup/plugin-babel'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs';
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
      resolve({ browser: true, extensions: ['.mjs', '.js', '.json', '.node', '.ts'] }),
      commonjs({ extensions: ['.js', '.ts'] }),
      babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env', '@babel/preset-react'],
      }),
      replace({
        'process.env.NODE_ENV': '"production"',
      }),

    ]
  },
  // {
  //   input: entryInput,
  //   output: [
  //     { file: outputDir + pkg.main, format: 'cjs' },
  //     { file: outputDir + pkg.module, format: 'es' },
  //   ],
  //   // plugins: [typescript()],
  // },
  // {
  //   input: entryInput,
  //   output: [{ file: outputDir + pkg.iife, format: 'iife', name: `${pkg.umd}` }],
  //   // plugins: [typescript(), terser()],
  // },
]
