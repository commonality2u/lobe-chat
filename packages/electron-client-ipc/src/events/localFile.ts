import {
  LocalFileItem,
  LocalFileListParams,
  LocalReadFileParams,
  LocalReadFilesParams,
  LocalSearchFilesParams,
  OpenLocalFileParams,
  OpenLocalFolderParams,
} from '../types';

export interface LocalFilesDispatchEvents {
  // Local Files API Events
  listLocalFiles: (params: LocalFileListParams) => LocalFileItem[];
  // New methods
  openLocalFile: (params: OpenLocalFileParams) => { error?: string; success: boolean };
  openLocalFolder: (params: OpenLocalFolderParams) => { error?: string; success: boolean };
  readLocalFile: (params: LocalReadFileParams) => {
    content: string;
    error?: string;
    success: boolean;
  };

  readLocalFiles: (
    params: LocalReadFilesParams,
  ) => { content: string; error?: string; success: boolean }[];
  searchLocalFiles: (params: LocalSearchFilesParams) => LocalFileItem[];
}
