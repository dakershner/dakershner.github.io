import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simulate a Tina photo collections edit (in-memory)
const photoCollections = {
  collections: [
    {
      id: 'test-collection',
      title: 'Test Collection',
      description: 'A collection created by Tina simulation.',
      thumbnail: 'https://example.com/thumbnail.jpg'
    },
    {
      id: 'another-collection',
      title: 'Another Collection',
      description: 'Another simulated collection.',
      thumbnail: 'https://example.com/another-thumbnail.jpg'
    }
  ]
};

// Serialize to YAML string
const yamlString = yaml.dump(photoCollections);

// Write to a temp file for validation
const tmpPath = path.join(__dirname, '../_tmp_tina_photo_collections.yml');
fs.writeFileSync(tmpPath, yamlString);

// Validate with yamale
const schemaPath = path.join(__dirname, '../_schemas/photo_collections.schema.yml');
const result = spawnSync('yamale', ['-s', schemaPath, tmpPath], { encoding: 'utf-8' });

console.log(result.stdout);
console.error(result.stderr);

// Clean up temp file
fs.unlinkSync(tmpPath);

if (result.status === 0) {
  console.log('✅ Tina → Jekyll photo collections interoperability test passed!');
  process.exit(0);
} else {
  console.error('❌ Tina → Jekyll photo collections interoperability test failed!');
  process.exit(1);
} 