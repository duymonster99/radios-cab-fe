import { PoweroffOutlined } from "@ant-design/icons";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../../Hooks/context";
import { useMutationHook } from "../../../Hooks/useMutation";
import { putAdminService } from "../../../Services/apiService";

export default function AppDriver() {
    const [isOnline, setIsOnline] = useState(false)
    const { driver } = useContext(DataContext)   

    // ? ======================== HANDLE ONLINE ====================
    const mutation = useMutationHook((props) => putAdminService(props))
    const { isSuccess } = mutation

    const handleOnline = () => {
        const checkOnline = {
            isOnline: !isOnline
        }

        mutation.mutate({ url: `Admin/UpdateDriver/${driver.id}`, data: checkOnline })
    }

    useEffect(() => {
        if (isSuccess) {
            setIsOnline(!isOnline)
        }
    }, [isSuccess])

    console.log(mutation);
  
    return(
        <div className="w-[70%] p-[1.5rem] mx-auto">
            <div className="flex flex-col overflow-hidden rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                <div className="w-full mx-auto bg-white z-[100]">
                    <div className="w-full relative h-[590px]">
                        <div className="w-full h-full">
                            <img className="w-full h-full object-cover" src="https://cdn.tgdd.vn/Files/2020/06/18/1263925/giaodien_600x657.jpg" alt="maps viet nam" />
                        </div>
                        <div className="absolute bottom-5 left-[50%] translate-x-[-50%] z-[200] w-[70%]">
                            <button 
                                className={`${isOnline ? 'bg-blue-400' : 'bg-black'} text-white rounded-[80rem] p-[.75rem_1rem] font-bold text-xl mx-auto flex items-center justify-center`}
                                onClick={handleOnline}
                            >
                                <PoweroffOutlined className={`${!isOnline && 'mr-[10px]'} transition-all duration-100`} />
                                {isOnline === false && 'Open to receive flights'}
                            </button>

                            <div className="flex items-center mt-3 bg-white w-full rounded-[1rem] p-[1rem_1.5rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                                <span className={`w-[6px] h-[6px] rounded-full mr-[1.5rem] ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <p className="text-lg text-black font-bold">{isOnline ? 'Ready to receive the trip' : 'Is Offline'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}