/*eslint-disable*/
import React,{useEffect, useState} from 'react'
import  { useFormik} from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {API_URL} from '../main'; 
import { useNavigate,useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditBlog() {
  let params = useParams()
  let [count,setCount] = useState(0)
  let [oldTitle,setTitle] = useState("")
  let [oldAuthor,setAuthor] = useState("")
  let [oldImageUrl,setImageUrl] = useState("")
  let [oldDescription,setDescription] = useState("")
 
  const totalcount = 400;
  let navigate = useNavigate()
  let editBlog = async (data)=>{
    try {
      let res = await axios.put(`${API_URL}/${params.id}`,data)
      if(res.status===200)
      {
        toast.success('Blog Saved Successfully')
        navigate('/manage')
      }
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  const formik = useFormik({
    initialValues:{
      title:oldTitle,
      imageUrl:oldImageUrl,
      description:oldDescription
    },
    enableReinitialize:true,
    validationSchema:Yup.object({
      title:Yup.string().min(2,'Too short').max(24,'Too Long').required('Required'),
     
      imageUrl:Yup.string().required('Required').matches(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g,'must be url'),
  
      description:Yup.string().min(100,'min 100 Characters Expected').max(totalcount,'Too Long').required('Required'),
    }),
       onSubmit:values => {
         values.active_flag = false
         editBlog(values)
         
       }

  })

  const getBlogById = async(id)=>{
    try {
      
      let res = await axios.get(`${API_URL}/${id}`)
      if(res.status===200)
      {
        setTitle(res.data.title)
        setAuthor(res.data.author)
        setImageUrl(res.data.imageUrl)
        setDescription(res.data.description)
       
      }
    
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }
  
  useEffect(()=>{
    if(params.id)
    {
      getBlogById(params.id)
    }
  },[])
  return <div className='main-content'>
   <div>
<Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Book Name</Form.Label>
        <Form.Control 
        type="text" 
        id='title' 
        name='title' 
        placeholder="Enter Title" 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.title}
        />
        {formik.touched.title && formik.errors.title ? (
         <div className='error'>{formik.errors.title}</div>
       ) : null}
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Author Name</Form.Label>
        <Form.Control 
        type="text" 
        id='author' 
        name='author' 
        placeholder="Enter Author Name" 
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.author}
        />
        {formik.touched.author && formik.errors.author ? (
         <div className='error'>{formik.errors.author}</div>
       ) : null}
      </Form.Group>

      <Form.Group className="mb-3" >
        <Form.Label>Book Image URL</Form.Label>
        <Form.Control 
        type="text" 
        id='imageUrl'
         name='imageUrl' 
         placeholder="Image URL"
         onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.imageUrl}
         />
         {formik.touched.imageUrl && formik.errors.imageUrl ? (
         <div className='error'>{formik.errors.imageUrl}</div>
       ) : null}
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Description</Form.Label>
        <Form.Control 
        as="textarea"
        rows={4} 
        id='description' 
        name='description' 
        placeholder="Description"
        onChange={formik.handleChange}
        onKeyUp={(e)=>setCount(e.target.value.length)}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        />
         <Form.Text>{count} of {totalcount} characters allowed</Form.Text>
        {formik.touched.description && formik.errors.description ? (
         <div className='error'>{formik.errors.description}</div>
       ) : null}
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

</div>
  </div>
}
export default EditBlog