const Company = require("../../models").Company;
const User = require("../../models").User;

module.exports = {
  getById(req, res) {
    return Company
      .findById(req.params.company_id, {
        include: [{
          model: User,
          attributes: ['id', 'name'],
          as: "owner"
        }]
      })
      .then(company => {
        let gallery = [];
        fs.readdir('./db/images/company/'+ company.id, (err, files) => {
          if (files) {
            files.forEach(file => {
              gallery.push(file);
              // gallery.push('/company/'+company.id+'/picture/' + file);
            });
          }
          let host = req.get('host');
          res.status(200).send({company: company, gallery: gallery, host:host});
        });
      })
      .catch(error => res.status(500).send(error));
  },
  getByIdMiddleware(id, attr) {
      let config = {};
      attr && attr.length > 0 ? config.attributes = attr : null;
      return Company.findById(id, config);
  }
};
