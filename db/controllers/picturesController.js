const Path = __dirname;

// get path to file based on req params, get fileName in case of user
let buildUri = (req) => {
  return new Promise((resolve, reject) => {
    let uri = '/images/{{reqType}}/{{objId}}/{{pictureName}}';// + req.params.picture_name;
    let reqType = req.path.indexOf('user') != -1 ? 'user' : 'company';
    let objId = reqType == 'user' ? req.params.user_id : req.params.company_id;
    let folderPath = './db/images/'+reqType+'/'+objId+'/';
    let pictureName;
    fs.readdir(folderPath, (err, files) => {
      if (files) {
        pictureName = files[0];
      }
      pictureName = reqType == 'user' ? pictureName : req.params.picture_name;
      if (!pictureName) {
        resolve('/images/user-icon-placeholder.jpeg');
        // reject("No picture found");
      }
      uri = uri.replace('{{reqType}}', reqType).replace('{{objId}}', objId).replace('{{pictureName}}', pictureName);
      resolve(uri);
    });
  });
};

let savePic = (req, res, tempPic) => {
  let reqType = req.path.indexOf('user') != -1 ? 'user' : 'company';
  let uploadStatus = 'Started';
  if (tempPic) {
    return new Promise(resolve => {
      fs.mkdir('./db/images/'+reqType+'/'+req.id, (err) => { // req.id have to be set before function call, based on owner id
        tempPic.mv('./db/images/'+reqType+'/'+req.id+'/' + tempPic.name, (err) => {
          if (err) {
            uploadStatus = err;
          }
          else {
            uploadStatus = "Image uploaded";
          }
          resolve(uploadStatus);
        });
      });
    });
  }
};

module.exports = {
    saveGallery(req, res, company) {
      let tempPic, uploadStatus, tempName, uploadPohotLimit = 20;
      let result = {
        files: [],
        error: ''
      };
      req.id = company.id;
      return new Promise((resolve) => {
        if (req.files && req.files['gallery[0]']) {
          for (let i = 0; i < uploadPohotLimit; i++) {
            let tempPic = req.files['gallery['+i+']'];
            if (tempPic) {
              savePic(req, res, tempPic)
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
        savePic(req, res, tempPic).then((msg => {
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
    async deleteGallery(req, res) {
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
            // for (let i = 0; i < files.length; i++) {
            //   fs.unlink(path + '/' + files[i], (err) => {
            //     console.log(files[i] + " removed");
            //   });
            // }
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
      buildUri(req)
      .then(uri => {
        res.sendFile(uri, {root: __dirname+"/../"}, (err) => {
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
