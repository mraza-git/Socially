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
    // Optimize speed transfer by increasing/decreasing chunk size automatically
    adaptive: true,
    // The size of each chunk sent to the server
    chunkSize: 8 * 1024, // 8k
    // The max chunk size (used only if adaptive = true)
    maxChunkSize: 128 * 1024, // 128k
    // This tells how many tries to do if an error occurs during upload
    maxTries: 5,
    // The error callback
    onError: reject,
    onComplete: resolve,
  });
  worker.start();
}
