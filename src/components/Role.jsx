export function Role() {
    return (
    <>
    <div className="role">
    <h4 id="heading-role">Role</h4>
    <div className="role-containter">
        <div className="role-containter adder">
            <input type="text" className="styled-input" placeholder="Role Name"/><i className="icon icon-delete-button"></i>
        </div>
        <p id="add-role" > <i class="fas fa-plus"></i> Add Role</p>
    </div>
    <div id="role-list"></div>
    </div>
    </>
    )
}