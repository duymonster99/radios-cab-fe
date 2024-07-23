
export const Additional = ({ number, name }) => {
    return (
        <div className="mb-[.5rem]">
            <input
                type="radio"
                className="mr-[.5rem]"
                id={`Categories-${number}`}
                name="Categories-1"
                value="Beverages"
            />
            <label for={`Categories-${number}`} className="text-[#747d88]">
                {' '}
                {name}
            </label>
        </div>
    );
};