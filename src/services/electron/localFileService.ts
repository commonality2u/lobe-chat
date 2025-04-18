import {
  LocalFileItem,
  LocalFileListParams,
  LocalReadFileParams,
  LocalReadFilesParams,
  LocalSearchFilesParams,
  OpenLocalFileParams,
  OpenLocalFolderParams,
  dispatch,
} from '@lobechat/electron-client-ipc';

class LocalFileService {
  async listLocalFiles(params: LocalFileListParams): Promise<LocalFileItem[]> {
    return dispatch('listLocalFiles', params);
  }

  async readLocalFile(
    params: LocalReadFileParams,
  ): Promise<{ content: string; error?: string; success: boolean }> {
    return dispatch('readLocalFile', params);
  }

  async readLocalFiles(
    params: LocalReadFilesParams,
  ): Promise<{ content: string; error?: string; success: boolean }[]> {
    return dispatch('readLocalFiles', params);
  }

  async searchLocalFiles(params: LocalSearchFilesParams): Promise<LocalFileItem[]> {
    return dispatch('searchLocalFiles', params);
  }

  async openLocalFile(params: OpenLocalFileParams): Promise<{ error?: string; success: boolean }> {
    return dispatch('openLocalFile', params);
  }

  async openLocalFolder(
    params: OpenLocalFolderParams,
  ): Promise<{ error?: string; success: boolean }> {
    return dispatch('openLocalFolder', params);
  }
}

export const localFileService = new LocalFileService();
