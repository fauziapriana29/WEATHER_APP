import React from 'react';
import {useForm} from 'react-hook-form'
import '../Input/style.css'

const Input = (props) => {

    const { getCity, getweaters } = props
    const {handleSubmit, register} = useForm()

    return (
        <div className="input-cont">
            <form onSubmit={handleSubmit(getweaters)}>
                <input type="text" className="input-field form" name="city" ref={register}/>&nbsp;
                <button className="btn btn-success search-btn"><i className="fas fa-search"></i></button>
            </form>
        </div>
    )

}

export default Input