import {
  LocalFileItem,
  LocalFileListParams,
  LocalReadFileParams,
  LocalReadFilesParams,
  LocalSearchFilesParams,
} from '../types';

export interface LocalFilesDispatchEvents {
  // Local Files API Events
  listLocalFiles: (params: LocalFileListParams) => Promise<LocalFileItem[]>;
  readLocalFile: (
    params: LocalReadFileParams,
  ) => Promise<{ content: string; error?: string; success: boolean }>;
  readLocalFiles: (
    params: LocalReadFilesParams,
  ) => Promise<{ content: string; error?: string; success: boolean }[]>;
  searchLocalFiles: (params: LocalSearchFilesParams) => Promise<LocalFileItem[]>;
}
