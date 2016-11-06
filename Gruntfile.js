'use strict';
var path = require('path'),
    webpack = require('webpack'),
    phaserModule = path.join(__dirname, '/node_modules/phaser/'),
    pixi = path.join(phaserModule, 'build/custom/pixi.js'),
    p2 = path.join(phaserModule, 'build/custom/p2.js');

module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            files: 'src/**/*.js',
            tasks: ['webpack']
        },
        webpack: {
            options: {
                entry: './src/index.js',
                output: {
                    path: path.join(__dirname, 'client/js'),
                    filename: '[name].js',
                    chunkFilename: '[id].chunk.js',
                    sourceMapFilename: '[file].map',
                    pathInfo: true
                },
                resolveLoader: {
                    root: path.resolve('node_modules')
                },
                module: {
                    loaders: [
                        {test: /pixi\.js/, loader: 'expose?PIXI'},
                        {test: /p2\.js/, loader: 'expose?p2'}
                    ]
                },
                resolve: {
                    alias: {
                        'pixi': pixi,
                        'p2': p2,
                    }
                },
                devtool: 'eval'
            },
            buildDev: {
                debug: true
            }
        },
    });

    grunt.registerTask('default', ['webpack:buildDev', 'watch']);

};
