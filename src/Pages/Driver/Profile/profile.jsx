// libraries
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";

// components

// services
import { getDriverService } from "../../../Services/apiService";
import { DataContext } from "../../../Hooks/context";
import { jwtDecode } from "jwt-decode";

export default function ProfileDriverApp() {
    const [driver, setDriver] = useState({})
    const [shouldFetchApi, setShouldFetchApi] = useState(true)
    const [openFormEdit, setOpenFormEdit] = useState(false)
    // const { driver } = useContext(DataContext)

    // ? ====================================== handle get one company ==================================
    // get id from token
    const tokenStorage = localStorage.getItem("tokenDriver")
    const {unique_name} = jwtDecode(tokenStorage)

    const getDriver = () => getDriverService(`Admin/getDriverById/${unique_name}`);
    const { data, isSuccess } = useQuery({
        queryKey: ['getDriver'],
        queryFn: getDriver,
        enabled: shouldFetchApi,
    });

    useEffect(() => {
        if (isSuccess) {
            setDriver(data);
            setShouldFetchApi(false);
        }
    }, [data, isSuccess]);

    const addressDetails = `${driver.driverInfo.address}, ${driver.driverInfo.ward}, ${driver.driverInfo.street}, ${driver.driverInfo.city}`

    return (
        <div className="bg-gray-100 w-full">
            <div className="container mx-auto py-8">
                <div className="flex gap-6 px-4 ">
                    <div className="w-full z-[50]">
                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex flex-col items-center">
                                <img
                                    src="https://randomuser.me/api/portraits/men/94.jpg"
                                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                                    alt=""
                                ></img>
                                <h1 className="text-xl font-bold">{driver?.driverFullName}</h1>
                                <p className="text-gray-700">{driver?.driverMobile}</p>
                                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                                    <button 
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                        onClick={() => setOpenFormEdit(true)}
                                    >
                                        Update
                                    </button>
                                    <Link href="#" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded">
                                        Delete
                                    </Link>
                                </div>
                            </div>

                            <hr className="my-6 border-t border-gray-300" />

                            <div className="flex flex-col">
                                <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">Profile driver</span>
                                <ul>
                                    <li className="mb-2">Email: {driver?.driverEmail}</li>
                                    <li className="mb-2">Address: {driver !== undefined && driver !== null && (
                                        <span>{addressDetails}</span>
                                    )}</li>
                                    <li className="mb-2">License: {driver?.driverInfo?.driverLicense}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <FormEditProfile openFormEdit={openFormEdit} setOpenFormEdit={setOpenFormEdit} company={company} /> */}
        </div>
    );
}
