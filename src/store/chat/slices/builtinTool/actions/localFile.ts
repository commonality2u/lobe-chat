import {
  LocalFileListParams,
  LocalReadFileParams,
  LocalReadFilesParams,
  LocalSearchFilesParams,
} from '@lobechat/electron-client-ipc';
import { StateCreator } from 'zustand/vanilla';

import { localFileService } from '@/services/electron/localFileService';
import { ChatStore } from '@/store/chat/store';

export interface LocalFileAction {
  listLocalFiles: (id: string, params: LocalFileListParams) => Promise<boolean>;
  readLocalFile: (
    id: string,
    params: LocalReadFileParams,
  ) => Promise<{ content: string; error?: string; success: boolean } | undefined>;
  readLocalFiles: (
    id: string,
    params: LocalReadFilesParams,
  ) => Promise<{ content: string; error?: string; success: boolean }[] | undefined>;
  searchLocalFiles: (id: string, params: LocalSearchFilesParams) => Promise<boolean>;
  toggleLocalFileLoading: (id: string, loading: boolean) => void;
}

export const localFileSlice: StateCreator<
  ChatStore,
  [['zustand/devtools', never]],
  [],
  LocalFileAction
> = (set, get) => ({
  listLocalFiles: async (id, params) => {
    get().toggleLocalFileLoading(id, true);
    try {
      const data = await localFileService.listLocalFiles(params);
      await get().updatePluginState(id, { files: data });
      await get().internal_updateMessageContent(id, JSON.stringify(data));
    } catch (error) {
      console.error('Error listing local files:', error);
      await get().internal_updateMessagePluginError(id, {
        body: error,
        message: (error as Error).message,
        type: 'PluginServerError',
      });
    }
    get().toggleLocalFileLoading(id, false);

    return true;
  },

  readLocalFile: async (id, params) => {
    get().toggleLocalFileLoading(id, true);
    let result;
    try {
      result = await localFileService.readLocalFile(params);
      await get().updatePluginState(id, { fileContent: result });
      // Potentially update message content if needed, depends on usage
      // await get().internal_updateMessageContent(id, JSON.stringify(result));
    } catch (error) {
      console.error('Error reading local file:', error);
      await get().internal_updateMessagePluginError(id, {
        body: error,
        message: (error as Error).message,
        type: 'PluginServerError',
      });
    }
    get().toggleLocalFileLoading(id, false);
    return result;
  },

  readLocalFiles: async (id, params) => {
    get().toggleLocalFileLoading(id, true);
    let results;
    try {
      results = await localFileService.readLocalFiles(params);
      await get().updatePluginState(id, { filesContent: results });
      // Potentially update message content if needed, depends on usage
      // await get().internal_updateMessageContent(id, JSON.stringify(results));
    } catch (error) {
      console.error('Error reading local files:', error);
      await get().internal_updateMessagePluginError(id, {
        body: error,
        message: (error as Error).message,
        type: 'PluginServerError',
      });
    }
    get().toggleLocalFileLoading(id, false);
    return results;
  },

  searchLocalFiles: async (id, params) => {
    get().toggleLocalFileLoading(id, true);
    try {
      const data = await localFileService.searchLocalFiles(params);
      await get().updatePluginState(id, { searchResults: data });
      await get().internal_updateMessageContent(id, JSON.stringify(data));
    } catch (error) {
      console.error('Error searching local files:', error);
      await get().internal_updateMessagePluginError(id, {
        body: error,
        message: (error as Error).message,
        type: 'PluginServerError',
      });
    }
    get().toggleLocalFileLoading(id, false);

    return true;
  },

  toggleLocalFileLoading: (id, loading) => {
    // Assuming a loading state structure similar to searchLoading
    set(
      (state) => ({
        localFileLoading: { ...state.localFileLoading, [id]: loading },
      }),
      false,
      `toggleLocalFileLoading/${loading ? 'start' : 'end'}`,
    );
  },
});
