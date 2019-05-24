all: switchcluster/js/index.js

switchcluster/js/index.js: js/*
	yarn install
	yarn run webpack

clean:
	rm -rf node_modules switchcluster/js