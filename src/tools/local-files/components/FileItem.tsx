import { ActionIcon } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { FolderOpen } from 'lucide-react';
import React, { memo, useState } from 'react';
import { Flexbox } from 'react-layout-kit';

import FileIcon from '@/components/FileIcon';
import { localFileService } from '@/services/electron/localFileService';
import { formatSize } from '@/utils/format';

import { FileResult } from '../type';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    border-radius: 4px;
    color: ${token.colorTextSecondary};

    :hover {
      color: ${token.colorText};
      background: ${token.colorFillTertiary};
    }
  `,
  path: css`
    overflow: hidden;

    font-size: 10px;
    line-height: 1;
    color: ${token.colorTextDescription};
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
  size: css`
    min-width: 50px;

    font-family: ${token.fontFamilyCode};
    font-size: 10px;
    color: ${token.colorTextTertiary};
    text-align: end;
  `,
  title: css`
    overflow: hidden;
    display: block;

    color: inherit;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
}));

const FileItem = memo<FileResult>(({ isDirectory, name, path, size, type }) => {
  const { styles } = useStyles();
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Flexbox
      align={'center'}
      className={styles.container}
      gap={12}
      horizontal
      onClick={() => {
        if (isDirectory) {
          localFileService.openLocalFolder({ isDirectory, path });
        } else {
          localFileService.openLocalFile({ path });
        }
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      padding={'2px 8px'}
      style={{ cursor: 'pointer', fontSize: 12, width: '100%' }}
    >
      {isDirectory ? (
        <FileIcon fileName={name} fileType={'txt'} size={16} variant={'folder'} />
      ) : (
        <FileIcon fileName={name} fileType={type} size={16} variant={'pure'} />
      )}
      <Flexbox align={'baseline'} gap={4} horizontal style={{ overflow: 'hidden', width: '100%' }}>
        <div className={styles.title}>{name}</div>
        <div className={styles.path}>{path}</div>
      </Flexbox>
      {isHovering ? (
        <Flexbox direction={'horizontal-reverse'} gap={8} style={{ minWidth: 50 }}>
          <ActionIcon
            icon={FolderOpen}
            onClick={(e) => {
              e.stopPropagation();
              localFileService.openLocalFolder({ isDirectory, path });
            }}
            size={'small'}
            style={{ height: 16, width: 16 }}
            title={'打开文件夹'}
          />
        </Flexbox>
      ) : (
        <span className={styles.size}>{formatSize(size)}</span>
      )}
    </Flexbox>
  );
});

export default FileItem;
