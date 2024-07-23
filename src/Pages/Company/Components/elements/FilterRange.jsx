import { useState } from "react";

export const FilterRange = () => {
    const [inputRangePrice, setInputRangePrice] = useState(0);
    const handleInputRange = (e) => {
        setInputRangePrice(e.target.value);
    };
    return (
        <div className="mb-[1rem]">
            <h4 className="text-[calc(1.275rem+0.3vw)] xl:text-[1.5rem]">Price</h4>
            <input
                type="range"
                className="w-full h-[1rem] bg-[rgba(0,0,0,0)] text-[light-dark(rgb(16,16,16),rgb(255,255,255))]"
                id="rangeInput"
                name="rangeInput"
                min="0"
                max="500"
                value={inputRangePrice}
                onInput={handleInputRange}
            />
            <output id="amount" name="amount" min-velue="0" max-value="500" for="rangeInput" className="text-[#747d88]">
                {inputRangePrice}
            </output>
        </div>
    );
};