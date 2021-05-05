export const CHANGE_LOADING = 'CHANGE_LOADING';

export const changeLoading = value => {
  return {type: CHANGE_LOADING, loading: value};
};
