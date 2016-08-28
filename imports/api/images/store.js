import { UploadFS } from 'meteor/jalik:ufs';
import { Images, Thumbs96, Thumbs40 } from './collection';
import { Meteor } from 'meteor/meteor';


export const Thumbs96Store = new UploadFS.store.GridFS({
  collection: Thumbs96,
  name: 'thumbs96',
  transformWrite: function(from, to, fileId, file) {
        var gm = require('gm').subClass({imageMagick:true});
        if (gm) {
            gm(from)
                .resize(96, 96)
                .gravity('Center')
                .extent(96, 96)
                .quality(75)
                .stream().pipe(to);

        } else {
            console.error("gm is not available", file);
        }
    }
});
export const Thumbs40Store = new UploadFS.store.GridFS({
  collection: Thumbs40,
  name: 'thumbs40',
  transformWrite: function(from, to, fileId, file) {
        var gm = require('gm').subClass({imageMagick:true});
        if (gm) {
            gm(from)
                .resize(40, 40)
                .gravity('Center')
                .extent(40, 40)
                .quality(75)
                .stream().pipe(to);

        } else {
            console.error("gm is not available", file);
        }
    }
});


export const ImagesStore = new UploadFS.store.GridFS({
  collection: Images,
  name: 'images',
  chunkSize: 1024 * 128,
  onCopyError: (err, fileId, file) => {
    console.error('Cannot create copy ' + file.name);
  },
  filter: new UploadFS.Filter({
    contentTypes: ['image/*'],
  }),
  transformWrite: function(from, to, fileId, file) {
        var gm = require('gm').subClass({imageMagick:true});
        if (gm) {
            gm(from)
                //.resize(1000, 1000,'>')
                //.gravity('Center')
                //.extent(1000, 1000)
                .quality(95)
                .stream().pipe(to);

        } else {
            console.error("gm is not available", file);
        }
    },
  copyTo: [
    Thumbs40Store,
    Thumbs96Store,
  ],
});
