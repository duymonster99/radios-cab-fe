import { useState } from "react";
import { Link } from "react-router-dom";

const categories = [
    { id: 1, name: 'All Drivers' },
    { id: 2, name: 'TPHCM' },
    { id: 3, name: 'Ha Noi' },
    { id: 4, name: 'Vung Tau' },
    { id: 5, name: 'Da Nang' },
];

const productShop = [
    {
        id: 1,
        name: 'JEMMY WATSON',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: 4.99,
        img: 'https://via.placeholder.com/800x1000',
        categoryId: 2,
    },
    {
        id: 2,
        name: 'Raspberries',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: 4.99,
        img: 'https://via.placeholder.com/800x1000',
        categoryId: 2,
    },
    {
        id: 3,
        name: 'Apricots',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: 4.99,
        img: 'https://via.placeholder.com/800x1000',
        categoryId: 2,
    },
    {
        id: 4,
        name: 'Banana',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: 4.99,
        img: 'https://via.placeholder.com/800x1000',
        categoryId: 2,
    },
    {
        id: 5,
        name: 'Oranges',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: 4.99,
        img: 'https://via.placeholder.com/800x1000',
        categoryId: 2,
    },
    {
        id: 6,
        name: 'Raspberries',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: 4.99,
        img: 'https://via.placeholder.com/800x1000',
        categoryId: 5,
    },
    {
        id: 7,
        name: 'Grapes',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: 4.99,
        img: 'https://via.placeholder.com/800x1000',
        categoryId: 5,
    },
    {
        id: 8,
        name: 'Oranges',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: 4.99,
        img: 'https://via.placeholder.com/800x1000',
        categoryId: 5,
    },
    {
        id: 9,
        name: 'Grapes',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: 4.99,
        img: 'https://via.placeholder.com/800x1000',
        categoryId: 3,
    },
    {
        id: 10,
        name: 'Apple',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: 4.99,
        img: 'https://via.placeholder.com/800x1000',
        categoryId: 3,
    },
    {
        id: 11,
        name: 'Grapes',
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod te incididunt',
        price: 4.99,
        img: 'https://via.placeholder.com/800x1000',
        categoryId: 4,
    },
];

export default function ListDriverOfCompany () {
    const [categoryProduct, setCategoryProduct] = useState(categories);
    const [products, setProducts] = useState(productShop);
    const [activeTab, setActiveTab] = useState(1);

    const handleClick = (id) => {
        setActiveTab(id);
    };

    const productByCategory = () => {
        return activeTab === 1 ? products : products.filter((item) => item.categoryId === activeTab);
    };

    return (
        <div className="w-full px-[.75rem] mx-auto">
            <div className="py-[3rem] w-[90%] mx-auto">
                <div className="text-center">
                    <div className="flex flex-wrap my-[calc(1.5rem*-1)] lg:flex-nowrap">
                        <div className="text-left w-full mt-[1.5rem] mx-[.75rem] lg:w-[30%] lg:flex-[0_0_auto]">
                            <h1 className='text-[calc(1.365rem+1.5vw)] font-bold xl:text-[2.5rem]'>List Drivers Of Us</h1>
                        </div>

                        <div className="w-full shrink-0 mt-[1.5rem] px-[.75rem] relative lg:w-[66%] lg:flex-[0_0_auto]">
                            <ul className="inline-flex items-center flex-wrap pl-0 absolute top-[50%] right-8 -translate-y-2/4">
                                {categoryProduct.map((item, index) => (
                                    <li
                                        key={index}
                                        className={`m-[.5rem] rounded-[50rem] py-[.8rem] flex w-[130px] justify-center duration-300 transition-all ${ activeTab === item.id ? 'bg-[#ffb524] text-white' : 'bg-[rgb(244,246,248)]' }`}
                                        onClick={() => handleClick(item.id)}
                                    >
                                        <button className="focus:outline-none">
                                            <span className="text-dark" style={{ width: '130px' }}>
                                                {item.name}
                                            </span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-full my-[3rem] mx-auto py-[1.5rem] grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7">
                    {productByCategory().map((item, index) => (
                        <Link>
                            <div key={index} id="tab-1" className="lg:w-full rounded-[10px] relative duration-500 hover:shadow-[0.5px_1.5px_15px_15px_#dddddd] sm:w-[40%] w-full border border-[#ffb524]">
                                <div className="h-[300px] overflow-hidden rounded-t-[10px]">
                                    <img src={item.img} alt="" className='w-full h-full object-cover rounded-t-[10px] duration-500 ease-linear hover:scale-[1.3]' />
                                </div>
                                <div className="p-[1.5rem] border-t-[1px] border-[#ffb524]">
                                    <h4 className='text-[calc(1.264rem+0.3vw)] mb-[.5rem] mt-0 leading-5 font-extrabold'>{item.name}</h4>
                                    <p className="mb-[1rem] text-[#747d88]"></p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}