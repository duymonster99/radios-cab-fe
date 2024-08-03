import { CategoriesItem } from '../../Pages/Client/Company/Components/elements/Category';
import { FilterRange } from '../../Pages/Client/Company/Components/elements/FilterRange';
import { Additional } from '../../Pages/Client/Company/Components/elements/Additional';

export default function SidebarCompany() {
    return (
        <div className="row">
            {/* <div className="w-full row-child">
                <div className="mb-[1rem]">
                    <h4 className="text-[calc(1.275rem+0.3vw)] xl:text-[1.5rem]">Filter By City</h4>
                    <ul className="pl-0">
                        <CategoriesItem />
                    </ul>
                </div>
            </div> */}

            <div className="w-full row-child">
                <FilterRange />
            </div>

            <div className="w-full row-child">
                <div className="mb-[1rem]">
                    <h4 className='text-[calc(1.275rem+0.3vw)] xl:text-[1.5rem]'>Additional</h4>
                    <Additional number="1" name="Organic" />
                    <Additional number="2" name="Fresh" />
                    <Additional number="3" name="Sales" />
                    <Additional number="4" name="Discount" />
                    <Additional number="5" name="Expired" />
                </div>
            </div>
        </div>
    )
}