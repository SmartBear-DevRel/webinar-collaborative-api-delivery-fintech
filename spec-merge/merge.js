// npm install --save @apidevtools/json-schema-ref-parser js-yaml json-schema-merge-allof
// node merge.js pathToApiFile.yaml (with file extension, can be json or yaml)

const yaml = require('js-yaml');
const fs = require('fs');
const mergeAllOf = require('json-schema-merge-allof');
const $RefParser = require('@apidevtools/json-schema-ref-parser');
const path = require('path');
const args = process.argv.slice(2);

const inputFile = args[0];
if (!inputFile) {
  throw new Error('you must provide a path to an OpenAPI specification file');
}
const parsedPath = path.parse(args[0]);
const outputFile = path.join(
  parsedPath.dir,
  parsedPath.name + '-transformed.json'
);

main = async () => {
  const apiSpec = yaml.load(fs.readFileSync(inputFile).toString());

  async function preprocessOpenapiSpec(apiSpec) {
    const schema = await $RefParser.dereference(apiSpec);

    function mergeAllOfRecursively(candidate, parent, k) {
      if (typeof candidate !== 'object') return;

      if (candidate.allOf) {
        parent[k] = mergeAllOf(candidate, {
          ignoreAdditionalProperties: true,
          deep: true
        });
      } else {
        for (const [key, value] of Object.entries(candidate)) {
          mergeAllOfRecursively(value, candidate, key);
        }
      }
    }

    for (const [key, value] of Object.entries(schema)) {
      mergeAllOfRecursively(value, apiSpec, key);
    }

    return schema;
  }

  const preprocessedApiSpec = await preprocessOpenapiSpec(apiSpec);

  fs.writeFileSync(outputFile, JSON.stringify(preprocessedApiSpec));
};
main();
