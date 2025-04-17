import { BuiltinToolManifest } from '@/types/tool';

import { systemPrompt } from './systemRole';

export const LocalFilesApiName = {
  listFiles: 'listFiles',
  readFile: 'readFile',
  searchFiles: 'searchFiles',
  writeFile: 'writeFile',
};

export const LocalFilesManifest: BuiltinToolManifest = {
  api: [
    {
      description:
        'List files and folders in a specified directory. Input should be a path. Output is a JSON array of file/folder names.',
      name: LocalFilesApiName.listFiles,
      parameters: {
        properties: {
          path: {
            description: 'The directory path to list',
            type: 'string',
          },
        },
        required: ['path'],
        type: 'object',
      },
    },
    {
      description:
        'Read the content of a specific file. Input should be the file path. Output is the file content as a string.',
      name: LocalFilesApiName.readFile,
      parameters: {
        properties: {
          path: {
            description: 'The file path to read',
            type: 'string',
          },
        },
        required: ['path'],
        type: 'object',
      },
    },
    {
      description:
        'Search for files within the workspace based on a query string. Input should be the search query. Output is a JSON array of matching file paths.',
      name: LocalFilesApiName.searchFiles,
      parameters: {
        properties: {
          directory: {
            description: 'Optional directory path to limit the search scope',
            type: 'string',
          },
          query: {
            description: 'The search query string (can include partial names or keywords)',
            type: 'string',
          },
        },
        required: ['query'],
        type: 'object',
      },
    },
    // TODO: Add writeFile API definition later
    // {
    //   description:
    //     'Write content to a specific file. Input should be the file path and content. Overwrites existing file or creates a new one.',
    //   name: LocalFilesApiName.writeFile,
    //   parameters: {
    //     properties: {
    //       path: {
    //         description: 'The file path to write to',
    //         type: 'string',
    //       },
    //       content: {
    //         description: 'The content to write',
    //         type: 'string',
    //       },
    //     },
    //     required: ['path', 'content'],
    //     type: 'object',
    //   },
    // },
  ],
  identifier: 'lobe-local-files',
  meta: {
    avatar: '📁',
    title: 'Local Files',
  },
  // Use a simplified system role for now
  systemRole: systemPrompt(),
  type: 'builtin',
};
