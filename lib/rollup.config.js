import { terser } from 'rollup-plugin-terser'
import { eslint } from 'rollup-plugin-eslint'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import filesize from 'rollup-plugin-filesize'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'

const pkg = require('./package.json')

// dev build if watching, prod build if not
const isProduction = !process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'MicroModal'
    },
    {
      file: pkg.cdn,
      format: 'umd',
      name: 'MicroModal'
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [
    eslint({ exclude: ['../node_modules/**', 'package.json'] }),
    json(),
    commonjs(),
    nodeResolve(),
    babel({ exclude: '../node_modules/**' }),
    isProduction && terser({
      include: [/^.+\.min\.js$/]
    }),
    isProduction && filesize()
  ]
}
