// libraries
import { useContext } from 'react';
import { DataContext } from '~/Hooks/context';
import BodyTableAccount from '../../Pages/Admin/UserManage/components/BodyTable';
import BodyTableCompany from '../../Pages/Admin/CompanyManage/components/BodyTable';
// import ModalForm from '~/Components/ModalForm';

export default function TableAdminPage() {
    const { page, openForm, columns } = useContext(DataContext);

    return (
        <div className="w-full p-[2rem_.75rem] mx-auto bg-white z-[100]">
            <div className="w-[90%] p-[1rem_.75rem] mx-auto">
                <div className="overflow-x-auto overflow-y-auto">
                    {!openForm && (
                        <table className="w-full mb-[1rem] text-[rgb(116,125,136)] vertical-top text-left">
                            <thead className="vertical-bottom border-b-[1px] border-[#000] text-[#000]">
                                <tr>
                                    {columns.map((item, index) => (
                                        <th key={index} className="py-[.5rem]" scope="col">
                                            {item.header}
                                        </th>
                                    ))}

                                    {page === 'Product' && (
                                        <th className="py-[.5rem]" scope="col">
                                            Image
                                        </th>
                                    )}

                                    <th className="py-[.5rem]" scope="col">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Admin Table */}
                                {page === 'CompanyAdmin' && <BodyTableCompany />}
                                {page === 'Account' && <BodyTableAccount />}
                                
                                {/* {page === 'Category' && <BodyTableCompany />} */}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
