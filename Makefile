build-package:
	rm -rf dist
	yarn build
	cd dist/extension && zip -r ../../build/ioc-lens.zip * && cd ../..
