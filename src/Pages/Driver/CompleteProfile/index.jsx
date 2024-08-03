import { DataContext } from '../../../Hooks/context';
import HeaderAdmin from '../../../Components/Header/Admin/header';
import CompletePage from './ProfileComplete';

export default function AddtionalDriver() {
    const breadcrumb = 'Addtional Profile';
    return (
        <div className="m-0 antialiased font-normal leading-[1.5] text-[1rem] bg-gray-50 text-slate-500 relative before:absolute before:z-0 before:w-full before:bg-[rgb(94,114,228)] before:min-h-[18.75rem] before:m-0">
            <main className="touch-auto ease-in-out duration-200 transition-all rounded-[.75rem] max-h-screen h-full">
                <div className="body text-[.875rem] z-[500]">
                    <div className="w-[70%] p-[1.5rem] mx-auto">
                        <div className="flex flex-col overflow-auto rounded-[1rem] shadow-[0px_3px_5px_rgba(0,0,0,0.4)]">
                            {/* <StepsInfoCompany /> */}
                            <CompletePage />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
