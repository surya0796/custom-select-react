import styles from "./Select.module.css"
import { useEffect, useState } from 'react';

const { container, show, selectPlaceholder } = styles

type SelectOption = {
    value: string,
    label: string
}

type singleSelectProps = {
    multiple?: false,
    value?: SelectOption,
    onChange: (value: SelectOption | undefined) => void,
}

type multiSelectProps = {
    multiple: true,
    value: SelectOption[],
    onChange: (value: SelectOption[]) => void,
}

type SelectProps = {
    styling?: {},
    placeholder?: string,
    options: SelectOption[],
} & (singleSelectProps | multiSelectProps)

export const Select = ({ multiple, styling, value, onChange, options, placeholder }: SelectProps) => {
    const [isOpen, setisOpen] = useState<boolean>(false)
    const [isSelected, setisSelected] = useState<number>(0)

    const handleSelectOpen = () => {
        setisOpen(!isOpen)
    }

    const handleSelectOption = (e: any, option: SelectOption) => {
        e.stopPropagation()
        if (multiple) {
            if (value.includes(option)) {
                setisOpen(false)
                return
            } else {
                onChange([...value, option])
            }
        } else {
            if (option !== value) onChange(option)
        }
        setisOpen(false)
    }


    const handleClearValue = (e: any) => {
        e.stopPropagation()
        multiple ? onChange([]) : onChange(undefined)
    }
    const clearSelectedValue = (e:any,clickedValue:SelectOption)=>{
        e.stopPropagation()
        if(multiple){
            const newValue =  value?.filter((o:SelectOption) =>o!==clickedValue) 
            onChange([...newValue])
        }
    }

    return (
        <>
            <div
                tabIndex={0}
                onBlur={() => setisOpen(false)}
                onClick={handleSelectOpen} className={container}>
                {
                    multiple ? 
                    value.length > 0  ? 
                    <div className={styles["multi-value-container"]}>{
                        value.map((single) => <span className={styles["multi-select-value"]} key={single.value}>{single?.label}
                         <button
                        onClick={(e) => clearSelectedValue(e,single)}
                        className={styles["del-icon"]}>&times;</button>
                        </span>) 
                    }</div>
                    : <span className={selectPlaceholder}>{placeholder}</span>
                    : value ? <span className={styles["select-value"]}>{value?.label}</span>
                    : <span className={selectPlaceholder}>{placeholder}</span>
                }
                
                <div className={styles["right-icons-wrapper"]}>
                    <button
                        onClick={(e) => handleClearValue(e)}
                        className={styles["del-icon"]}>&times;</button>
                    <div className={styles["middle-line"]}></div>
                    <div className={styles["dropdown-indicator"]}></div>
                    <ul className={`${styles.options} ${isOpen && show}`}>
                        {options.map((option, idx) => {
                            return (
                                <li
                                    onClick={(e) => {
                                        setisSelected(idx)
                                        handleSelectOption(e, option)
                                    }}
                                    className={`${styles["single-option"]}
                                    ${isSelected === idx && styles.selected}
                                    `} key={option.value}>{option.label}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}