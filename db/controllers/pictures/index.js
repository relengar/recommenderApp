const helpers = require('./helpers.js');

module.exports = {
    saveGallery(req, res, company) {
      let tempPic, uploadStatus, tempName, uploadPohotLimit = 20;
      let result = {
        files: [],
        error: ''
      };
      req.id = company.id;
      return new Promise(resolve => {
        if (req.files && req.files['gallery[0]']) {
          for (let i = 0; i < uploadPohotLimit; i++) {
            let tempPic = req.files['gallery['+i+']'];
            if (tempPic) {
              helpers.savePic(req, res, tempPic)
              .then(status => {
                uploadStatus = status;
                tempName = tempPic.name;
                result.files.push({tempName: uploadStatus})
              })
            }
            else {
              break;
            }
          }
          resolve(result);
        }
        else {
          result.error = "No files uploaded";
          resolve(result);
        }
      });
    },
    savePicture(req, res) {
      return new Promise((resolve, reject) => {
        let tempPic = null;
        for (let pic in req.files) {
          tempPic = req.files[pic];
        }
        let statusMsg;
        helpers.savePic(req, res, tempPic).then((msg => {
          statusMsg = msg;
          if (statusMsg == "Image uploaded") {
            resolve(statusMsg);
          }
          else {
            reject(statusMsg);
          }
        }))
      })
    },
    deletePicture(req, res) {
      return new Promise((resolve, reject) => {
        let path = './db/images/company/'+req.query.id+'/'+req.params.fileName;
        fs.unlink(path, (err) => {
          msg = "File deleted";
          if (err) {
            msg = err;
          }
          resolve(msg);
        });
      });
    },
    deleteGallery(req, res) {
      return new Promise((resolve, reject) => {
        let reqType = req.path.indexOf('user') !== -1 ? 'user' : 'company';
        let reqId = reqType === 'user' ? req.user.id : req.params.company_id;
        let path = './db/images/'+reqType+'/'+reqId;
        let msg = "Started";
        fs.readdir(path, (err, files) => {
          if (files && files.length > 0) {
            files.forEach(file => {
              fs.unlink(path + '/' + file, (err) => {
                console.log(file + " removed");
              });
            });
          }
          fs.rmdir(path, (err) => {
            msg = "Done";
            if (err) {
              msg = err;
            }
            resolve(msg);
          });
        });
      });
    },
    getPicture(req, res) {
      helpers.buildUri(req)
      .then(uri => {
        res.sendFile(uri, {root: __dirname+"/../../"}, (err) => {
          if (err) {
            res.status(404).send(err);
          }
        });
      })
      .catch(err => {
        res.status(404).send(err);
      })
    }
};
