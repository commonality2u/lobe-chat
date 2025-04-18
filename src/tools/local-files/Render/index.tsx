import { memo } from 'react';

import { LocalFilesApiName } from '@/tools/local-files';
import { FileResult } from '@/tools/local-files/type';
import { BuiltinRenderProps } from '@/types/tool';

import SearchFiles from './SearchFiles';

const LocalFilesRender = memo<
  BuiltinRenderProps<FileResult[], any, { searchResults: FileResult[] }>
>(({ pluginState, apiName }) => {
  switch (apiName) {
    case LocalFilesApiName.searchLocalFiles: {
      return <SearchFiles searchResults={pluginState?.searchResults} />;
    }
  }
});

LocalFilesRender.displayName = 'LocalFilesRender';

export default LocalFilesRender;
