import { memo } from 'react';

import { LocalFilesApiName } from '@/tools/local-files';
import { FileResult, LocalFileSearchState } from '@/tools/local-files/type';
import { BuiltinRenderProps } from '@/types/tool';

import SearchFiles from './SearchFiles';

const LocalFilesRender = memo<BuiltinRenderProps<FileResult[], any, LocalFileSearchState>>(
  ({ pluginState, apiName, messageId, pluginError, args }) => {
    switch (apiName) {
      case LocalFilesApiName.searchLocalFiles: {
        return (
          <SearchFiles
            args={args}
            messageId={messageId}
            pluginError={pluginError}
            pluginState={pluginState}
          />
        );
      }
    }
  },
);

LocalFilesRender.displayName = 'LocalFilesRender';

export default LocalFilesRender;
