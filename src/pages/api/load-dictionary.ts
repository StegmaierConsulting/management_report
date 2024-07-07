// pages/api/load-dictionary.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { readFileSync } from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dictionaryAffPath = path.join(process.cwd(), 'node_modules', 'dictionary-es', 'index.aff');
  const dictionaryDicPath = path.join(process.cwd(), 'node_modules', 'dictionary-es', 'index.dic');

  try {
    const aff = readFileSync(dictionaryAffPath, 'utf-8');
    const dic = readFileSync(dictionaryDicPath, 'utf-8');
    res.status(200).json({ aff, dic });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load dictionary files' });
  }
}
