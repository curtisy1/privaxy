import React from 'react';
import { Box } from 'braid-design-system';
import useIcon, { UseIconProps } from "braid-design-system/lib/hooks/useIcon";
import { ReactComponent as IconPauseSvg } from './pause.svg';

export type IconPauseProps = UseIconProps;

export const IconPause = (props: IconPauseProps) => {
  const iconProps = useIcon(props);

  return <Box component={IconPauseSvg} {...iconProps} />;
};