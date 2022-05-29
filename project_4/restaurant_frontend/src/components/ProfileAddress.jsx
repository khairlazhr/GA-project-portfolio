import { useEffect, useState } from "react"
import axiosToken from "../utils/axios"
import { useParams, useNavigate, Link } from "react-router-dom"

function ProfileAddress() {
    const navigate = useNavigate()
    const [userAddresses, setUserAddresses] = useState("")
    const { id } = useParams()

    function editAddress(addressId, addressDetails) {
        navigate(`/profile/${id}/addresses/${addressId}/edit`,  { state: {...addressDetails}} )
    }

    useEffect(() => {
        async function fetchAddresses() {
            try {
                const response = await axiosToken({
                    url: `/api/accounts/profile/${id}/addresses`,
                    method: "GET"
                })
                if (response.status === 200) {
                    setUserAddresses(response.data)
                }
            } catch(error) {
                if (error.request){
    
                }
            }
        }
        fetchAddresses()
    }, [id])

    return (
        <div className="profile-container">
            <div className="profile-container__title">
                <h2>Your Addresses</h2>
                <Link to={`/profile/${id}/addresses/add`}><button type="button" className="button">Add Address</button></Link>
            </div>
            {userAddresses
            && userAddresses.map((address, i) => (
                <div key={i}>
                    <div>
                        <p className="">Address: {address.address}</p >
                        <p className="">Unit No: {address.unit_no}</p >
                        <p className="">Postal Code: {address.postal_code}</p >
                    </div>
                    <div>
                        <button type="button" onClick={() => editAddress(address.id, address)}>Edit</button>
                        {userAddresses.length >1 && <button type="button">Delete</button>}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProfileAddress