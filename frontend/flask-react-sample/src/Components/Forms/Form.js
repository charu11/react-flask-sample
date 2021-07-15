import React from 'react'

export const Form = ({userInput, onFormChange, onFormSubmit}) => {

    const handleChange = (e) =>{
        onFormChange(e.target.value)
    }

    return (
        <div>
            <>
            <form>
                <input type="text" required value={userInput} onChange={handleChange}></input>
                <input type="submit"></input>
            </form>
            </>
        </div>
    )
}
