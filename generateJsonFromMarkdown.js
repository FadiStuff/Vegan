// generateJsonFromMarkdown.js

import fs from 'fs';
import path from 'path';

const mdDir = './md';
const outputFile = './src/data/full_arguments_array.json';

function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  // 🔍 Extract argument title
  const titleLine = lines.find(line => line.startsWith('# Argument'));
  if (!titleLine) return null;

  const argumentMatch = titleLine.match(/^# Argument \d+: "(.*?)"/);
  const argument = argumentMatch ? argumentMatch[1].trim() : 'Unknown';

  // ✅ Extract the hidden type comment
  const typeLine = lines.find(line => line.trim().startsWith('<!-- type:'));
  const typeMatch = typeLine ? typeLine.match(/<!-- type:\s*(.*?)\s*-->/) : null;
  const type = typeMatch ? typeMatch[1].trim() : 'Uncategorized';

  const responses = {
    ethical: { tldr: '', body: '' },
    practical: { tldr: '', body: '' },
    factual: { tldr: '', body: '' }
  };

  let currentType = null;
  let collecting = false;
  let bodyBuffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('**Ethical TL;DR:**')) {
      responses.ethical.tldr = lines[i + 1]?.trim() || '';
    } else if (line.startsWith('**Practical TL;DR:**')) {
      responses.practical.tldr = lines[i + 1]?.trim() || '';
    } else if (line.startsWith('**Factual TL;DR:**')) {
      responses.factual.tldr = lines[i + 1]?.trim() || '';
    }

    if (line === '## Ethical Response') {
      currentType = 'ethical';
      collecting = true;
      bodyBuffer = [];
      continue;
    } else if (line === '## Practical Response') {
      if (currentType) responses[currentType].body = bodyBuffer.join('\n').trim();
      currentType = 'practical';
      collecting = true;
      bodyBuffer = [];
      continue;
    } else if (line === '## Factual Response') {
      if (currentType) responses[currentType].body = bodyBuffer.join('\n').trim();
      currentType = 'factual';
      collecting = true;
      bodyBuffer = [];
      continue;
    }

    if ((line.startsWith('# ') || line.startsWith('## ')) && !line.includes('Response')) {
      if (currentType && collecting) {
        responses[currentType].body = bodyBuffer.join('\n').trim();
        collecting = false;
        currentType = null;
      }
    }

    if (collecting && currentType) {
      bodyBuffer.push(lines[i]);
    }
  }

  if (currentType && bodyBuffer.length > 0) {
    responses[currentType].body = bodyBuffer.join('\n').trim();
  }

  // ✅ Now include the type in the return value
  return { argument, responses, type };
}


function buildJsonFromMarkdown() {
  const files = fs.readdirSync(mdDir)
    .filter(f => f.endsWith('.md'))
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)[0], 10);
      const numB = parseInt(b.match(/\d+/)[0], 10);
      return numA - numB;
    });

  const data = [];

  files.forEach((file, index) => {
    const fullPath = path.join(mdDir, file);
    const parsed = parseMarkdownFile(fullPath);
    if (parsed) {
      parsed.id = index + 1;
      data.push(parsed);
    } else {
      console.warn(`⚠️ Skipped invalid file: ${file}`);
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), 'utf8');
  console.log(`✅ JSON written to: ${outputFile}`);
}

buildJsonFromMarkdown();
