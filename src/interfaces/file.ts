import { IFile as File } from 'qusly-core';

export interface IFile extends File {
  selected?: boolean;
  renamed?: boolean;
  cut?: boolean;
}
