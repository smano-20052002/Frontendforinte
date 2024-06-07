import React from 'react'
import { CloseButton, Form, Button, Col, Row, Container, Modal } from 'react-bootstrap'
import { Alert } from "@mui/material";
import { Card } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { useCallback } from 'react';
import { useDropzone } from "react-dropzone";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MdOutlineDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { deleteContentRequest } from '../../../action/Course/Material/DeleteContentAction'
import { useSelector } from 'react-redux';
import { IoEyeOutline } from "react-icons/io5";
import { fetchMaterialTypeRequest } from '../../../action/Course/Material/FetchMaterialTypeAction';
import { fetchContentRequest } from '../../../action/Course/Material/FetchContentAction';
import { createContentRequest } from '../../../action/Course/Material/AddContentAction';
import { validateContentForm } from "../../../utils/Course/Material/AddContentValidation";
import { fetchIndividualContentRequest } from '../../../action/Course/Material/FetchIndividualContentByIdAction'
// import { fetchContentUrlRequest } from '../../action/Course/FetchContentUrlAction';
import { updateContentRequest } from '../../../action/Course/Material/UpdateContentAction';
import PDFViewer from './PDFViewer';
// import Video from './Video';
import AudioViewer from './AudioViewer';
import VideoViewer from './VideoViewer';
function AddContentComponent() {
  // const { topicId,materialTypeId } = props
  sessionStorage.setItem("userName", "Mano");
  const { MaterialTypeId } = { "MaterialTypeId": "02950b1f-6bf6-4463-896e-e5319da2fd6f" }
  const EditContent = useSelector((state) => state.fetchIndividualContent);
  const [addupdatebtn, setaddupdatebtn] = useState("Add")
  const [materialType, setMaterialType] = useState(MaterialTypeId);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = React.useState(false);
  const { id } = useParams();
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);
  const [isDisableType, setIsDisableType] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState();
  const [viewerModelHeader, setViewerModelHeader] = useState();

  const [material, setMaterial] = useState({
    topicId: id,
    materialTypeId: materialType,
    name: "",
    material: null,
    createdBy: sessionStorage.getItem("userName"),
    duration: "04:29:41"


  });
  const materialTypeMap = {};

  const [selectedContent, setselectedContent] = useState(null);
  const dispatch = useDispatch();
  const selectorMaterialType = useSelector((state) => state.fetchMaterialType.materialtype);
  const selectorContent = useSelector((state) => state.fetchContent.content)
  console.log("material", selectorContent);
  const [openDelete, setOpenDelete] = React.useState(false);

  useEffect(() => {
    dispatch(fetchMaterialTypeRequest());
    // console.log(TopicId)
    // console.log(MaterialTypeId)
    console.log("ddd", material)

  }, []);
  useEffect(() => {
    fetchContentByType(id, materialType)
    setMaterial({ ...material, materialTypeId: materialType })
  }, [materialType])
  // useEffect=(()=>{
  //   console.log("topic"+topicId);
  //   console.log("materialType"+materialType);
  // });
  // useEffect(() => {
  // dispatch(fetchMaterialTypeRequest());
  // });
  const fetchContentByType = async (id, materialTypeId) => {
    console.log("tid" + id);
    console.log("mtid" + materialTypeId);
    const formData = {
      "topicId": id,
      "materialTypeId": materialTypeId
    }
    console.log(formData);
    await dispatch(fetchContentRequest(formData));
  }
  const isExist = useSelector((state) => state.addContent.isExisted);
  const [existMsg, setExistMsg] = useState('');
  useEffect(() => {
    if (isExist) {
      setExistMsg('Material already exists');
      const timer = setTimeout(() => {
        setExistMsg('');
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isExist])

  const addContentSuccessState = useSelector((state) => state.addContent.isSubmitted);

  // -----------Model opening for pdf viewer model opening function---------//

  const handleClose = () => { setShow(false); setViewerModelHeader("") };
  const handleShow = () => setShow(true);
  // -----------Model opening for pdf viewer model opening function end---------//


  const [successMsg, setSuccessMsg] = useState('')
  useEffect(() => {
    if (addContentSuccessState) {

      setSuccessMsg('Material added successfully');

      const timer = setTimeout(() => {
        setSuccessMsg('');
      }, 7000);

      // Clear the timeout if the component unmounts
      return () => clearTimeout(timer);



    }
  }, [addContentSuccessState])

  const handleDeleteClickOpen = (materialId) => {
    console.log("dia", materialId);
    setDeleteId(materialId)
    setOpenDelete(true);
  };
  const handleDeleteClose = () => {
    setOpenDelete(false);
    setDeleteId("");
    fetchContentByType(id, materialType)


  };
  const handleDelete = (materialId) => {
    console.log("delete material", materialId);
    dispatch(deleteContentRequest(materialId));
    handleDeleteClose();


  }

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setselectedContent(fileUrl);
    handleMaterial({ target: { files: [file] } });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const {name,description,isactive}=e.target;
    setMaterial((material) => ({ ...material, [name]: value }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "*/*",

  });
  const fetchIndividualContentById = async (materialid) => {
    await dispatch(fetchIndividualContentRequest(materialid));
  }
  const handleEditButton = (materialId) => {
    // console.log(materialId);
    // fetchIndividualContentById(materialId)
    dispatch(fetchIndividualContentRequest(materialId));

    console.log("123456789", EditContent);
    if (EditContent.isFetched) {
      setaddupdatebtn("Update")
      console.log("editcontent", EditContent)
      const updatedmaterial = {
        materialId: EditContent.content.materialId,
        name: EditContent.content.name,
        material: EditContent.content.filePath,
        modifiedBy: sessionStorage.getItem("userName"),
      }
      setMaterial(updatedmaterial)
      setIsDisableType(true)
      handleEditMaterial(updatedmaterial.material)
    }




  }

  const handleMaterial = (event) => {
    if (event.target.files && event.target.files[0]) {
      setMaterial((material) => ({
        ...material,
        material: event.target.files[0],
      }));
      const file = event.target.files[0];
      console.log("po", file)
      setselectedContent(file.name);
      console.log("filename", selectedContent);
    }
  };
  const handleEditMaterial = (file) => {
    setselectedContent(file.name);
    console.log(file);
  }

  const handleMaterialType = (event) => {
    setMaterialType(event.target.value);
    console.log("eventdisplay", event.target.innerText);
  }

  const removecontent = () => {
    setselectedContent(null);
  }


  const handleSubmit = async (event) => {
    console.log("po", material);

    event.preventDefault();
    setaddupdatebtn("Add")
    selectorMaterialType.forEach((item) => {
      materialTypeMap[item.materialTypeId] = item.type;
    });
    console.log(materialTypeMap);
    const selectedLabel = materialTypeMap[materialType];
    console.log(selectedLabel);
    const isFormValid = validateContentForm(material, setErrors, selectedLabel);

    if (isFormValid) {
      try {
        if (material.materialId == undefined || material.materialId == "") {
          console.log("materialadd",material);
          await dispatch(createContentRequest(material));

        } else {
          await dispatch(updateContentRequest(material));
          setIsDisableType(false)


        }
        await fetchContentByType(id, materialType)
        setMaterial({
          topicId: id,
          materialTypeId: materialType,
          name: "",
          material: null,
          createdBy: sessionStorage.getItem("userName"),
          duration:  "04:29:41"


        })
        removecontent()
      } catch (error) {
        console.error('Error creating course:', error);
      }
    }
    console.log("material", material);

    // console.log("createcontentrequest",dispatch(createContentRequest(material)));

  }
  const divStyle = {
    boxShadow: '0px 4px 8px #23275c', // Replace #yourShadowColor with your color
  };

  const handlePreview = (materialId, materialType, materialName) => {
    setViewerModelHeader(materialName);
    switch (materialType) {
      case 'PDF':
        setSelectedComponent(<PDFViewer material={materialId} />);
        break;
      case 'VIDEO':
        // setSelectedComponent(<VideoViewer material={materialId}/>)
        setSelectedComponent(<VideoViewer material={materialId} />)
        break;
      case 'AUDIO':
        setSelectedComponent(<AudioViewer material={materialId} />)
        break;
      case 'PPT':
        setSelectedComponent(<PDFViewer material={materialId} />);
        break;
      case 'TEXT':
        setSelectedComponent(<PDFViewer material={materialId} />);
        break;
      default:
        setSelectedComponent(<></>)

    }

    handleShow();
  }

  return (
    <>
      {/* <section className='w-25' >
        

      </section> */}
      <Container style={divStyle}>
        <Row>
          <Col></Col>
          <Col>
            {!open && successMsg && (
              <Alert severity="success" className="mt-3">
                {successMsg}
              </Alert>)}
            {!open && existMsg && (
              <Alert severity="warning" className="mt-3">
                {existMsg}
              </Alert>
            )}

          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col md={3}></Col>
          <Col md={6}>
            {/* fetch material type */}
            <section className='pt-5' >
              <Form onSubmit={handleSubmit}>
                <Form.Label>Material Type</Form.Label>

                <Form.Select aria-label="Default select example" disabled={isDisableType} value={materialType} onChange={(e) => handleMaterialType(e)}>
                  <option>Select Material Type</option>

                  {selectorMaterialType.map((materialType) => (

                    <option value={materialType.materialTypeId}>{materialType.type}</option>

                  ))}
                  {/* content form */}
                </Form.Select>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Content Name</Form.Label>
                  <Form.Control type="text" placeholder="Content Name"
                    name="name"

                    value={material.name}
                    onChange={handleInputChange} />
                </Form.Group>
                {errors.name && <p className="error">{errors.name}</p>}

                <Form.Group>
                  <Form.Label>Content Upload</Form.Label>

                  <Card {...getRootProps()} className="dropzone">
                    <Card.Body className="text-center">
                      <input {...getInputProps()} type='file' />
                      {selectedContent ? (
                        <p>{isDragActive ? " Drag & Drop the Material here ..." : "click to select Material"}</p>

                      ) : (
                        <p>{isDragActive ? " Drag & Drop the Material here ..." : "click to select Material"}</p>
                      )}

                    </Card.Body>
                    {selectedContent == null ? (
                      <></>

                    ) : (
                      <Card.Footer>
                        {selectedContent}
                        <CloseButton className='position-absolute right-0 end-0' style={{ color: 'red' }} onClick={removecontent} aria-label="remove file" />

                      </Card.Footer>
                    )}

                  </Card>
                  <div className='bg-light mt-1'>
                    { }
                  </div>
                  {/* {errors.thumbnailimage && <p className="error">{errors.thumbnailimage}</p>} */}
                </Form.Group>
                {errors.material && <p className="error">{errors.material}</p>}

                <Button className="mt-3" style={{ paddingLeft: '25px', paddingRight: '25px' }} type="submit">{addupdatebtn} Material</Button>
              </Form>

            </section>
            {/* fetch content */}
            <section className='pt-5'>

              <ListGroup className='overflow-auto'>
                {selectorContent == undefined ? <>Loading...</> : selectorContent.map((content) => (
                  <>
                    <ListGroup.Item>
                      <div>
                        <div class="row">
                          <div class="col">

                          </div>
                          <div class="col-8">
                            <h4>{content.name}</h4>
                            <h6>{content.topicName}</h6>
                          </div>
                          <div class="col">
                            <button className='ms-1 ' onClick={() => handlePreview(content.materialId, content.materialType, content.name)}   ><IoEyeOutline fontSize={20} /></button>
                            <button className='ms-1 ' onClick={() => handleEditButton(content.materialId)}   ><FaRegEdit fontSize={20} /></button>
                            <button className='ms-1 ' onClick={() => handleDeleteClickOpen(content.materialId)}  ><MdOutlineDelete fontSize={20} /></button>
                          </div>
                        </div>
                      </div>

                    </ListGroup.Item>

                  </>
                ))}
              </ListGroup>
            </section>

          </Col>

        </Row>
      </Container>
      {/*-----------PDF viewer Model -------------------- */}

      <Modal show={show} onHide={handleClose} centered size="lg" >
        <Modal.Header closeButton>
          <Modal.Title>{viewerModelHeader}</Modal.Title>

        </Modal.Header>
        <Modal.Body style={{ minHeight: "83vh" }}  >
          {selectedComponent}
        </Modal.Body>
      </Modal>

      {/* -------------------------------------Delete Confirmation Box ------------------------------------------ */}
      <Dialog
        // fullScreen={fullScreen}
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Confirm Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the content ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeleteClose}>
            Cancel
          </Button>
          <Button autoFocus onClick={() => handleDelete(deleteId)}>
            Delete
          </Button>
          {/* <Button autoFocus onClick={handleDeleteClose}>
                        Cancel
                    </Button> */}

        </DialogActions>
      </Dialog>


    </>
  )
}

export default AddContentComponent;

