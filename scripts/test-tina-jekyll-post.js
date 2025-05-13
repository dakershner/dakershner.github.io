import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simulate a Tina post edit (in-memory)
const post = {
  layout: 'post',
  title: 'Test Post',
  date: '2024-06-01T12:00:00Z',
  subtitle: 'A simulated post for Tina → Jekyll test.',
  'cover-img': '/assets/img/test.jpg',
  'thumbnail-img': '/assets/img/test-thumb.jpg',
  'share-img': '/assets/img/test-share.jpg',
  tags: ['test', 'tina'],
  author: 'Test Author',
  body: 'This is a test post body.'
};

// Serialize to YAML frontmatter string
const frontmatter = `---\n${yaml.dump(post)}---\n`;

// Write to a temp file for validation
const tmpPath = path.join(__dirname, '../_tmp_tina_post.yml');
fs.writeFileSync(tmpPath, frontmatter.replace(/^---\n|---\n$/g, ''));

// Validate with yamale
const schemaPath = path.join(__dirname, '../_schemas/post.schema.yml');
const result = spawnSync('yamale', ['-s', schemaPath, tmpPath], { encoding: 'utf-8' });

console.log(result.stdout);
console.error(result.stderr);

// Clean up temp file
fs.unlinkSync(tmpPath);

if (result.status === 0) {
  console.log('✅ Tina → Jekyll post interoperability test passed!');
  process.exit(0);
} else {
  console.error('❌ Tina → Jekyll post interoperability test failed!');
  process.exit(1);
} 