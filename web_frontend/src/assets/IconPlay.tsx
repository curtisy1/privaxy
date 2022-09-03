import React from 'react';
import { Box } from 'braid-design-system';
import useIcon, { UseIconProps } from "braid-design-system/lib/hooks/useIcon";
import { ReactComponent as IconPlaySvg } from './play.svg';

export type IconPlayProps = UseIconProps;

export const IconPlay = (props: IconPlayProps) => {
  const iconProps = useIcon(props);

  return <Box component={IconPlaySvg} {...iconProps} />;
};