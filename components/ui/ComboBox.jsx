// ComboBox.js (or ComboBox.jsx)
const ComboBox = ({ options, isMulti, ...props }) => {
    return (
      <select multiple={isMulti} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };
  
  export default ComboBox;
  