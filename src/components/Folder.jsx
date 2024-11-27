import { useState } from "react";
 
export function Folder({ apiData }) {
  const [language, setLanguage] = useState(false);
  const [slanguage, setSlanguage] = useState('');
  const [datas, setDatas] = useState([]);
 
  const gatValues = (value, index) => {
    // Create a new copy of the datas array
    const updatedDatas = [...datas];
 
    // Update the specific index with the new value
    updatedDatas[index] = value;
 
    // Update the state with the new data array
    setDatas(updatedDatas);
 
    // Log the updated data to the console
    console.log("Updated data:", updatedDatas);
 
    // Send the updated data to the parent component
    apiData(updatedDatas);
  };
 
  return (
    <>
      <div className="folders">
        <div className="input-lable">
          <label htmlFor="language">Language</label>
          {slanguage && <label htmlFor="root">Root Directory</label>}
          {(slanguage === "Python" || slanguage === "Next.js" || slanguage === "Node.js" || slanguage === "ROR") && <label htmlFor="routers">Routers</label>}
          {(slanguage === "Python" || slanguage === "Next.js" || slanguage === "Node.js") && <label htmlFor="schemas">Schemas</label>}
          {(slanguage === "Next.js" || slanguage === "Node.js" || slanguage === "ROR") && <label htmlFor="controller">Controller</label>}
          {slanguage === "Next.js" && <label htmlFor="dtos">DTOs</label>}
        </div>
 
        <div className="inputboxs">
          <input
            onClick={() => setLanguage(true)}
            type="text"
            id="language"
            value={slanguage || "Select Language"}
            placeholder="Select Language"
            readOnly
            className="custom-input-field"
          />
          {language && (
            <div id="language-dropdown">
              <ul id="dropdown">
                <li onClick={() => { setSlanguage('Python'); setLanguage(false); gatValues("Python", 0); }}>Python</li>
                <li onClick={() => { setSlanguage('Node.js'); setLanguage(false); gatValues("Node.js", 0); }}>Node.js</li>
                <li onClick={() => { setSlanguage('Next.js'); setLanguage(false); gatValues("Next.js", 0); }}>Next.js</li>
                <li onClick={() => { setSlanguage('ROR'); setLanguage(false); gatValues("ROR", 0); }}>ROR</li>
              </ul>
            </div>
          )}
 
          {slanguage && (
            <input
              type="text"
              name="root"
              id="root"
              placeholder="Enter the Root File Name"
              className="custom-input-field"
              onChange={(e) => { gatValues(e.target.value, 1); }}
            />
          )}
 
          {(slanguage === "Python" || slanguage === "Node.js" || slanguage === "Next.js") && (
            <input
              type="text"
              name="routers"
              id="routers"
              placeholder="Enter the Routers File Name"
              className="custom-input-field"
              onChange={(e) => { gatValues(e.target.value, 2); }}
            />
          )}
 
          {(slanguage === "Python" || slanguage === "Node.js" || slanguage === "Next.js") && (
            <input
              type="text"
              name="schemas"
              id="schemas"
              placeholder="Enter the Schemas File Name"
              className="custom-input-field"
              onChange={(e) => { gatValues(e.target.value, 3); }}
            />
          )}
 
          {(slanguage === "Next.js" || slanguage === "Node.js" || slanguage === "ROR") && (
            <input
              type="text"
              name="controller"
              id="controller"
              placeholder="Enter the Controller File Name"
              className="custom-input-field"
              onChange={(e) => { gatValues(e.target.value, 4); }}
            />
          )}
 
          {slanguage === "Next.js" && (
            <input
              type="text"
              name="dtos"
              id="dtos"
              placeholder="Enter the DTOs File Name"
              className="custom-input-field"
              onChange={(e) => { gatValues(e.target.value, 5); }}
            />
          )}
        </div>
      </div>
    </>
  );
}