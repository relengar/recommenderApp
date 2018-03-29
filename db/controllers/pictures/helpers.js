const buildUri = (req) => {
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
        reject("No picture found");
      }
      uri = uri.replace('{{reqType}}', reqType).replace('{{objId}}', objId).replace('{{pictureName}}', pictureName);
      resolve(uri);
    });
  });
};

const savePic = (req, res, tempPic) => {
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
  buildUri,
  savePic
};
