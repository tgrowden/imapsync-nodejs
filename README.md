#imap-sync-nodejs
================

This app serves as a frontend interface for [imapsync](https://github.com/imapsync/imapsync).

These instructions assume that you are working on Linux. This will probably also work on OSX.

#### Dependencies:
  * [nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com/)
  * [bower](http://bower.io/)
  * [grunt](http://gruntjs.com/)
  * [imapsync](https://github.com/imapsync/imapsync)

---

1. `$ git clone https://github.com/tgrowden/imap-sync-nodejs.git`
2. `$ cd imapsync-nodejs`
3. `$ npm install`
4. `$ bower install`
5. `$ grunt`
6. Edit `config/config.js` to point to imapsync location (default is `/usr/bin/imapsync`)
  * If you don't already have imapsync installed, you can use the submodule located at `./imapsync/imapsync`; just update the config with the absolute path.
6. `$ npm start`
7. Check it out: [http://localhost:3000](http://localhost:3000)
