// File: src/app/api/save-result/route.ts

import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    // 1. Get the new result data from the request body
    const newResult = await request.json();

    // Define the path to the JSON file in the project's root directory
   const filePath = path.join(process.cwd(), 'app', 'vision-setup', 'vision_test_history.json');

    let history = [];

    try {
      // 2. Try to read the existing history file
      const data = await fs.readFile(filePath, 'utf8');
      history = JSON.parse(data);
    } catch (error) {
      // If the file doesn't exist, that's okay. We'll create it.
      // We check for the specific 'ENOENT' error code for "file not found"
      if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw error; // Re-throw other errors
      }
    }

    // 3. Add the new result to the history array
    history.push(newResult);

    // 4. Write the updated history back to the file
    // The `null, 2` argument pretty-prints the JSON, making it easy to read
    await fs.writeFile(filePath, JSON.stringify(history, null, 2));

    return new Response(JSON.stringify({ message: 'Result saved successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error saving vision test result:', error);
    return new Response(JSON.stringify({ message: 'Failed to save result' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}