import { Input } from "antd";
import { useState } from "react";

const { TextArea } = Input;

const Feedback = () => {
    // ? ================ DEPENDENCIES =====================
    const [dataFeedback, setDataFeedback] = useState({
        name: '',
        email: '',
        text: ''
    })

    // ? =============== HANDLE 
    return (
        <form className="max-w-xl mx-auto mt-20 p-6 bg-white border rounded-lg shadow-lg mb-5">
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
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" for="email">
                    Email:
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" for="feedback">
                    Feedback:
                </label>
                <TextArea
                    id="feedback"
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
