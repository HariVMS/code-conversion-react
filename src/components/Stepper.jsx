

export function Stepper({step,classname,tick,label,heading,status,line}){
    return (
        <>
        
            <div id={step} className={classname}>
                <div className="circle">
                    <div className={tick ? " ":"inner-circle"}>{tick ? "✔":""}</div>
                    <div className={line ? "line":" "}></div>
                </div>
                <div className="step-label">{label}</div>
                <div className="step-heading">{heading}</div>
                <div className="step-status">{status}</div>
            </div>
        </>
    );
}