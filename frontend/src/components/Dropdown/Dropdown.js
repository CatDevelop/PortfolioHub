import React from 'react';
import s from './Dropdown.module.css';
import Form from "react-bootstrap/Form";
import classNames from "classnames/bind";
import Select from "react-select";

function Dropdown(props) {
    return (
        <div>
            <p className={s.title}>{props.title}</p>
            <Select
                className={s.dropdown}
                defaultValue={props.isDefault?null:props.options[0]}
                isDisabled={false}
                isLoading={!props.options.length}
                isClearable={false}
                isRtl={false}
                isSearchable={false}
                name="department"
                options={props.options}
                onChange={props.onChange}
                value={props.value}
                hideSelectedOptions={true}
                // controlShouldRenderValue = { false }
                // isMulti

                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "rgb(99, 179, 237)" : "transparent",
                        // backgroundColor: "#343437",
                        backgroundColor: "#343437",
                        borderRadius: "6px",
                        fontFamily: "SFPro",
                        minHeight: "2.5rem",
                        fontWeight: "600",
                        minWidth: props.minWidth
                    }),

                    input: (baseStyles, state) => ({
                        ...baseStyles,
                        fontFamily: "SFPro",
                        fontWeight: "600",
                        color: "#FFFFFF"
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? 0 : "rgb(99, 179, 237)",
                        backgroundColor: state.isFocused ? "#4e4e4e" : "#343437",
                        color: "#FFFFFF",
                        fontFamily: "SFPro",
                        fontWeight: "600",
                        borderRadius: "5px"
                    }),
                    menu: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? 0 : "rgb(99, 179, 237)",
                        backgroundColor: state.isFocused ? "#4e4e4e" : "#343437",
                        color: "#FFFFFF",
                        borderRadius: "5px"
                    }),
                    singleValue: (baseStyles) => ({
                        ...baseStyles,
                        color: "#FFFFFF"
                    })
                }}
            />
        </div>
    )
}

export default Dropdown;
