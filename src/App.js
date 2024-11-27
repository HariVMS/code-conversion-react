import React, { useState } from "react";
import { Stepper } from "./components/Stepper";
import { Files } from "./components/Files";
import { Button } from "./components/Button";
import { Loader } from "./components/Loader";
import { Folder } from "./components/Folder";
import { Role } from "./components/Role";

function App() {
  const [currentStep, setCurrentStep] = useState("step3");
  const [data, setData] = useState(null);
  const [filetype, setFiletype] = useState("");
  const [loading, setLoading] = useState(false);
  const [stepper, setStepper] = useState([
    {
      step: "step1",
      classname: "step in-progress",
      tick: false,
      label: "STEP 1",
      heading: "Select Source",
      status: "Inprogress",
      line: true,
    },
    {
      step: "step2",
      classname: "step pending",
      tick: false,
      label: "STEP 2",
      heading: "Model Processing",
      status: "Pending",
      line: true,
    },
    {
      step: "step3",
      classname: "step pending",
      tick: false,
      label: "STEP 3",
      heading: "Role Selection",
      status: "Pending",
      line: true,
    },
    {
      step: "step4",
      classname: "step pending",
      tick: false,
      label: "STEP 4",
      heading: "Validate JSON",
      status: "Pending",
      line: false,
    },
  ]);

  const updateStepStatus = (stepId, newStatus) => {
    // Find the index of the current step
    const stepIndex = stepper.findIndex(step => step.step === stepId);
  
    // Check if the step exists
    if (stepIndex !== -1) {
      // Create a new array of updated steps
      const updatedSteps = stepper.map((step, index) => {
        // Update the current step
        if (step.step === stepId) {
          return {
            ...step,
            status: newStatus,
            tick: true,
            classname: `step ${newStatus === "Inprogress" ? "in-progress" : newStatus === "Completed" ? "completed" : "pending"}`,
          };
        }
  
        // Update the next step to "Inprogress" if it's the step after the current one
        if (index === stepIndex + 1) {
          return {
            ...step,
            status: "Inprogress",
            classname: `step in-progress`,
          };
        }
  
        return step;
      });
  
      // Update the state with the modified steps
      setStepper(updatedSteps);
    }
  };
  
  const click = async () => {
    if (currentStep === "step1" && data && filetype === "local") {
      setLoading(true);
      try {
        const response = await fetch("http://127.0.0.1:8000/upload-folder", {
          method: "POST",
          body: data, // Send the FormData object directly
        });

        if (!response.ok) throw new Error("File upload failed");

        const result = await response.json();
        console.log(result);
        setCurrentStep("step2");
        updateStepStatus("step1", "Completed");
      } catch (error) {
        console.error("Error during file upload:", error);
      } finally {
        setLoading(false);
      }
    }
    else if (currentStep === "step1" && data && filetype === "github") {
      if (Array.isArray(data) && data.length > 0) {
        const { repoLink, token, branch } = data[0]; // Destructure the first object in the array
        console.log(repoLink);
        console.log(token);
        console.log(branch);

        try {
          const response = await fetch('http://127.0.0.1:8000/git-link', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ source_path: repoLink, token: token, branch: branch })
          });
          if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.detail || 'Unknown error occurred.');
          }
          const result = await response.json();
          console.log(result);
          setCurrentStep("step2");
          updateStepStatus("step1", "Completed");
        }
        catch (error) {
          alert(error.message );
        }
      }
    }else if (currentStep === "step2" && data ){
        console.log("data",data)
        const [language, root, routers,schemas] = data
        console.log('language',language);
        console.log("root",root);
        console.log("routers",routers);
        console.log("schemas",schemas); 
        try {
          const response = await fetch('http://127.0.0.1:8000/copy_and_process/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  language: language,
                  root_directory: root,
                  routers_name: routers,
                  schemas_name: schemas
              })
          });
          if (!response.ok) {
            const errorDetails = await response.json();
            throw new Error(errorDetails.detail || 'Unknown error occurred.');
          }
          const result = await response.json();
          console.log(result);
          setCurrentStep("step3");
          updateStepStatus("step2", "Completed");
        }catch(error){
          console.log(error);
          
        }
    }else {
      alert("Please provide the necessary data To move to next Step .");
    }
  };


  return (
    <div className="container">
      <div className="progress-container">
        {stepper.map((step) => (
          <Stepper key={step.step} {...step} />
        ))}
      </div>
      <p id="change-name">Select Source</p>
      <div className="content-container">
        {currentStep === "step1" &&<Files apiData={setData} selectedfile={setFiletype} />}
        {currentStep === "step2" && <Folder apiData={setData}/>}
        {currentStep === "step3" && <Role apiData={setData}/>}
        {loading && <Loader />}
      </div>
      <Button formdata={click} loader={setLoading} />
    </div>
  );
}

export default App;
