var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('create-data-module', function() {		
		for (var i = 0; i < this.files.length; i++) {
			var file = this.files[i];

			var glob = file.src;
			var dest = file.dest;
			var writeMode = file.writeMode;
			var removeWhiteSpace = file.removeWhiteSpace;

			for (var j=0; j < glob.length; j++) {
			 	var src = glob[j];

			 	var data;

			 	if (writeMode == 'string') {
			 		data = "'" + grunt.file.read(src) + "'";
			 	}
			 	else {
			 		data = grunt.file.read(src);
			 	}

			 	if (removeWhiteSpace) {
			 		data = data.replace(/\s/g, '');
			 	}

				// Process the template 
				var r = grunt.template.process(grunt.file.read('tasks/templates/data-module-template.txt'), { 
					data: { 		
						data: data
					}
				});
				
				var extension = path.extname(src);

				// Destination path
				var name = dest + path.basename(src, extension) + '.js';

				// Delete the file if it already exists
				if (grunt.file.isFile(name)) {
		     		grunt.file.delete(name, {force: true});  
		    	}

		    	grunt.file.write(name, r);	
			}			
		};
	});
}
