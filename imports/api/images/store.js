import { UploadFS } from 'meteor/jalik:ufs';
import { Images, Thumbs } from './collection';
import { Meteor } from 'meteor/meteor';


export const ThumbsStore = new UploadFS.store.GridFS({
  collection: Thumbs,
  name: 'thumbs',
  // transformWrite: (from, to, fileId, file) => {
  //   const gm = Npm.require('gm');
  //   if (gm) {
  //     gm(from)
  //           .resize(30, 30)
  //           .gravity('Center')
  //           .extent(30, 30)
  //           .quality(80)
  //           .stream()
  //           .pipe(to);
  //   } else {
  //     console.error('im is not available', file);
  //   }
  // },
});

export const ImagesStore = new UploadFS.store.GridFS({
  collection: Images,
  name: 'images',
  chunkSize: 1024 * 255,
  onCopyError: (err, fileId, file) => {
    console.error('Cannot create copy ' + file.name);
  },
  filter: new UploadFS.Filter({
    contentTypes: ['image/*'],
  }),
  copyTo: [
    ThumbsStore,
  ],
});
