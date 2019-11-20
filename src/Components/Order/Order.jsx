import React from 'react';
import {Field, reduxForm} from "redux-form";
import style from './Order.module.css'
import {createField, Input, Textarea} from "../../common/FormControls/FormsControls";
import {requiredField} from "../../utils/validators";
import {compose} from "redux";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {submitOrder} from "../../Redux/Reducer";

const Order = ({order, submitOrder}) => {
    const onSubmit = (formData) => {
        submitOrder(formData);
    };
    return (
        <div className={style.container}>
            {order ? <Redirect to={`/`}/>:
                <div className={style.item}>
                    <OrderReduxForm onSubmit={onSubmit}/>

                </div>}
        </div>
    );
};

const OrderForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            {createField('delivery_date',"delivery_date", [requiredField], Input, {type: "date"})}
            {createField('comment',"comment", null, Textarea, {type: "textarea"})}

            <div>
                <label>payment</label>
                <div>
                    <label><Field name="payment" component="input" type="radio" value="0"/> cash</label>
                    <label><Field name="payment" component="input" type="radio" value="1"/> card</label>
                </div>
            </div>

            {props.error && <div>
                <span className={style.error}>{props.error}</span>
            </div>}
            <div>
                <button>ORDER</button>
            </div>
        </form>
    );
};

const mapStateToProps = (state) => {
    return{

    }
};

const OrderReduxForm = reduxForm({form: 'order'})(OrderForm);

export default compose(
    connect(mapStateToProps, {submitOrder})
)(Order);
