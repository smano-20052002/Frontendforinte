import React, { useState, useEffect } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css"
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useDispatch, useSelector } from "react-redux";
// import { Document, Page, pdfjs } from 'react-pdf/dist/esm/entry.webpack';
import { fetchContentUrlRequest } from "../../../action/Course/Material/FetchContentUrlAction";
import { Container, Overlay, Row } from "react-bootstrap";
 
function PDFViewer(prop) {
  const [error, setError] = useState(null);
  const { material } = prop;
  const [viewpdf, setViewPdf] = useState("");
  const dispatch = useDispatch();
 
  const pdf = useSelector((state) => state.fetchContentUrl.content);
 
  useEffect(() => {
    dispatch(fetchContentUrlRequest(material));                     {/*modified  full code */}
  }, [ material]);
 
  useEffect(() => {
   
      setViewPdf(pdf.filePath);
    console.log("pdf",pdf);
  }, [pdf]);
 
  // const newPlugin = defaultLayoutPlugin({
  //   toolbar: {
  //     download: {
  //       enabled: false, // Disable the download button
  //     },
  //   },
  // });
 
  return (
    <Container>
      <Row className="justify-content-md-center">
    {/* <div
           className="container"
           style={{ width: "100%",height:"83vh",marginTop:'0px'}}
       >  */}
        <div className="pdf-container" style={{ width: "85vh", height: "83vh",overflow: "auto",marginTop:'7px' }}>
          {error ? (
            <div className="error">{error}</div>
          ) : (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              {viewpdf ? (
                <Viewer fileUrl = {viewpdf} />
              ) : (
                <div>No PDF available</div>
              )}
            </Worker>
          )}
        </div>
        {/* </div> */}
 
      </Row>
    </Container>
  );
}
 

export default PDFViewer;

