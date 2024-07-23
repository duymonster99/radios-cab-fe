import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useMutationHook } from '~/Hooks/useMutation';
import { DataContext } from '~/Hooks/context';
import { postApi } from '~/Services/apiService';

export default function ModalCreateAccount() {
    const [selectValue, setSelectValue] = useState(0);
    const [dataInput, setDataInput] = useState({
        title: '',
        slug: '',
    });

    const { dataApi, setOpenForm } = useContext(DataContext);

    const handleChangeInput = (e) => {
        const { name, value } = e.target;

        let updateForm = {
            ...dataInput,
            [name]: value,
        };
        setDataInput(updateForm);
    };

    const dataSubmit = useMemo(() => ({
        title: dataInput.title,
        slug: dataInput.slug,
        parentId: selectValue,
    }), [dataInput, selectValue])

    const mutation = useMutationHook((props) => postApi(props));

    const { isSuccess } = mutation

    const handleSubmit = () => {
        mutation.mutate({url: 'category/create', data: dataSubmit})
    }

    console.log(mutation);

    useEffect(() => {
        if (isSuccess) {
            setOpenForm(false)
        }
    }, [isSuccess, setOpenForm])

    return (
        <>
            <div className="mt-[.5rem] w-full">
                <TextField
                    fullWidth
                    id="title"
                    label="Title"
                    name="title"
                    onChange={handleChangeInput}
                    variant="standard"
                />
            </div>

            <div className="mt-[.5rem] w-full">
                <TextField
                    fullWidth
                    id="slug"
                    placeholder="Nhập đường dẫn..."
                    name="slug"
                    onChange={handleChangeInput}
                    variant="standard"
                />
            </div>

            <div className="mt-[1rem]">
                <FormControl fullWidth variant="standard" sx={{ minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-standard-label">ParentId</InputLabel>
                    <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={selectValue}
                        onChange={(e) => setSelectValue(e.target.value)}
                        label="ParentId"
                    >
                        <MenuItem value={0}>-- Chọn danh mục --</MenuItem>
                        {dataApi.map((item) => (
                            <MenuItem value={item._id}>{item.title}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <button
                className="rounded-[50rem] bg-[linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white text-[1.25rem] p-[.5rem_1.5rem] mt-[1.5rem]"
                onClick={handleSubmit}
            >
                Submit
            </button>
        </>
    );
}
