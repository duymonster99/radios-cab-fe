import { CategoriesItem } from '../../Pages/Client/Company/Components/elements/Category';
import { FilterRange } from '../../Pages/Client/Company/Components/elements/FilterRange';
import { Additional } from '../../Pages/Client/Company/Components/elements/Additional';

export default function SidebarCompany({ DataSidebarFilter }) {
    return (
        <div className="row">
            <DataSidebarFilter />

            <div className="w-full row-child">
            </div>

            <div className="w-full row-child">
                <div className="mb-[1rem]">
                </div>
            </div>
        </div>
    )
}