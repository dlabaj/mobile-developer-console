import { ResourceManagerFactory, OpenShiftWatchEvents } from './crmanagers';

const getNamespace = () => {
  if (window && window.OPENSHIFT_CONFIG && window.OPENSHIFT_CONFIG.mdcNamespace) {
    return window.OPENSHIFT_CONFIG.mdcNamespace;
  }
  return undefined;
};

const getMasterUri = () => {
  if (window && window.OPENSHIFT_CONFIG && window.OPENSHIFT_CONFIG.masterUri) {
    return window.OPENSHIFT_CONFIG.masterUri;
  }
  return undefined;
};

const getUser = () => {
  if (window.OPENSHIFT_CONFIG && window.OPENSHIFT_CONFIG.user) {
    return Promise.resolve(Object.freeze(window.OPENSHIFT_CONFIG.user));
  }
  return Promise.reject(new Error('no user found'));
};

const getFavIcon = () => {
  if (window.OPENSHIFT_CONFIG && window.OPENSHIFT_CONFIG.favicon) {
    return window.OPENSHIFT_CONFIG.favicon;
  }
  return '/favicon.ico';
};

const getLogo = () => {
  if (window.OPENSHIFT_CONFIG && window.OPENSHIFT_CONFIG.logo) {
    return window.OPENSHIFT_CONFIG.logo;
  }
  return '/img/branding_logo.svg';
};

const getBackgroundImage = () => {
  if (window.OPENSHIFT_CONFIG && window.OPENSHIFT_CONFIG.backgroundImg) {
    return window.OPENSHIFT_CONFIG.backgroundImg;
  }
  return '';
};

const getBrandImage = () => {
  if (window.OPENSHIFT_CONFIG && window.OPENSHIFT_CONFIG.brandImg) {
    return window.OPENSHIFT_CONFIG.brandImg;
  }
  return '/img/brand.svg';
};

const getDocumentation = () => {
  if (window.OPENSHIFT_CONFIG && window.OPENSHIFT_CONFIG.documentation) {
    return window.OPENSHIFT_CONFIG.documentation;
  }
  return 'https://docs.aerogear.org/aerogear/latest/getting-started.html';
};

const get = (res, name) => ResourceManagerFactory.forResource(res.kind).get(res, name);

const update = (res, obj) => ResourceManagerFactory.forResource(obj.kind || res.kind).update(res, obj);

const list = res => ResourceManagerFactory.forResource(res.kind).list(res);

const create = (res, obj, owner) => ResourceManagerFactory.forResource(obj.kind || res.kind).create(res, obj, owner);

const remove = (res, obj) => ResourceManagerFactory.forResource(obj.kind || res.kind).remove(res, obj);

const watch = res => ResourceManagerFactory.forResource(res.kind).watch(res);

const listWithLabels = (res, labels) => ResourceManagerFactory.forResource(res.kind).list(res, labels);

export {
  get,
  create,
  list,
  watch,
  update,
  remove,
  OpenShiftWatchEvents,
  getUser,
  getBackgroundImage,
  getBrandImage,
  getFavIcon,
  getLogo,
  getDocumentation,
  listWithLabels,
  getNamespace,
  getMasterUri
};
