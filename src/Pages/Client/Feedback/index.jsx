import { Input, message } from 'antd';
import { useEffect, useState } from 'react';
import { useMutationHook } from '../../../Hooks/useMutation';
import { postFeedbackService } from '../../../Services/apiService';

const { TextArea } = Input;

const Feedback = () => {
    // ? ================ DEPENDENCIES =====================
    const [dataFeedback, setDataFeedback] = useState({
        name: '',
        email: '',
        text: '',
    });

    const [errorMessage, setErrorMessage] = useState({
        name: '',
        email: '',
        text: '',
    });

    // ? =============== HANDLE CHANGE DATA ================
    const handleChange = (e) => {
        setDataFeedback({
            ...dataFeedback,
            [e.target.name]: e.target.value,
        });
    };

    // ? ============== HANDLE SUBMIT ======================
    const mutation = useMutationHook((props) => postFeedbackService(props));

    const { data, isSuccess, isPending, isError } = mutation;

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};

        if (dataFeedback.name === '') {
            errors.name = 'Please enter name';
        }

        if (dataFeedback.email === '') {
            errors.email = 'Please enter email';
        } else if (!dataFeedback.email.includes('@gmail.com')) {
            errors.email = 'Invalid email format';
        }

        if (dataFeedback.text === '') {
            errors.text = 'Please enter description';
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessage({
                ...errorMessage,
                ...errors,
            });
        } else {
            const formData = new FormData();
            Object.keys(dataFeedback).forEach((key) => {
                formData.append(key, dataFeedback[key]);
            });

            mutation.mutate({ url: 'Feedback/CreateFeedback', data: formData });
        }
    };

    //  handle after post
    useEffect(() => {
        if (isSuccess) {
            message.success('Send Feedback Successfully!');
        }
    }, [isSuccess, isError, isPending]);

    return (
        <form className="max-w-xl mx-auto mt-20 p-6 bg-white border rounded-lg shadow-lg mb-5" onSubmit={handleSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-center">Feedback Form</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" for="name">
                    Name:
                </label>
                <Input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    value={dataFeedback.name}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" for="email">
                    Email:
                </label>
                <Input name="email" placeholder="Enter your email" value={dataFeedback.email} onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" for="feedback">
                    Feedback:
                </label>
                <TextArea
                    id="feedback"
                    name="text"
                    value={dataFeedback.text}
                    onChange={handleChange}
                    placeholder="Enter your feedback"
                    autoSize={{ minRows: 2, maxRows: 20 }}
                ></TextArea>
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};

export default Feedback;
