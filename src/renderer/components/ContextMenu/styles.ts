import styled, { css } from 'styled-components';
import { shadows, transparency } from 'wexond-ui';

import { Pos } from '~/renderer/models';

export const StyledContextMenu = styled.div`
  width: 244px;
  background-color: #fff;
  border-radius: 4px;
  position: fixed;
  z-index: 1000;
  padding: 8px 0px;
  box-shadow: ${shadows(4)};

  ${({ visible, pos }: { visible: boolean; pos: Pos }) => css`
    pointer-events: ${visible ? 'auto' : 'none'};
    opacity: ${visible ? 1 : 0};
    top: ${pos.top}px;
    left: ${pos.left}px;
    transition: ${visible ? '0.15s opacity' : 'unset'};
  `}
`;

export const StyledContextMenuItem = styled.div`
  width: 100%;
  height: 32px;
  padding: 0px 24px;
  font-size: 14px;
  display: flex;
  align-items: center;
  white-space: nowrap;

  ${({ disabled }: { disabled?: boolean }) => css`
    pointer-events: ${disabled ? 'none' : 'unset'};
    color: ${disabled
      ? `rgba(0, 0, 0, ${transparency.text.disabled})`
      : '#000'};
  `}

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;
