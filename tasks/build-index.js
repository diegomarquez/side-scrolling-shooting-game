var cheerio = require('cheerio');
var beautify = require('js-beautify').html;

module.exports = function(grunt) {
    grunt.registerMultiTask('create-build-index', function() {		
		var options = this.options();
	
		var p = grunt.file.readJSON('package.json');

		var $ = cheerio.load(grunt.file.read('index.html'), {xmlMode: true});
		
		var head = cheerio.load("<head></head>", {xmlMode: true});
		var body = cheerio.load("<body></body>", {xmlMode: true});

   	 	head('head').append($('head').find('[package]').removeAttr('package'));
   	 	body('body').append($('body').find('[package]').removeAttr('package'));
		
		p.head = head('head').html().replace(/^\s*[\r\n]/gm, '').trim();
		p.body = body('body').html().replace(/^\s*[\r\n]/gm, '').trim();

		p.cacheBustingId = options.cacheBustingId;

		// Process the template 
		var r = grunt.template.process(grunt.file.read('tasks/templates/index-template.txt'), { 
			data: p 
		});

		r = beautify(r, { indent_inner_html: true, extra_liners: [], indent_with_tabs: true });

		// Destination path
		var name = options.buildDir + 'index.html';

		// Delete the file if it already exists
		if (grunt.file.isFile(name)) {
	      grunt.file.delete(name, {force: true});  
	    }

	    // Write the file
	    grunt.file.write(name, r);
	});
}
