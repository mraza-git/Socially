import { UploadFS } from 'meteor/jalik:ufs';
import { ImagesStore } from './store';
import { dataURLToBlob, blobToArrayBuffer } from './helpers';
import _ from 'underscore';

/**
 * Uploads a new file
 *
 * @param  {String}   dataUrl [description]
 * @param  {String}   name    [description]
 * @param  {Function} resolve [description]
 * @param  {Function} reject  [description]
 */
export function upload(dataUrl, name, resolve, reject) {
  // convert to Blob
  const blob = dataURLToBlob(dataUrl);
  blob.name = name;

  // pick from an object only: name, type and size
  const photo = _.pick(blob, 'name', 'type', 'size');

  // convert to ArrayBuffer
  // blobToArrayBuffer(blob, (data) => {
  //   console.log(blob);
  //   const worker = new UploadFS.Uploader({
  //     data,
  //     file,
  //     store: ImagesStore,
  //     onError: reject,
  //     onComplete: resolve,
  //   });

  //   worker.start();
  // }, reject);

  const worker = new UploadFS.Uploader({
    data: blob,
    file: photo,
    store: ImagesStore,
    onError: reject,
    onComplete: resolve,
  });
  worker.start();
}
