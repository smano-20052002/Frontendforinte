import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddCourseView } from "../view/Course/Course/AddCourseView";
import { CourseContent } from "../view/Course/Course/CourseContentView";
import Topics from "../view/Course/Topic/Topics";
import SavedTopics from "../Component/Course/Topic/SavedTopics";
import AddMaterial from "../view/Course/Material/AddMaterial";
function App() {
return (
    <BrowserRouter>
      <Routes>
        <Route path="/addcourse" element={<AddCourseView/>} />
        <Route path="/coursecontent" element={<CourseContent/>} />
        <Route path="/addtopic/:id" element={<Topics/>} />
        <Route path="/savedtopics/:id" element={<SavedTopics/>} />
        <Route path='/addcontent/:id' element={<AddMaterial/>}/>

        
      </Routes>
    </BrowserRouter>
  );
}
export default App;
