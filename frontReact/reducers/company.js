const company = (state = {}, action) => {
  switch (action.type) {
    case 'COMPANY_REQUEST_START':
      return Object.assign({}, state,
                {
          isFetching: true,
          error: null
        });
    case 'COMPANY_REQUEST_FAIL':
      return Object.assign({}, state,
                {
          isFetching: false,
          error: action.error,
          company: action.company
        });
    case 'COMPANY_SET':
        return Object.assign({}, state,
                    {
            retrievedCompany: action.company,
            isFetching: false,
            error: null
          }
        );
    case 'COMPANIES_SET':
        return Object.assign({}, state,
                    {
            companies: action.companies,
            pagination: action.pagination,
            categoryId: action.categoryId,
            isFetching: false,
            error: null
          }
        );
    case 'CATEGORIES_SET':
        return Object.assign({}, state,
          {
            categories: action.categories,
            isFetching: false,
            error: null
          }
        );
    case 'GALLERY_FREEZE':
        return Object.assign({}, state,
          {
            galleryFrozen: true
          }
        );
    case 'GALLERY_DELETE_PICS':
      const newGallery = state.retrievedCompany.gallery.filter(pic => action.pics.indexOf(pic) === -1);
      const updatedCompany = Object.assign({}, state.retrievedCompany, {gallery: newGallery});
      return Object.assign({}, state,
        {
          galleryFrozen: false,
          retrievedCompany: updatedCompany,
          error: null
        }
      );
    case 'GALLERY_FAIL':
      return Object.assign({}, state,
        {
          galleryFrozen: false,
          error: action.error
        }
      );
    default:
      return state;
  }
};

export default company;
