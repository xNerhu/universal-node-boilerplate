import { observable, action } from 'mobx';
import { IFile } from 'qusly-core';

import { Session } from './session';
import { History } from './history';
import store from '../store';

let id = 0;

const _files: IFile[] = Array.from(Array(50).keys()).map(r => {
  return {
    name: r.toString(),
  } as IFile;
});

export class Page {
  @observable
  public id = id++;

  @observable
  public files: IFile[] = [..._files];

  @observable
  public selectedFiles: IFile[] = [];

  @observable
  public loading = true;

  public anchorFile: IFile;

  public history = new History();

  constructor(public session: Session, path?: string) {
    this.history.push(path);
  }

  @action
  public async prepare() {
    await this.session.connect();
    await this.fetch();
  }

  @action
  public async fetch() {
    this.loading = true;

    const files = await this.session.client.readDir(this.history.path);
    const icons = files.map(r => r.ext);

    await store.icons.load(icons);

    this.files = files;
    this.loading = false;
  }

  @action
  public selectFiles = (start: number, end: number) => {
    if (start > end) [start, end] = [end, start];

    this.selectedFiles = this.files.slice(start, end + 1);
  };
}
