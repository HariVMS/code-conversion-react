import { useState } from "react";

export function Files({ apiData,selectedfile }) {
    const [folderName, setFolderName] = useState("");
    const [filetype, setFiletype] = useState("");
    const [gitData, setGitData] = useState([
        { repoLink: '', token: '', branch: '' }
      ]);

    const getValues = (value, index) => {
        const updatedDatas = [...gitData];  // Create a copy of the existing gitData
        // Depending on the index, update the corresponding field
        if (index === 0) {
          updatedDatas[0] = { ...updatedDatas[0], repoLink: value };
        } else if (index === 1) {
          updatedDatas[0] = { ...updatedDatas[0], token: value };
        } else if (index === 2) {
          updatedDatas[0] = { ...updatedDatas[0], branch: value };
        }
        
        setGitData(updatedDatas);  // Update the state with the new values
        // Optionally, you can call the apiData function to send the updated data elsewhere
        apiData(updatedDatas);
        selectedfile(filetype);
      };

      
    const handleFolderSelect = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
          const filesData = event.target.files;
          const folder = files[0]; // Select the first file (to get folder name)
          setFolderName(folder.webkitRelativePath.split("/")[0]); // Extract the folder name
          const formData = new FormData();
          const excludeFolder = ['.venv', 'venv', '__pycache__', '.git', '.vscode'];
    
          for (let file of filesData) {
            const relativePath = file.webkitRelativePath;
            if (!excludeFolder.some(folders => relativePath.includes(folders))) {
              formData.append('files', file, relativePath);
            }
          }
          apiData(formData);
          selectedfile(filetype);
        } else {
          // If no files are selected (after canceling), reset the folder name
          setFolderName('');
        }
      };
      return (
        <>
          <p id="topic">Select Method of Link</p>
          <div className="files">
            <label className="localr custom-radio">
              <input type="radio" name="option" onClick={() => setFiletype("local")} />
              <span className="radio-checkmark"></span>
              Local
            </label>
            {filetype === "local" && (
              <div className="space" id="local-input">
                <div className="custom-file-upload">
                  <input
                    type="text"
                    className="file-name-display"
                    placeholder={folderName || "Choose a file or folder..."}
                    readOnly
                  />
                  <div className="space1">
                    <div className="n">
                      <label htmlFor="file-upload" className="file-upload-label">
                        Browse
                      </label>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="file-upload"
                    className="file-upload-input"
                    webkitdirectory="true" // Allow folder selection
                    directory="true" // For Firefox
                    onChange={handleFolderSelect}
                  />
                </div>
              </div>
            )}
            <label className="githubr custom-radio">
              <input type="radio" name="option" onClick={() => setFiletype("github")} />
              <span className="radio-checkmark"></span>
              GitHub
            </label>
            {filetype === "github" && (
              <div className="space" id="git-input">
                <div className="custom-input">
                  <input type="text" id="url" 
                  placeholder="Enter the URL"
                  onChange={(e) => getValues(e.target.value, 0)}
                  value={gitData[0].repoLink} 
                   />
                  <input type="text" id="token"
                   placeholder="Enter the Token"
                   onChange={(e) => getValues(e.target.value, 1)}
                   value={gitData[0].token}
                    />

                  <input type="text"
                   id="branch"
                    placeholder="Enter the Branch Name" 
                    onChange={(e) => getValues(e.target.value, 2)}
                    value={gitData[0].branch} 
                    />
                </div>
              </div>
            )}
          </div>
        </>
      );
    }



