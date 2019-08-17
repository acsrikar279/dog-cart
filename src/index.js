import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
 
 
const prodsArray = [
 {id: 1, title: "Galaxy A80", price: 47000, image: "A80.jpg", brand: "samsung"},
 {id: 2, title: "Oneplus 7", price: 33000, image: "Oneplus7.jpg", brand: "oneplus"},
 {id: 3, title: "Galaxy M30", price: 17000, image: "M30.jpg", brand: "samsung"},
 {id: 4, title: "Galaxy M40", price: 20000, image: "M40.jpg", brand: "samsung"},
 {id: 5, title: "Oneplus 7 Pro", price: 53000, image: "Oneplus7Pro.jpg", brand: "oneplus"}
];  

let cartList = [];
let filteredList = [];
let brandCheck = [];

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {value: '' }
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(e){
        const retrievedValue = e.target.value;
        const retrValueSmall = retrievedValue.toLowerCase();
        let filteredList = [];
        for(let i=0; i<prodsArray.length; i++){
            if(prodsArray[i].title.toLowerCase().includes(retrValueSmall)){
                filteredList.push(JSON.parse(JSON.stringify(prodsArray[i])));
            }
        }
        ReactDOM.render(<ProductsList products={filteredList} />, document.getElementById("productsDiv"));
        this.setState({value: retrievedValue});

    }

    render(){
        return(
        <input type="text" name="searchBar" value={this.state.value} onChange={this.handleInput} placeholder="search here "/>);
    }
}

class Product extends React.Component{
 constructor(props){
   super(props);
   this.addToCart = this.addToCart.bind(this);
 }
 addToCart(e){
    var retrievedID = e.target.value;
    cartList.push(JSON.parse(JSON.stringify(prodsArray[retrievedID-1])));
    ReactDOM.render(<CartList cart={cartList}/>, document.getElementById('cartDiv'));
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
 
class CartList extends React.Component{
    render(){
        const cart = this.props.cart;
        const listItems = cart.map((cart) =>
          <CartItem key={cart.id} title={cart.title} price={cart.price} image={cart.image} value={cart.id}/>
      );
        return (listItems);
      }
}

class CartItem extends React.Component{
    render(){
   return (
     <div>
         <img width="50" height="100" src={this.props.image} alt={this.props.title}/>
         <span className="itemtitle">{this.props.title}</span>
         <span className="itemprice">{this.props.price}</span>
     </div>
   );
 }
}

class BrandFilter extends React.Component{
    constructor(props){
        super(props);
        this.state = {samsung: false, oneplus: false};
        this.handleInputChange = this.handleInputChange.bind(this);
        
    }
    handleInputChange(event){
        const target = event.target;        
        const name = target.name;
        const checkedStatus = target.checked;
        console.log(checkedStatus);
        this.setState({
            [name]: !checkedStatus
          });
        if(checkedStatus){
            console.log("brandcheck is "+brandCheck);
            if(!brandCheck.includes(name)){
                for(let i=0; i<prodsArray.length; i++){
                    if(prodsArray[i].brand === name){
                        filteredList.push(JSON.parse(JSON.stringify(prodsArray[i])));
                    }
                }
                ReactDOM.render(<ProductsList products={filteredList} />, document.getElementById("productsDiv"));
            }
            brandCheck.push(name);    
        }
        else{
            let index = brandCheck.indexOf(name);
            if(index > -1){
                brandCheck.splice(index, 1);
            }
            let n = filteredList.length;
            let nl = [];
            var i = 0;
            for(i=0; i<n; i++){
                if(!(filteredList[i].brand === name)){
                    nl.push(JSON.parse(JSON.stringify(filteredList[i])));
                }
            }
            filteredList = nl;
            nl = [...filteredList];
            nl = [];
            if(brandCheck.length===0){
                ReactDOM.render(<ProductsList products={prodsArray} />, document.getElementById("productsDiv"));
            }
            else{
                ReactDOM.render(<ProductsList products={filteredList} />, document.getElementById("productsDiv"));
            }
        }
        
    }
 render(){
   return (
       <div>
        <label>Choose brands</label>
        <input name="samsung" type="checkbox" value="Samsung" onChange={this.handleInputChange} checked={this.state.samsungCheck} /> Samsung
        <input name="oneplus" type="checkbox" value="Oneplus" onChange={this.handleInputChange} checked={this.state.oneplusCheck} /> Oneplus
       </div>
   );
 }
}

// class PriceFilter extends React.Component{
//     constructor(props){
//         super(props);
//         this.handleInputChange = this.handleInputChange.bind(this);
//         this.state = {minValue:'', maxValue: ''}
//     }
//     handleInputChange(event){
//         const target = event.target;        
//         const name = target.name;
//         this.setState({[name]: target.value});

//     }
//     render(){
//         return (
//             <div>
//                 <input type="text" name="minValue" value={this.state.minValue} onChange={this.handleInputChange} placeholder="Enter min price"/>
//                 <input type="text" name="maxValue" value={this.state.maxValue} onChange={this.handleInputChange} placeholder="Enter max price"/>
//             </div>
//         );
//     }
// }

class Filters extends React.Component{
    render(){
        return (
            <div>
                <BrandFilter />
                {/* <PriceFilter /> */}
            </div>
        );
    }
}


// class Main extends React.Component{
//     render(){
//         return (
//             <div>
//                 <CartList cart={cartList}/>
//                 <SearchBar />
//                 <Filters />
//                 <ProductsList products={prodsArray}/>
//             </div>
//         ); 
//     }
// }

ReactDOM.render(<CartList cart={cartList} />, document.getElementById('cartDiv'));
ReactDOM.render(<Filters />, document.getElementById('filtersDiv'));
ReactDOM.render(<SearchBar />, document.getElementById('searchDiv'));
ReactDOM.render(<ProductsList products={prodsArray} />, document.getElementById('productsDiv'));
// ReactDOM.render(<Main />, document.getElementById('root'));