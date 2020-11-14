import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import {uglify} from 'rollup-plugin-uglify'

export default {
  input: './lib/core/ptbk.js',
  output: {
    file: 'build/ptbk.min.js',
    format: 'iife',
    name: 'test'
  },
  watch: {
    include: 'lib/**'
  },
  plugins: [resolve(), commonjs(),uglify()]
}