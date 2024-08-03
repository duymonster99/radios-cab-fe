// libraries
import { Menu } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { getProvincesWithDetail } from 'vietnam-provinces';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../../../../Hooks/context';

export const CategoriesItem = (props) => {
    const options = []
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState('');
    const { setListLocationFilter, listLocationFilter } = useContext(DataContext)  

    // ? =========================================== handle provinces =========================================
    useEffect(() => {
        const apiProvinces = async () => {
            try {
                const data = await getProvincesWithDetail();
                const provinceArray = Object.values(data);

                // locations.push(tempLocations)
                setLocations(provinceArray);
            } catch (error) {
                console.log(error);
            }
        };

        apiProvinces();
    }, []);

    for (let i = 0; i < locations.length; i++) {
        const value = locations[i].name;
        options.push({
            key: value,
            label: value
        });
    }

    const items = [
        {
            key: 'sub4',
            label: 'Location',
            icon: <SettingOutlined />,
            children: options
        },
    ];

    const onClick = (e) => {
        setLocation(e.key)
    };

    useEffect(() => {
        const newLocationFilter = listLocationFilter.filter((data) => data.companyCity === location)
        setListLocationFilter(newLocationFilter)
    }, [location])

    return (
        <Menu
            onClick={onClick}
            style={{
                width: 256,
            }}
            mode="vertical"
            items={items}
        />
    );
};
