import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import { useNavigate } from 'react-router';
import Swal from "sweetalert2";
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Spin, Upload } from 'antd';
// import { DatePicker } from '@mui/lab';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const { Dragger } = Upload;
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
const DonateForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [medicineName, setMedicineName] = useState('');
  const [medicineQty, setMedicineQty] = useState('');
  const [medicineImg, setMedicineImg] = useState(null);
  const [medicineExp, setMedicineExp] = useState('');
  const navigate = useNavigate()
  const handleFormSubmit = () => {
    console.log("fileListd>>>", fileList)
    // Create the data object
    // const uploadedImage = fileList.find(file => file.status === 'done');
    const data = {
      name,
      email,
      address,
      medicineName,
      medicineQty,
      medicineImg:
        fileList[0].thumbUrl,
      //  uploadedImage ? uploadedImage.url : '',
      //  medicineImg ? medicineImg.name : '',
      medicineExp,
    };

    // Do something with the data, like sending it to an API
    console.log(data);
    try {
      const response = fetch('http://localhost:4000/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response) {
        console.log('Data successfully sent to the API.');
        Swal.fire({
          title: "Successul",
          text: "Wait for Admin Approval",
          icon: "success",
          confirmButtonColor: "#0875b8",
        });
        navigate('/')
        // Reset the form fields or perform any other actions you need
      } else {
        console.log('Failed to send data to the API.');
      }
    } catch (error) {
      console.error('An error occurred while sending data:', error);
    }




  };


  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const handleCancel = () => setPreviewOpen(false);
  // const handleFileChange = ({ fileList }) => {
  //   setFileList(fileList);
  // };

  // const handleFileChange = async ({ fileList }) => {
  //   setFileList(fileList);
  // setMedicineImg(fileList)
  //   // Check if there's an uploaded image
  //   const uploadedImage = fileList.find(file => file.status === 'done');
  //   if (uploadedImage) {
  //     try {
  //       const base64Data = await getBase64(uploadedImage.originFileObj);
  //       setMedicineImg(base64Data); // Set the base64 encoded image data
  //     } catch (error) {
  //       console.error('Error while converting image to base64:', error);
  //     }
  //   } else {
  //     setMedicineImg(null); // No image uploaded
  //   }
  // };

  // const handleFileChange = async (newFileList) => {
  //   setFileList(newFileList);

  //   // Check if there's an uploaded image
  //   const uploadedImage = newFileList.find(file => file.status === 'done');
  //   if (uploadedImage) {
  //     try {
  //       const base64Data = await getBase64(uploadedImage.originFileObj);
  //       setMedicineImg(base64Data); // Set the base64 encoded image data
  //     } catch (error) {
  //       console.error('Error while converting image to base64:', error);
  //     }
  //   } else {
  //     setMedicineImg(null); // No image uploaded
  //   }
  // };
  const handleFileChange = async ({ fileList }) => {
    setFileList(fileList);

    // Check if there's an uploaded image
    const uploadedImage = fileList.find(file => file.status === 'done');
    if (uploadedImage) {
      try {
        const base64Data = await getBase64(uploadedImage.originFileObj);
        setMedicineImg(base64Data); // Set the base64 encoded image data
      } catch (error) {
        console.error('Error while converting image to base64:', error);
      }
    } else {
      setMedicineImg(null); // No image uploaded
    }
  };

  const handleChangeF = (e) => {
    console.log('insideFileChange>>>>', e?.file.status)
    if (e.file.status != "removed") {
      setFileList({ fileLists: e?.fileList })
      setMedicineImg()
    }
  };
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  // const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  // const handleChange = ({ fileList: newFileList }) => {
  //   setFileList(newFileList);

  //   // Check if there's an uploaded image
  //   const uploadedImage = newFileList.find(file => file.status === 'done');
  //   if (uploadedImage) {
  //     console.log('uploadedimage',getBase64(uploadedImage.originFileObj))
  //     let setBase64 = getBase64(uploadedImage.originFileObj)
  //     setMedicineImg(setBase64); // Set the image file object
  //   } else {
  //     setMedicineImg(null); // No image uploaded
  //   }
  // };
  // const handleChange = async ({ fileList: newFileList }) => {
  //   setFileList(newFileList);

  //   // Check if there's an uploaded image
  //   const uploadedImage = newFileList.find(file => file.status === 'done');
  //   if (uploadedImage) {
  //     try {
  //       const base64Data = await getBase64(uploadedImage.originFileObj);
  //       console.log("base64Data",base64Data)
  //       // setMedicineImg(base64Data); // Set the base64 encoded image data
  //     } catch (error) {
  //       console.error('Error while converting image to base64:', error);
  //     }
  //   } else {
  //     setMedicineImg(null); // No image uploaded
  //   }
  // };
  // const handleChange = async ({ fileList: newFileList }) => {
  //   setFileList(newFileList);

  // Check if there's an uploaded image
  //   const uploadedImage = newFileList.find(file => file.status === 'done');
  //   if (uploadedImage) {
  //     try {
  //       const base64Data = await getBase64(uploadedImage.originFileObj);
  //       setMedicineImg(base64Data); // Set the base64 encoded image data
  //     } catch (error) {
  //       console.error('Error while converting image to base64:', error);
  //     }
  //   } else {
  //     setMedicineImg(null); // No image uploaded
  //   }
  // };


  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <Grid container justify='center' alignItems='center' direction='column' style={{ minHeight: '100vh' }} spacing={2} mt={8}>
      <Grid item>
        <Typography variant='h4' color='primary' style={{ textAlign: 'center' }}>
          <BloodtypeIcon style={{ fontSize: '3.2rem' }} /> Donate Your Medicines
        </Typography>
      </Grid>
      <Grid item>
        <Grid container direction='column' alignItems='center' justify='center'>
          <TextField
            label="Name"
            fullWidth
            variant="outlined"
            size='small'
            style={{ marginBottom: "1em" }}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            size='small'
            style={{ marginBottom: "1em" }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

<TextField
            label="Address"
            fullWidth
            variant="outlined"
            size='small'
            style={{ marginBottom: "1em" }}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            label="Medicine Name"
            fullWidth
            variant="outlined"
            size='small'
            style={{ marginBottom: "1em" }}
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
          />

          {/* <TextField
        label="Medicine Quantity"
        fullWidth
        variant="outlined"
        size='small'
        style={{ marginBottom: "1em" }}
        value={medicineQty}
        onChange={(e) => setMedicineQty(e.target.value)}
      /> */}


          <div style={{ marginBottom: "1em" }}>
            <label htmlFor="medicineQty">Medicine Quantity</label>
            <input
              type="number"
              id="medicineQty"
              value={medicineQty}
              onChange={(e) => setMedicineQty(e.target.value)}
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
          </div>


          {/* <input
        style={{ marginLeft: '80px', marginBottom: "10px" }}
        type='file'
        onChange={(e) => setMedicineImg(e.target.files[0])}
      /> */}
          {/* <Upload
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal> */}


          <Dragger
            // fileList={this.state.fileLists}
            onPreview={handlePreview}
            onRemove={(e) => {

              const notRemovedImages = fileList.filter(imageItem => imageItem.name != e.name)

              setFileList({ fileList: notRemovedImages });

            }}
            multiple listType="picture-card"
            showUploadList={{ showRemoveIcon: true }}
            accept=".png,.jpeg"
            beforeUpload={(file) => {
              return false
            }}

            // onPreview={this.handlePreview}
            // onChange={this.handleChangeF}
            onChange={handleFileChange}
            // onChange={setMedicineImg(e.target.files[0])}

            iconRender={() => {
              return <Spin></Spin>
            }}
          >
            <br />
            <Button variant="contained">Upload</Button>
          </Dragger>

          <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
            <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={previewImage}
            />
          </Modal>
          {/* <TextField
        label="Medicine Expiry"
        fullWidth
        variant="outlined"
        size='small'
        style={{ marginBottom: "1em" }}
        value={medicineExp}
        onChange={(e) => setMedicineExp(e.target.value)}
      /> */}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer style={{width:'100px'}} components={['DatePicker', 'DatePicker']}>
              <DatePicker
                label="Medicine Expiry"
                value={medicineExp}
                onChange={(newValue) => setMedicineExp(newValue)}
                renderInput={(params) => <TextField {...params}  />}
              />
            </DemoContainer>
          </LocalizationProvider>

          <Button
            variant="contained"
            sx={{ width: '29ch' ,mt:2,mb:4}}
            endIcon={<PlayArrowIcon />}
            onClick={handleFormSubmit}
          >
            Donate
          </Button>
        </Grid>






      </Grid>
    </Grid>
  );
}

export default DonateForm;
