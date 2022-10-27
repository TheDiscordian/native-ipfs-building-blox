import json, shutil

package = json.load(open("package.json"))
for i in package["dependencies"]:
	shutil.copyfile("node_modules/%s/dist/index.min.js" % i, "ui/%s.min.js" % i)