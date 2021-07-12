import { InputHTMLAttributes } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string | false;
}
const Input = (props: InputProps) => {
  const { className, error, ...otherProps } = props;
  return (
    <>
      <input
        {...otherProps}
        className={`appearance-none border-2 border-gray-800 rounded-lg w-full py-2 px-4 leading-tight focus:outline-none shadow-inner focus:border-gray-900`}
      />
      <span className="text-red-800">{error}</span>
    </>
  );
};

export default Input;
