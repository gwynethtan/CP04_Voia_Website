// Input box design for forms
const FormInputBox = ({id,inputType, inputTitle}) => { 
    return (
        <div className="pt-8">
            <label htmlFor="fname" className="font-semibold text-white block text-lg mb-2">{inputTitle}</label>
            <input type={inputType} id={id} name="password" class="bg-formInputBox text-white px-3 py-3 w-full rounded-xl" required></input>
        </div>
    );
}

export default FormInputBox;