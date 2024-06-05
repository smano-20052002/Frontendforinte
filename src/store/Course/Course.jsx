import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Corrected import
import courseReducer from '../../reducer/Course/Course/AddCourseReducer';
import addCourse from '../../middleware/Course/Course/AddCourse';
import fetchcategoryApi from '../../middleware/Course/Category/FetchCategoryMiddleware';
import fetchlevelApi from '../../middleware/Course/Level/FetchLevelMiddleware';
import fetchCategoryReducer from '../../reducer/Course/Category/FetchCategoryReducer';
import fetchLevelReducer from '../../reducer/Course/Level/FetchLevelReducer';
import categoryReducer from '../../reducer/Course/Category/AddCategoryReducer';
import addCategory from '../../middleware/Course/Category/AddCategoryMiddleware';
import fetchCourseReducer from '../../reducer/Course/Course/FetchCourseDetailReducer';
import fetchcourseApi from '../../middleware/Course/Course/FetchCourseDetailMiddleware';
import addTopicReducer from '../../reducer/Course/Topic/AddTopicReducer';
import addTopic from '../../middleware/Course/Topic/AddTopicMiddleware';
// import storage from 'redux-persist/lib/storage';
//import { persistReducer,persistStore } from 'redux-persist';

import fetchTopicsReducer from '../../reducer/Course/Topic/FetchTopicReducer';
import fetchTopicsApi from '../../middleware/Course/Topic/FetchTopicMiddleware';
import fetchEditTopicsApi from '../../middleware/Course/Topic/FetchEditTopicMiddleware';
import fetchEditTopicsReducer from '../../reducer/Course/Topic/FetchEditTopicsReducer';
import updateTopicReducer from '../../reducer/Course/Topic/UpdateTopicsReducer'
import updateTopicsApi from '../../middleware/Course/Topic/UpdateTopicsMiddleware';
import deleteTopicReducer from '../../reducer/Course/Topic/DeleteTopicsReducer';
import deleteTopic from '../../middleware/Course/Topic/DeleteTopicMiddleware';
import addContent from '../../middleware/Course/Material/AddContentMiddleware';
import AddMaterialReducer from '../../reducer/Course/Material/AddContentReducer';
import fetchMaterialTypeReducer from '../../reducer/Course/Material/FetchMaterialTypeReducer';
import fetchMaterialTypeApi from '../../middleware/Course/Material/FetchMaterialTypeMiddleware';
import fetchContentApi from '../../middleware/Course/Material/FetchContentMiddleware';
import fetchContentReducer from '../../reducer/Course/Material/FetchContentReducer';
import deleteContentReducer from '../../reducer/Course/Material/DeleteContentReducer';
import deleteContentApi from '../../middleware/Course/Material/DeleteContentMiddleware';
import fetchIndividualContentReducer from '../../reducer/Course/Material/FetchIndividualContentByIdReducer';
import fetchIndividualContentApi from '../../middleware/Course/Material/FetchIndividualContentByIdMiddleware';
import updateContentReducer from '../../reducer/Course/Material/UpdateContentReducer';
import updateContentApi from '../../middleware/Course/Material/UpdateContentMiddleware';
import fetchContentUrlReducer from '../../reducer/Course/Material/FetchContentUrlReducer';
import fetchContentUrlApi from '../../middleware/Course/Material/FetchContentUrlMiddleware';
// const persistConfig={
//   key:'root',
//   storage,
//   // blacklist:['fetchTopic']
// };

const rootReducer = combineReducers({
  course: courseReducer, // The key you've used for your course reducer
  level:fetchLevelReducer,
  category:fetchCategoryReducer,
  addCategory:categoryReducer,
  fetchCourse:fetchCourseReducer,
  Topic:addTopicReducer,
  fetchTopic:fetchTopicsReducer,
  fetchEditTopic:fetchEditTopicsReducer,
  updateTopic:updateTopicReducer,
   deleteTopic:deleteTopicReducer,
   deleteContent:deleteContentReducer,
   addContent: AddMaterialReducer,
  fetchMaterialType:fetchMaterialTypeReducer,
  fetchContent:fetchContentReducer,
  fetchIndividualContent: fetchIndividualContentReducer,
  updateContent:updateContentReducer,
  fetchContentUrl:fetchContentUrlReducer,
 
});
//const persistedReducer= persistReducer(persistConfig,rootReducer);

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, addCourse,addCategory,fetchcategoryApi,fetchlevelApi,fetchcourseApi,addTopic,fetchTopicsApi,fetchEditTopicsApi,updateTopicsApi,deleteTopic,addContent,fetchMaterialTypeApi,fetchContentApi,deleteContentApi,fetchIndividualContentApi,updateContentApi,fetchContentUrlApi) // Corrected middleware application
);

export default store;