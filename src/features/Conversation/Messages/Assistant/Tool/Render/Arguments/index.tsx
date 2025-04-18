import { Highlighter } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { parse } from 'partial-json';
import { memo, useMemo } from 'react';

import { useYamlArguments } from '@/hooks/useYamlArguments';

import ObjectEntity from './ObjectEntity';

const useStyles = createStyles(({ css, token }) => ({
  container: css`
    padding-block: 4px;
    padding-inline: 12px;
    border-radius: ${token.borderRadiusLG}px;

    font-family: ${token.fontFamilyCode};
    font-size: 13px;
    line-height: 1.5;

    background: ${token.colorFillQuaternary};
  `,
}));

export interface ArgumentsProps {
  arguments?: string;
  messageId?: string;
  shine?: boolean;
}

const Arguments = memo<ArgumentsProps>(({ arguments: args = '', shine, messageId }) => {
  const { styles } = useStyles();

  const requestArgs = useMemo(() => {
    try {
      const obj = parse(args);

      if (Object.keys(obj).length === 0) return {};

      return obj;
    } catch {
      return args;
    }
  }, [args]);

  const yaml = useYamlArguments(args);

  // pure text
  if (typeof requestArgs === 'string') {
    return (
      !!yaml && (
        <Highlighter language={'yaml'} showLanguage={false}>
          {yaml}
        </Highlighter>
      )
    );
  }

  const hasMinWidth = Object.keys(requestArgs).length > 1;

  if (Object.keys(requestArgs).length === 0) return null;

  return (
    <div className={styles.container}>
      {Object.entries(requestArgs).map(([key, value]) => {
        return (
          <ObjectEntity
            editable={!!messageId}
            hasMinWidth={hasMinWidth}
            key={key}
            objectKey={key}
            shine={shine}
            value={value}
          />
        );
      })}
    </div>
  );
});

export default Arguments;
