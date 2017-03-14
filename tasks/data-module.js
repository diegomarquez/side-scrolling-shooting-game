var path = require('path');

module.exports = function(grunt) {
  grunt.registerMultiTask('create-data-modules', function() {
		
  		var template = this.options().template;

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

			 	var extension = path.extname(src);
			 	var baseName = path.basename(src, extension);

				// Process the template
				var r = grunt.template.process(grunt.file.read('tasks/templates/' + template), {
					data: {
						name: baseName,
						data: data
					}
				});
				
				// Destination path
				var name = dest + baseName + '.js';

				// Delete the file if it already exists
				if (grunt.file.isFile(name)) {
		     		grunt.file.delete(name, {force: true}); 
		    	}

		    	grunt.file.write(name, r);
			}
		};
	});
}
