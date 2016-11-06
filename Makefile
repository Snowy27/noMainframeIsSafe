test-code-style:
		@node node_modules/jscs/bin/jscs -c .jscsrc $(flags) ./src
jshint:
		@jshint --exclude node_modules/ --exclude client/ $(flags) .
