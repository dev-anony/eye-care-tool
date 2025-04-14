import React, { useState } from 'react';
import axios from 'axios';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const defaultSrc = "/img/fundus2.jpg";
const defaultSrc2 = "/img/fundus.jpg";

function DiseaseForm() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);
    const [image, setImage] = useState(defaultSrc);
    const [cropData, setCropData] = useState(defaultSrc2);
    const [cropper, setCropper] = useState();

    const handleNameChange = (e) => setName(e.target.value);
    const handleAgeChange = (e) => setAge(e.target.value);
    const handleFileChange = (e) => {
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
        setFile(files[0]);
    };

    const getCropData = () => {
        if (typeof cropper !== "undefined") {
            setCropData(cropper.getCroppedCanvas().toDataURL());
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('file1', file);
        formData.append('file2', dataURLtoFile(cropData, 'cropped.png'));

        try {
            const response = await axios.post('http://127.0.0.1:6899/predictgldr', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };

    const dataURLtoFile = (dataurl, filename) => {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };

    const resetForm = () => {
        setName('');
        setAge('');
        setFile(null);
        setResult(null);
        setImage(defaultSrc);
        setCropData(defaultSrc);
        if (cropper) {
            cropper.reset();
        }
    };

    const imageStyle = {
        width: '250px',
        height: '250px',
        margin: '26px'
    };

    const selectStyle = {
        marginTop: '5px',
        display: 'block'
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    };

    const contentStyle = {
        flex: '0',
    };

    const div1 = {
        marginLeft: "50px",
        marginRight: '20px',
        width:"35%"
    };

    const div2 = {
        borderRadius: '8px', 
        display: "flex", 
        width: '60%', 
        height: '380px', 
        marginLeft: '10px', 
        background:'rgb(54 67 95)'
    };

    const div3 = { width: '50%', 
        marginLeft: '20px', 
        marginTop:'40px', 
        marginRight:'30px' 
    };

    const outimgstyle = { width: '230px', 
        height: '230px', 
        marginTop:'30px', 
        marginLeft: '40px'
    };

    const div4 = { 
        selectStyle:'solid',
        marginLeft: "50px", 
        marginRight: '20px', 
        width:"35%" 
    };

    const div5 = {borderRadius: '4px', 
        display: "flex", 
        width: '302px', 
        height: '302px', 
        marginLeft: '10px', 
        background:'rgb(54 67 95)'
    };

    return (
        <div style={containerStyle}>
            <div style={{ padding: '20px', ...contentStyle }}>
                <h1 style={{textAlign:'left'}}>Disease Retinopathy Assessment Form</h1>
                <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'flex-start'}}>
                    <div style={div1}>
                        <label>
                            Name:
                            <input type="text" value={name} onChange={handleNameChange} />
                        </label>
                        <br />
                        <label>
                            Age:
                            <input type="text" value={age} onChange={handleAgeChange} />
                        </label>
                        <br />
                        <label>
                            Diabetic Record: 
                            <select style={selectStyle}>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </label>
                        <br />
                        <label>
                            Upload Image:
                            <input type="file" onChange={handleFileChange} />
                        </label>
                        <br />
                        <button type="submit" onClick={handleSubmit}>Submit</button>                    
                    </div>
                    {image && (
                        <div style={div2}>
                            <Cropper
                                style={{ height: "320px", width: "364px", marginTop:'30px', marginLeft: '30px'  }}
                                zoomTo={0.5}
                                initialAspectRatio={1}
                                preview=".img-preview"
                                src={image}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false}
                                onInitialized={(instance) => {
                                    setCropper(instance);
                                }}
                                guides={true}
                            />
                            <div style={div3}>
                                <button type="button" onClick={getCropData}>Crop Image</button>
                                {cropData && (
                                <div>
                                    <img style={outimgstyle} src={cropData} alt="cropped" />
                                </div>
                            )}
                            </div>
                        </div>
                    )}
                </form>
                {result && (
                    <div style={{paddingTop: '30px'}}>
                        <hr width="100%" color="#2b3544" style={{ height: '3px'}} />
                        <h1 style={{textAlign:'left'}}>Result</h1>
                        <div style={{display: 'flex'}}>
                            <div style={div4}>
                                <p>Patient: {result.patient}</p>
                                <p>Age: {result.age}</p>                            
                                <p>Glaucoma Result: {result.result1}</p>
                                <p>Diabetic Retinopathy Result: {result.result2}</p>
                                <button 
                                    style={{marginTop:'5px', marginBottom: '50px'}} 
                                    onClick={resetForm} 
                                    type="reset">Reset
                                </button>
                            </div>
                            <div style={div5}>
                                <img 
                                    style={imageStyle} 
                                    src={`data:image/png;base64,${result.image}`} 
                                    alt="Uploaded">
                                </img>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DiseaseForm;
