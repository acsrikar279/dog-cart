import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
 
 
const prodsArray = [
 {id: 1, title: "Galaxy A80", price: 47000, image: "A80.jpg"},
 {id: 2, title: "Oneplus 7", price: 33000, image: "Oneplus7.jpg"},
 {id: 3, title: "Galaxy M30", price: 17000, image: "M30.jpg"},
 {id: 4, title: "Galaxy M40", price: 20000, image: "M40.jpg"},
 {id: 5, title: "Oneplus 7 Pro", price: 53000, image: "Oneplus7Pro.jpg"}
];
 
class Product extends React.Component{
 constructor(props){
   super(props);
 }
 handleClick(e, id){
    console.log("Button is clicked " + e);
 }
 render(){
   return (
     <div class="itembox">
         <img heigh="220" width="100" src={this.props.image}/>
         <span class="itemtitle">{this.props.title}</span>
         <span class="itemprice">{this.props.price}</span>
         <button onClick={() => this.handleClick(this.props.id)} >Add to Cart</button>
     </div>
   );
 }
}
 
class ProductsList extends React.Component{
 constructor(props){
   super(props);
  
 }
 render(){
   const products = this.props.products;
   const listItems = products.map((product) =>
     <Product key={product.id} title={product.title} price={product.price} image={product.image}/>
 );
   return (listItems);
 }
}
 
class BrandFilter extends React.Component{
    constructor(props){
        super(props);
    }
 render(){
   return (
       <div>
        <input type="checkbox" value="Samsung"/> Samsung
        <input type="checkbox" value="Oneplus"/> Oneplus
       </div>
   );
 }
}

class PriceFilter extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <input type="text" name="minValue" placeholder="Enter min price"/>
                <input type="text" name="maxValue" placeholder="Enter max price"/>
            </div>
        );
    }
}

class Filters extends React.Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <div>
                <BrandFilter />
                <PriceFilter />
            </div>
        );
    }
}
 
class Cart extends React.Component{
    constructor(props){
        super(props);
    }

}
class Main extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Filters />
                <ProductsList products={prodsArray}/>
            </div>
        ); 
    }
}

// ReactDOM.render(<ProductsList products={prodsArray} />, document.getElementById('root'));
ReactDOM.render(<Main />, document.getElementById('root'));
