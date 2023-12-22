/**
 * @Desc: rollup.config
 * @Author: wu xingtao
 * @Date: 2023/12/22
 */
import pkg from './package.json';
const entryInput = 'src/main.js'
const outputDir = 'dist/'

export default [
  {
    input: entryInput,
    output: {
      file: outputDir + pkg.browser,
      format: 'es',
      name:`${pkg.umd}`,
      // sourcemap: true
    },
    plugins:[]
  },
  {
    input: entryInput,
    output: [
      { file: outputDir + pkg.main, format: 'cjs' },
      { file: outputDir + pkg.module, format: 'es' },
    ],
    // plugins: [typescript()],
  },
  {
    input: entryInput,
    output: [{ file: outputDir + pkg.iife, format: 'iife', name: `${pkg.umd}` }],
    // plugins: [typescript(), terser()],
  },
]
