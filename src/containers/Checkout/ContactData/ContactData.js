import React, {Component} from 'react';
import  { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import { updatedObject, checkValidity } from '../../../shared/utility';



class ContactData extends Component {
    state = {
        orderForm: {

            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            } ,
            street:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false

            },
            zipcode:  {
                elementType:  'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP CODE'
                },
                value: '',
                validation:{
                    required:true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid:false,
                touched:false
            } ,
            country:  {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            } ,
            email:  {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
            } ,
            deliveryMethod:  {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value:'fastest', displayValue: 'Fastest'},
                        {value:'Chespest', displayValue: 'Cheapest'}
                     ],
                },
                value: 'fastest',
                validation: {},
                valid: true
            } 
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let formElemetIdentifier in this.state.orderForm) {
            formData[formElemetIdentifier] = this.state.orderForm[formElemetIdentifier].value;
        }
        const order = { 
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        }

        this.props.onOrderBurger(order, this.props.token);

    }
    inputChangeHandler = (event,inputIdentifier) => {

        const updatedFormElement = updatedObject(this.state.orderForm[inputIdentifier], {
            value:event.target.value,
            valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched:  true,
        })

        const updatedOrderForm = updatedObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement,
        });
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render () {
        const formElementArray = [];
        for (let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config: this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}> 
            {/* <Input elementType="..." elementConfig="..." value="..." /> */}
            {formElementArray.map(formElement => (
                <Input 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangeHandler(event,formElement.id )} />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
        </form>
        );
        if(this.props.loading) {
            form = <Spinner />
        }
        return (
        <div className={classes.ContactData}>
            <h4>Enter your Contact Data</h4>
            {form}
        </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId : state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }; 
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));