var path = require('path');

function generateUUID(){
	var d = new Date().getTime();

	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0;
		d = Math.floor(d/16);
		return (c=='x' ? r : (r&0x3|0x8)).toString(16);
	});

	return uuid;
}

module.exports = function(grunt) {
	var t = grunt.template.process;
	var p = grunt.file.readJSON('package.json');

	var allStylesFilename = 'all_styles.css';

	var stylesDir = 'styles/';
	var assetsDir = 'assets/';
	var buildProdDir = 'build/prod/';
	var buildDevDir = 'build/dev/';
	var stylesCssDir = 'styles/css/';
	var stylesLessDir = 'styles/less/';
	var generatedDir = 'generated/';
	var generatedCssDir = 'generated/css/';
	var configDir = 'config/';
	var cacheBustingId = generateUUID();

	var assetPaths = p.additionalAssetPaths.split(',');
	assetPaths.push(assetsDir);

	assetPaths = assetPaths.filter(function(path) {
		return path.trim() != "";
	});

	var assetSelectorsProd = assetPaths.map(function(path) {
		return {
			expand: true,
			cwd: path,
			src: '**',
			dest: buildProdDir + assetsDir
		}
	});

	assetSelectorsProd.push({ expand: true, src: stylesCssDir + allStylesFilename, dest: buildProdDir });
	assetSelectorsProd.push({ expand: true, cwd: stylesDir, src: assetsDir + '/**', dest: buildProdDir + stylesDir });

	var assetSelectorsDev = assetPaths.map(function(path) {
		return {
			expand: true,
			cwd: path,
			src: '**',
			dest: buildDevDir + assetsDir
		}
	});

	assetSelectorsDev.push({ expand: true, src: stylesCssDir + allStylesFilename, dest: buildDevDir });
	assetSelectorsDev.push({ expand: true, cwd: stylesDir, src: assetsDir + '/**', dest: buildDevDir + stylesDir });

	// Making sure that this path has the correct separator. Just in case.
	p.framework = p.framework.split(/[/|\\]/).join(path.sep);

	grunt.initConfig({
		pkg: p,

		'copy': {
			'dev': {
				files: assetSelectorsDev
			},

			'prod': {
				files: assetSelectorsProd
			},

			'jquery': {
				files: [
					{
						expand: true,
						cwd: './jquery/dist',
						src: ['jquery.js'],
						dest: './lib/'
					}
				]
			},

			'vendor-to-lib': {
				files: [
					{
						expand: true,
						cwd: './vendor',
						src: ['**'],
						dest: './lib/'
					}
				]
			}
		},

		'shell': {
			// Run bower from grunt.
			'bower': {
				command: 'bower install'
			},

			// Clone game-builder from github
			'framework': {
				command: t('git clone -b <%= p.frameworkTag %> <%= p.frameworkRepo %> <%= p.framework %>', {data: {p:p}})
			},

			'build-jquery': {
				command: [
					'git clone -b 2.2-stable git://github.com/jquery/jquery.git jquery',
					'cd jquery',
					'npm install',
					'grunt build:*:*:-ajax:-core/ready'
				].join('&&')
			}
		},

		'make-dir': {
			'build-dev': {
				options: {
					dirName: buildDevDir + assetsDir
				}
			},

			'build-prod': {
				options: {
					dirName: buildProdDir + assetsDir
				}
			}
		},

		'clean': {
			'options': { force: true },

			// Clean the folder where game-builder is downloaded
			'framework': {
				src: [path.join(p.framework)],
			},

			'jquery': {
				src: 'jquery'
			},

			// Clean the folder of the development build
			'build-dev': {
				src: 'build/dev'
			},

			// Clean the folder of the production build
			'build-prod': {
				src: 'build/prod'
			},

			'css': {
				src: [generatedCssDir, stylesCssDir + allStylesFilename],
			}
		},

		'open': {
			// Open index.html with the default browser
			'index' : {
				path : 'index.html'
			}
		},

		'less': {
			'target': {
				options: {
					paths: [stylesLessDir],
					strictMath: true
				},
				files: [{
					expand: true,
					cwd: stylesLessDir,
					src: ['*/style.less'],
					dest: generatedCssDir,
					rename: function(dest, src) {
						return dest + src.substring(0, src.indexOf('/')) + '.css';
					},
				}]
			}
		},

		'concat': {
			'generated_sans_main': {
				files: [{
					expand: true,
					cwd: generatedCssDir,
					src: ['*.css', '!*main.css'],
					dest: stylesCssDir,
					rename: function(dest, src) {
						return dest + allStylesFilename;
					}
				}]
			},

			'plain_sans_main': {
				files: [{
					expand: true,
					cwd: stylesCssDir,
					src: ['*.css', '!*main.css'],
					dest: stylesCssDir,
					rename: function(dest, src) {
						return dest + allStylesFilename;
					}
				}]
			},

			'append_main': {
				files: [{
					expand: true,
					src: [stylesCssDir + allStylesFilename, generatedCssDir + 'main.css', stylesCssDir + 'main.css'],
					dest: stylesCssDir,
					rename: function(dest, src) {
						return dest + allStylesFilename;
					}
				}]
			}
		},

		'cssmin': {
			'target': {
				options: {
					keepSpecialComments: 0
				},
				files: [{
					src: buildProdDir + stylesCssDir + allStylesFilename,
					dest: buildProdDir + stylesCssDir + allStylesFilename
				}]
			}
		},

		'requirejs': {
			'options': {
				baseUrl: './',
				name: './lib/almond/almond',
				mainConfigFile: generatedDir + 'config.js',
				include: ['pre-load', 'main'],
				wrapShim: true,
				insertRequire: ['pre-load']
			},

			'dev': {
				options: {
					out: buildDevDir + 'packaged.js',
					optimize: 'none',
					preserveLicenseComments: true
				}
			},

			'prod': {
				options: {
					out: buildProdDir + 'packaged.js',
					optimize: 'uglify2',
					preserveLicenseComments: false
				}
			}
		},

		'create-config': {
			'options': {
				configDir: configDir,
				generatedDir: generatedDir
			}
		},

		'local-assets': {
			'options': {
				generatedDir: generatedDir
			},

			'build-dev': {
				src: [assetsDir],
				cwd: buildDevDir,
				cacheBustingId: cacheBustingId
			},

			'build-prod': {
				src: [assetsDir],
				cwd: buildProdDir,
				cacheBustingId: cacheBustingId
			},

			'dev': {
				src: assetPaths,
				cwd: '.',
				cacheBustingId: "test"
			}
		},

		// Merge files to create asset-map.js
		'merge-json': {
			'map': {
				src: [ generatedDir + 'asset-map.json', configDir + "remote-assets.json"],
				dest: generatedDir + 'asset-map.json'
			}
		},

		'create-data-modules': {
			'asset-map': {
				options: {
					template: "json-data-module-template.txt"
				},
				files: [
					{
						src: [generatedDir + 'asset-map.json'],
						dest: 'src/'
					}
				]
			},
			'font-data': {
				options: {
					   template: "json-data-module-template.txt"
				},
				files: [
					{
						src: [configDir + 'font-data.json'],
						dest: 'src/'
					}
				]
			},
			'levels': {
					options: {
					template: "level-data-module-template.txt"
				},
				files: [
					{
						src: 'scenes/**/*.bin',
						dest: 'src/data/'
					}
				]
			}
		},

		'create-build-index': {
			'dev': {
				options: {
					buildDir: buildDevDir,
					cacheBustingId: "test"
				}
			},

			'prod': {
				options: {
					buildDir: buildProdDir,
					cacheBustingId: cacheBustingId
				}
			}
		}
	});

	// Npm goodness
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-shell');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-merge-json');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-requirejs');

	// Local tasks
	grunt.loadTasks('tasks');

	// This task creates the asset map
	grunt.registerTask('asset-map-dev', ['local-assets:dev', 'merge-json', 'create-data-modules', 'config']);
	// This task creates the asset map
	grunt.registerTask('asset-map-build-dev', ['local-assets:build-dev', 'merge-json', 'create-data-modules', 'config']);
	// This task creates the asset map
	grunt.registerTask('asset-map-build-prod', ['local-assets:build-prod', 'merge-json', 'create-data-modules', 'config']);

	// This task creates all the requirejs configuration needed
	grunt.registerTask('config', ['create-config']);
	// This task downloads game-builder source code
	grunt.registerTask('framework', ['clean:framework', 'shell:framework']);
	// This task builds the css stylesheet
	grunt.registerTask('css', ['clean:css', 'less', 'concat:generated_sans_main', 'concat:plain_sans_main', 'concat:append_main']);
	// This task opens index.html
	grunt.registerTask('run', ['open:index']);
	// Refreshes all the data before opening index.html
	grunt.registerTask('refresh', ['css', 'asset-map-dev', 'copy:vendor-to-lib', 'open:index']);

	grunt.registerTask('build-jquery', ['clean:jquery', 'shell:build-jquery', 'copy:jquery', 'clean:jquery']);

	// This task sets up the development environment
	grunt.registerTask('setup', ['shell:bower', 'framework', 'build-jquery', 'css', 'asset-map-dev', 'copy:vendor-to-lib']);

	// Builds a development release, no minification
	grunt.registerTask('build-dev', [
		'clean:build-dev',
		'setup',
		'make-dir:build-dev',
		'copy:dev',
		'asset-map-build-dev',
		'requirejs:dev',
		'create-build-index:dev',
		'asset-map-dev'
	]);

	// Builds a production release, js and css minified
	grunt.registerTask('build-prod', [
		'clean:build-prod',
		'setup',
		'make-dir:build-prod',
		'copy:prod',
		'asset-map-build-prod',
		'requirejs:prod',
		'create-build-index:prod',
		'cssmin',
		'asset-map-dev'
	]);

	// Builds a development release, no minification
	grunt.registerTask('build-dev-no-jquery', [
		'clean:build-dev',
		'css',
		'asset-map-dev',
		'make-dir:build-dev',
		'copy:dev',
		'asset-map-build-dev',
		'requirejs:dev',
		'create-build-index:dev',
		'asset-map-dev'
	]);

	// Builds a production release, js and css minified
	grunt.registerTask('build-prod-no-jquery', [
		'clean:build-prod',
		'css',
		'asset-map-dev',
		'make-dir:build-prod',
		'copy:prod',
		'asset-map-build-prod',
		'requirejs:prod',
		'create-build-index:prod',
		'cssmin',
		'asset-map-dev'
	]);

	// Default task setups for development
	grunt.registerTask('default', ['setup']);
};