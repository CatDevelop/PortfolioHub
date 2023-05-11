import React, {useState} from 'react';
import s from './TagInput.module.css';
import Select from "react-select";
import makeAnimated from 'react-select/animated';

function TagInput(props) {
    //const [selectedOptions, setSelectedOptions] = useState();
    const languagesList = [
        { value: 'Python', label: 'Python'},
        { value: 'Java', label: 'Java'},
        { value: 'JavaScript', label: 'JavaScript'},
        { value: 'TypeScript', label: 'TypeScript'},
        { value: 'C', label: 'C'},
        { value: 'C++', label: 'C++'},
        { value: 'C#', label: 'C#'},
        { value: 'PHP', label: 'PHP'},
        { value: 'R', label: 'R'},
        { value: 'Swift', label: 'Swift'},
        { value: 'Matlab', label: 'Matlab'},
        { value: 'Kotlin', label: 'Kotlin'},
        { value: 'SQL', label: 'SQL'},
        { value: 'PostgreSQL', label: 'PostgreSQL'},
        { value: 'MySQL', label: 'MySQL'},
        { value: 'Ruby', label: 'Ruby'},
        { value: 'Go', label: 'Go'},
        { value: 'HTML', label: 'HTML'},
        { value: 'CSS', label: 'CSS'},
        { value: 'SASS', label: 'SASS'},
        { value: 'SCSS', label: 'SCSS'},
        { value: 'Kotlin', label: 'Kotlin'},
        { value: 'Perl', label: 'Perl'},
        { value: 'JQuery', label: 'JQuery'},
        { value: 'Angular', label: 'Angular'},
        { value: 'React', label: 'React'},
        { value: 'Redux', label: 'Redux'},
        { value: 'NextJS', label: 'NextJS'},
        { value: 'ViteJS', label: 'ViteJS'},
        { value: 'Rust', label: 'Rust'},
        { value: 'NuxtJS', label: 'NuxtJS'},
        { value: 'Rails', label: 'Rails'},
        { value: 'Electron', label: 'Electron'},
    ].map(e => ({...e, color: '#F7F4A6', type: 'language' }));

    const rolesOptions = [
        { value: 'Project manager', label: 'Project manager'},
        { value: 'Product manager', label: 'Product manager'},
        { value: 'Analyst', label: 'Analyst'},
        { value: 'System Analyst', label: 'System Analyst'},
        { value: 'Data Scientist', label: 'Data Scientist'},
        { value: 'Tech Writer', label: 'Tech Writer'},
        { value: 'Designer', label: 'Designer'},
        { value: 'Tech Lead', label: 'Tech Lead'},
        { value: 'Front-end developer', label: 'Front-end developer'},
        { value: 'Back-end developer', label: 'Back-end developer'},
        { value: 'Mobile developer', label: 'Mobile developer'},
        { value: 'Game Developer ', label: 'Game Developer'},
        { value: 'QA', label: 'QA'},
        { value: 'HR', label: 'HR'},
        { value: 'Scrum Master', label: 'Scrum Master'},
        { value: 'DevOps', label: 'DevOps'},
        { value: 'Information Security ', label: 'Information Security'},
    ].map(e => ({...e, color: '#A6BDF7', type: 'role'}));

    const levelOptions = [
        { value: 'Intern', label: 'Intern'},
        { value: 'Junior', label: 'Junior'},
        { value: 'Middle', label: 'Middle'},
        { value: 'Senior', label: 'Senior'},
        { value: 'Lead', label: 'Lead'},
    ].map(e => ({...e, color: '#F7BCE2', type: 'level'}));

    const groupedOptions = [
        {
            label: 'Языки программирования',
            options: languagesList,
        },
        {
            label: 'Роль в команде',
            options: rolesOptions,
        },
        {
            label: 'Уровень специализации',
            options: levelOptions,
        },
    ];


    // Function triggered on selection
    function handleSelect(data) {
        if(data.length < 20)
            props.setSelectedOptions(data);
    }

    const animatedComponents = makeAnimated();

    return (
        <div className={s.selectContainer}>
            <div className={s.titleBox}><p className={s.title}>{props.title ?? ""}</p>
                {props.require ? <p title="Поле обязательно для ввода" className={s.required}>*</p> : <></>}
            </div>
            <Select
                options={groupedOptions}
                placeholder=""
                value={props.selectedOptions}
                onChange={handleSelect}
                isSearchable={true}
                components={animatedComponents}
                isMulti
                // blurInputOnSelect={true}
                closeMenuOnSelect={false}
                showGroupWheel={true}

                styles={{
                    control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? "rgb(99, 179, 237)" : "transparent",
                        // backgroundColor: "#343437",
                        backgroundColor: "#343437",
                        borderRadius: "6px",
                        fontFamily: "SFPro, serif",
                        minHeight: "2.5rem",
                        fontWeight: "600"
                    }),

                    input: (baseStyles, state) => ({
                        ...baseStyles,
                        fontFamily: "SFPro, serif",
                        fontWeight: "600",
                        color: "#FFFFFF"
                    }),
                    option: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: state.isFocused ? 0 : "rgb(99, 179, 237)",
                        backgroundColor: state.isFocused ? "#4e4e4e" : "#343437",
                        color: "#FFFFFF",
                        fontFamily: "SFPro, serif",
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
                    multiValue: (styles, { data }) => {
                        return {
                            ...styles,
                            backgroundColor: data.color,
                            color: '#030303',
                            fontFamily: 'SFPro, serif'
                        };
                    },
                }}
            />
        </div>
    )
}

export default TagInput;
