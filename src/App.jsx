import { useState, useEffect, useRef } from 'react'
import { Table } from 'react-bootstrap';

function App() {

  const [photos, setPhotos] = useState([]);
  const [allPhotos, setAllPhotos] = useState([]);
  const bgColor = useRef();
  const getData = async () => {
    try {
      
      const res = await fetch("https://jsonplaceholder.typicode.com/photos");
      const data = await res.json();
      setPhotos(data);
      setAllPhotos(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleBGColor = () => {
    bgColor.current.style.backgroundColor = "beige";
  }
  
  const handleFilter = (e) => {
    // console.log("working ..")
    setPhotos(allPhotos.filter(
        (data) => String(data.id).includes(e.target.value) 
      )
    )
  }

  useEffect(() => {
    getData();
  },[])

  useEffect(() => {
    
  },[photos])

  return (
    <>
      <div className='top' >

      <input type="text" onChange={handleFilter} />
      <button className='btn btn-light' onClick={handleBGColor}>Toggle</button>
      </div>
      <Table bordered>
      <thead >
        <tr ref={bgColor}>
            <th>albumId</th>
            <th>id</th>
            <th>title</th>
            <th>url</th>
            <th>thumbnailUrl</th>
        </tr>
      </thead>
        <tbody ref={bgColor}>
          
          {
            photos.map((data, index) => {
              return (
                
              <tr key={index}>
                  <td>{ data.albumId }</td>
                  <td>{ data.id }</td>
                  <td>{ data.title }</td>
                  <td>{ data.url }</td>
                  <td><img src={ data.thumbnailUrl } /></td>
              </tr>
              )
              
            })
          }
      </tbody>
    </Table>
    </>
  )
}

export default App
