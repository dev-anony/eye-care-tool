import React, { useState } from 'react';
import axios from 'axios';


function Keratoconus() {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

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
        };
        reader.readAsDataURL(files[0]);
        setFile(files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:6899/predictkcn', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error uploading data:', error);
        }
    };


    const resetForm = () => {
        setName('');
        setAge('');
        setFile(null);
        setResult(null);
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

    const div4 = { 
        selectStyle:'solid',
        marginLeft: "50px", 
        marginRight: '20px', 
        width:"35%" 
    };

    return (
        <div style={containerStyle}>
            <div style={{ padding: '20px', ...contentStyle }}>
                <h1 style={{textAlign:'left'}}>Keratoconus Assessment Form</h1>
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
                            Upload File:
                            <input type="file" onChange={handleFileChange} />
                        </label>
                        <br />
                        <button type="submit" onClick={handleSubmit}>Submit</button>                    
                    </div>            
                </form>
                {result && (
                    <div style={{paddingTop: '30px'}}>
                        <hr width="100%" color="#2b3544" style={{ height: '3px'}} />
                        <h1 style={{textAlign:'left'}}>Result</h1>
                        <div style={{display: 'flex'}}>
                            <div style={div4}>
                                <p>Patient: {result.patient}</p>
                                <p>Age: {result.age}</p>                            
                                <p>Result: {result.result}</p>
                                <button 
                                    style={{marginTop:'5px', marginBottom: '50px'}} 
                                    onClick={resetForm} 
                                    type="reset">Reset
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Keratoconus;
