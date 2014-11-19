var path = require('path');

module.exports = function(grunt) {
    grunt.registerMultiTask('create-build-index', function() {		
		var options = this.options();
	
		var p = grunt.file.readJSON('package.json');

		// Process the template 
		var r = grunt.template.process(grunt.file.read('tasks/templates/index-template.txt'), { data: p });
	
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
