import React from 'react';
import { Box } from 'braid-design-system';
import useIcon, { UseIconProps } from "braid-design-system/lib/hooks/useIcon";
import { ReactComponent as IconPulsatingCircleSvg } from './pulsatingCircle.svg';

export type IconPulsatingCircleProps = UseIconProps;

export const IconPulsatingCircle = (props: IconPulsatingCircleProps) => {
  const iconProps = useIcon(props);

  return <Box component={IconPulsatingCircleSvg} {...iconProps} />;
};