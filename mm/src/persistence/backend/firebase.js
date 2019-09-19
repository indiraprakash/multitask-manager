import axios from 'axios';
import { MultiTaskManagerData } from '../../model/MultiTaskManagerData';

const baseUrl = 'https://multitaskmanager-60d66.firebaseio.com/';
const dataBaseName = 'multitaskManagerData2';

export const saveDataSet = (multitaskManagerData, overwrite = true) => {

  const url = `${baseUrl}/${dataBaseName}/${multitaskManagerData.name}.json`;

  const currentVersion = multitaskManagerData.version;

  const nextVersionPromise = new Promise((resolve, reject) => {
    if(overwrite) {
      getVersion(multitaskManagerData.name)
      .then(version => resolve(version + 1))
      .catch((error) => {
        reject(error);
      });
    }
    else {
      resolve(multitaskManagerData.version);
    }
  });

  return nextVersionPromise.then(nextVersion => {
    console.log('multitaskManagerData.version', nextVersion); 
    multitaskManagerData.version = nextVersion;
    return axios.put(
      url,
      multitaskManagerData);
  })
  .then(response => {
    // eslint-disable-next-line no-console
    console.log('[persistence][firebase][save][success]', response);
    //return multitaskManagerData.version;
    return multitaskManagerData;
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log('[persistence][firebase][save][error]', error);
    multitaskManagerData.version = currentVersion;
    throw error;
  });
}

export const loadDataSet = (name) => {

  const url = `${baseUrl}/${dataBaseName}.json?orderBy="name"&equalTo="${name}"`; 
  return axios.get(url)
  .then(response =>  response.data)
  .then(mmDataObj => {

    // convert raw object data from firebase back to the appropriate type.
    const mmData = MultiTaskManagerData.create(mmDataObj[name]);

    // eslint-disable-next-line no-console
    console.log('[persistence][firebase][loadDataSet][success]', mmData);
    return mmData;
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log('[persistence][firebase][loadDataSet][error]', error);
    throw error;
  });
}

export const loadDataSetNames = () => {
  const url = `${baseUrl}/${dataBaseName}.json?shallow=true`;
  return axios.get(url)
  .then(response => response.data)
  .then(data => {

    const result = data ? Object.keys(data) : [];

    // eslint-disable-next-line no-console
    console.log('[persistence][firebase][loadDataSetNames][success]', result);
    // returns an array of containing the names of the available data sets.
    return result;
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log('[persistence][firebase][loadDataSetNames][error]', error);
    throw error;
  })
};

export const getVersion = (name) => {
  const url = `${baseUrl}/${dataBaseName}/${name}/version.json`;
  console.log(url);
  
  return axios.get(url)
  .then(response => response.data)
  .then(data => {

    // eslint-disable-next-line no-console
    console.log('[persistence][firebase][getVersion][success]', name, data);
    // returns an array of containing the names of the available data sets.
    if(!data) return 0;
    return data;
  })
  .catch(error => {
    // eslint-disable-next-line no-console
    console.log('[persistence][firebase][getVersion][error]', name, error);
    throw error;
  });
}
