import babel from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
    input: './src/index.js',
    output: {
        format: 'umd',
        name: 'Vue',
        file: 'dist/umd/vue.js',
        sourcemap: true
    },
    plugin: [
        babel({
            exclude: 'node_modules/**',
        }),
        serve({
            open: true,
            port: 3001,
            contentBase: '',
            openPage: '/index.html'
        })
    ]
}
