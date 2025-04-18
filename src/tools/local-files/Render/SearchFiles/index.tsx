import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import FileItem from '@/tools/local-files/components/FileItem';
import { FileResult } from '@/tools/local-files/type';

interface SearchFilesProps {
  searchResults?: FileResult[];
}

const SearchFiles = memo<SearchFilesProps>(({ searchResults = [] }) => {
  return (
    <Flexbox gap={2} style={{ maxHeight: 260, overflow: 'scroll' }}>
      {searchResults.map((item) => (
        <FileItem key={item.path} {...item} />
      ))}
    </Flexbox>
  );
});

SearchFiles.displayName = 'SearchFiles';

export default SearchFiles;
