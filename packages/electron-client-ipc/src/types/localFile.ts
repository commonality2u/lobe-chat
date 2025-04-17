// Define types for local file operations
export interface LocalFileItem {
  // Optional for directories
  createdTime?: Date;
  isDirectory: boolean;
  modifiedTime?: Date;
  name: string;
  path: string;
  size?: number;
}

export interface LocalFileListParams {
  path: string;
}

export interface LocalReadFileParams {
  path: string;
}

export interface LocalReadFilesParams {
  paths: string[];
}

export interface LocalSearchFilesParams {
  directory?: string;
  query: string; // Optional directory to limit search
}
