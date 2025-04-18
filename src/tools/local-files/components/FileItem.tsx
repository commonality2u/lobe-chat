import { createStyles } from 'antd-style';
import React, { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import FileIcon from '@/components/FileIcon';
import { formatSize } from '@/utils/format';

import { FileResult } from '../type';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    border-radius: 4px;
    color: ${token.colorTextSecondary};

    :hover {
      background: ${token.colorFillTertiary};
      color: ${token.colorText};
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
    color: ${token.colorTextTertiary};
    min-width: 50px;
    font-size: 10px;
    text-align: end;
    font-family: ${token.fontFamilyCode};
  `,
  title: css`
    display: block;
    overflow: hidden;
    color: inherit;

    text-overflow: ellipsis;
    white-space: nowrap;
  `,
}));

const FileItem = memo<FileResult>(({ isDirectory, name, path, size, type }) => {
  const { styles } = useStyles();

  return (
    <Flexbox
      align={'center'}
      className={styles.container}
      gap={12}
      horizontal
      padding={'2px 8px'}
      style={{ fontSize: 12, width: '100%' }}
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
      <span className={styles.size}>{formatSize(size)}</span>
    </Flexbox>
  );
});

export default FileItem;
