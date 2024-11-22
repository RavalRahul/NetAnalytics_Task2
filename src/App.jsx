import { useState, useEffect, useRef } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './App.css'

function App() {
  const [photos, setPhotos] = useState([])
  const [allPhotos, setAllPhotos] = useState([])
  const [show, setShow] = useState(false);
  const [photoTitle, setPhotoTitle] = useState("");
  const [photoId, setPhotoId] = useState("");
  const [sortState, setSortState] = useState("asc")

  const dataTable = useRef();

  const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos");
    const data = await res.json();
    const filterData = data.filter(myData => myData.id%2 === 0)
    setPhotos(filterData.slice(0,200));
    setAllPhotos(filterData.slice(0,200));
  }

  const handleClick = () => {
    dataTable.current.style.backgroundColor == "lavender" ? dataTable.current.style.backgroundColor = "beige" : dataTable.current.style.backgroundColor = "lavender"
  }

  const handleFilter = (e) => {
    e.target.value != "" ?
      setPhotos(allPhotos.filter((data => data.id == e.target.value))) : 
      setPhotos(allPhotos)
  }

  const handleSort = () => {
    if (sortState === "asc") {
      setPhotos(photos.sort((a, b) => a.id > a.id ? 1 : -1));
      setSortState("desc")
    } else {
      setPhotos(photos.sort((a, b) => a.id < a.id ? 1 : -1));
      setSortState("asc");
    }
  }

  const handleDelete = (e) => {

  if (window.confirm("Are you sure you want to delete this item?")) {
    setPhotos(photos.filter((data) => data.id != e));
  }
  }


  const handleClose = () => setShow(false);
  const handleShow = (_id) => {
    setShow(true);
    const _title = photos.filter((data) => data.id == _id)
    setPhotoTitle(_title[0].title)
    setPhotoId(_title[0].id)
  }

  const handleEditChange = (e) => {
    setPhotoTitle(e.target.value)
  }

  const handleEdit = () => {
    setPhotos((prevPhotos) =>
      prevPhotos.map((photo) =>
        photo.id == photoId ? { ...photo, title: photoTitle } : photo
      )
    );
    handleClose();
  }

  useEffect(() => {
    dataTable.current.style.backgroundColor = "lavender"; 
    getData();
  }, [])


  return (
    <div ref={dataTable} className='my-container'>
      <div className='d-flex justify-content-between p-4 mb-5'>
        <input className=' w-25 form form-control' type="text" placeholder='search' onChange={handleFilter} />
        <div className='d-flex'>
        <button className='btn btn-dark' onClick={handleClick}>Change Color</button>
        </div>
      </div>
      <table className='table table-striped table-dark w-75 m-auto'>
        <thead>
          <tr>
            <td>Id<button onClick={handleSort} className='btn btn-primary-outline'>{sortState=="asc"? "🔼" : "🔽" }</button></td>
            <td>Title</td>
            <td>Photo</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {
            photos.map((data, index) => {
              return (
                <tr key={index} >
                  <td>{data.id }</td>
                  <td>{data.title }</td>
                  <td><a href={data.url} target='_blank'><img src={data.thumbnailUrl} alt={data.title} /></a></td>
                  <td>
                    <button className='btn btn-dark m-1' onClick={() => handleDelete(data.id)}>Delete</button>
                    <button className='btn btn-dark m-1' onClick={() => handleShow(data.id)}>Edit</button>
                  </td>  
                </tr>
              )
            })
          }
        </tbody>
      </table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='form-group'>
            <label>Title</label>
            <input type="text" defaultValue={photoTitle} className='form form-control' onChange={handleEditChange} />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default App
