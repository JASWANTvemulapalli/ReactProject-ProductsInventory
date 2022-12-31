import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function UserInfo() {
    const user_details = useSelector((state) => state.user);

    return (
        <div className="card">
            <h1>User Details</h1>
            <div className="line">
                <h3> USER ID</h3>
                <div className="userdetails">{user_details.Email_Id}</div>
            </div>
            <div className="line">
                <h3> FIRST NAME</h3><div className="userdetails">{user_details.First_Name}</div>
            </div>
            <div className="line">
                <h3> LAST NAME</h3><div className="userdetails">{user_details.Last_Name}
                </div></div>

            <div className="line">
                <h3> ADDRESS</h3><div className="userdetails">{user_details.Location}</div>
            </div>
            <div className="line">
                <h3> PHONE NUMBER</h3><div className="userdetails">{user_details.MobileNumber}</div>
            </div>



        </div>

    )

}
export default UserInfo;