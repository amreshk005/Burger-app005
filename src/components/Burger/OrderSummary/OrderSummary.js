import React from 'react';
import Aux from '../../../hoc/Aux';


const ordersummary = (props) => {
    let ingredientSummary = Object.keys(props.ingredients)
    .map(igkey => {
        return (<li key={igkey}>
            <span style={{ textTransform: 'capitalize' }}>{ igkey }</span>: { props.ingredients[igkey] } 
        </li> );
    })
    
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );
};

export default ordersummary;