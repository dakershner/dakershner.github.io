import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simulate a Tina gallery edit (in-memory)
const gallery = {
  layout: 'photo_gallery',
  title: 'Test Gallery',
  description: 'A gallery created by Tina simulation.',
  photos: [
    { image: 'https://example.com/photo1.jpg' },
    { image: 'https://example.com/photo2.jpg' }
  ]
};

// Serialize to YAML frontmatter string
const frontmatter = `---\n${yaml.dump(gallery)}---\n`;

// Write to a temp file for validation
const tmpPath = path.join(__dirname, '../_tmp_tina_gallery.yml');
fs.writeFileSync(tmpPath, frontmatter.replace(/^---\n|---\n$/g, ''));

// Validate with yamale
const schemaPath = path.join(__dirname, '../_schemas/gallery_markdown.schema.yml');
const result = spawnSync('yamale', ['-s', schemaPath, tmpPath], { encoding: 'utf-8' });

console.log(result.stdout);
console.error(result.stderr);

// Clean up temp file
fs.unlinkSync(tmpPath);

if (result.status === 0) {
  console.log('✅ Tina → Jekyll gallery interoperability test passed!');
  process.exit(0);
} else {
  console.error('❌ Tina → Jekyll gallery interoperability test failed!');
  process.exit(1);
} 