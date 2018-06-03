import React from 'react';
import PropTypes from 'prop-types';
import FormInput from './formInput';
import FormSelect from './formSelect';
import Gallery from './gallery';

class CompanyForm extends React.Component {
  constructor(props) {
    super(props);
    this.alterInput = this.alterInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.setFiles = this.setFiles.bind(this);
    let initState = {name: "", email: "", address: "", homepage: "", description: "", error: null, gallery: [], category: null};
    this.state = Object.assign({}, initState, this.props.company);
  }

  alterInput(evt) {
    this.setState({[evt.target.id]: evt.target.value});
  }
  setFiles(evt) {
    const { company } = this.props;
    let gallery = company.gallery ? company.gallery : [];
    let temp = {gallery};
    Array.prototype.forEach.call(evt.target.files, (file, i) => {
      temp[`gallery[${i}]`] = file;
      temp.gallery.push(file.name);
    });
    this.setState(temp);
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.submitCompany(this.state);
  }
  handleDelete(evt) {
    evt.preventDefault();
    this.props.deleteCompany();
  }

  render() {
    const { isNew, company, categories, error, deletePic } = this.props;
    let showPics = !isNew && company.gallery && company.gallery.length > 0;
    return(
      <form onSubmit={this.handleSubmit}>
        <h1>{isNew ? 'New company': company.name}</h1>
        {isNew && <FormInput type={'text'} id={'name'} value={this.state.name} label={'Company name'} onChange={this.alterInput} />}
        <FormInput type={'text'} id={'email'} value={this.state.email} label={'Email'} onChange={this.alterInput} />
        <FormInput type={'text'} id={'address'} value={this.state.address} label={'Address'} onChange={this.alterInput} />
        <FormInput type={'text'} id={'homepage'} value={this.state.homepage} label={'Homepage'} onChange={this.alterInput} />
        <FormInput type={'text'} id={'description'} value={this.state.description} label={'Description'} onChange={this.alterInput} />
        {isNew && <FormSelect data={categories} label={'Category'} id={'category'} onChange={this.alterInput} valueAttr={'id'} nameAttr={'name'} />}
        <div className="form-group">
          <label htmlFor={'files'}>Profile picture</label>
          <input className="form-control-file" id={'files'} type="file" name={'files'} onChange={this.setFiles} multiple/>
        </div>
        {showPics && <Gallery pictures={company.gallery} companyId={company.id} editable={true}/>}
        {
          isNew ?
          <div className="modal-footer">
            <button className="btn btn-primary" type="submit" name="button">Create</button>
          </div>
          :
          <div className="modal-footer">
            <button className="btn btn-primary" type="submit">Update</button>
            <button className="btn btn-secondary" type="button" onClick={this.handleDelete}>Delete</button>
          </div>
        }
        {(error || this.state.error) && <span className="alert alert-dismissible alert-danger">{this.state.error ? this.state.error : error}</span>}
      </form>
    );
  }
}

CompanyForm.propTypes = {
  company: PropTypes.object,
  categories: PropTypes.array,
  submitCompany: PropTypes.func.isRequired,
  deleteCompany: PropTypes.func,
  isNew: PropTypes.bool,
  error: PropTypes.string,
};

export default CompanyForm;
