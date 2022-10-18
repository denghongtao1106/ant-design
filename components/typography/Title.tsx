import * as React from 'react';
import { tupleNum } from '../_util/type';
import warning from '../_util/warning';
import type { BlockProps } from './Base';
import Base from './Base';

const TITLE_ELE_LIST = tupleNum(1, 2, 3, 4, 5);

export interface TitleProps
  extends Omit<BlockProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5'>, 'strong'>,
    Omit<
      React.HTMLAttributes<HTMLHeadElement>,
      'type' | keyof BlockProps<'h1' | 'h2' | 'h3' | 'h4' | 'h5'>
    > {
  level?: typeof TITLE_ELE_LIST[number];
}

const Title = React.forwardRef<HTMLElement, TitleProps>((props, ref) => {
  const { level = 1, ...restProps } = props;
  let component: keyof JSX.IntrinsicElements;

  if (TITLE_ELE_LIST.indexOf(level) !== -1) {
    component = `h${level}`;
  } else {
    warning(
      false,
      'Typography.Title',
      'Title only accept `1 | 2 | 3 | 4 | 5` as `level` value. And `5` need 4.6.0+ version.',
    );
    component = 'h1';
  }

  return <Base ref={ref} {...restProps} component={component} />;
});

export default Title;
