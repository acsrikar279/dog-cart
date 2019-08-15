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

const cartList = [];

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: '' }
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e){
        this.setState({value: e.target.value});
    }

    render(){
        return(
        <input type="text" name="searchBar" value={this.state.value} onChange={this.handleInput} placeholder="search here "/>);
    }
}

class Product extends React.Component{
 constructor(props){
   super(props);
//    this.addToCart = this.addToCart.bind(this);
   this.handleClick = this.handleClick.bind(this);
 }
 handleClick(e, id){
    console.log("Button is clicked " + e.target);
 }
 addToCart(e){
    // cartList.push(e.target.value);
    console.log("id is " + e.target.id);
    console.log("value is " + e.target.value);
    cartList.push();
    console.log(cartList);
 }
 render(){
   return (
     <div className="itembox">
         <img width="100" src={this.props.image} alt={this.props.title}/>
         <span className="itemtitle">{this.props.title}</span>
         <span className="itemprice">{this.props.price}</span>
         <button onClick={this.addToCart} name={this.props.id} value={this.props.value} >Add to Cart</button>
     </div>
   );
 }
}
 
class ProductsList extends React.Component{
 render(){
   const products = this.props.products;
   const listItems = products.map((product) =>
     <Product key={product.id} title={product.title} price={product.price} image={product.image} value={product.id}/>
 );
   return (listItems);
 }
}
 
class BrandFilter extends React.Component{
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
    render(){
        return(<p> Cart comes here</p>);
    }
}
class Main extends React.Component{
    render(){
        return (
            <div>
                <Cart />
                <SearchBar />
                <Filters />
                <ProductsList products={prodsArray}/>
            </div>
        ); 
    }
}

// ReactDOM.render(<ProductsList products={prodsArray} />, document.getElementById('root'));
ReactDOM.render(<Main />, document.getElementById('root'));
