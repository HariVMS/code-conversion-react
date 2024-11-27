export function Button({ formdata }){
    return(
        <>
         <div className="footer">
            <div className="back">
                <p className="hidden" id="back-button" >{"<--"} Back</p>
            </div>
            <div className="footerbutton">
                <button className="hidden" id="cancel">Cancel</button>
                <button className="hidden" id="edit">Edit</button>
                <button id="next" onClick={formdata}>Next</button>
            </div>
        </div>
        </>
    )
}