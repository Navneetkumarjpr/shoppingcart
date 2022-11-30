import React,{useState,useEffect} from 'react'
import './shopCart.css'
import Plus from "../images/plus.png"
import Minus from "../images/minus.png"
import Delete from "../images/DELETE.png"
import Location from "../images/LOCATION.png"
import Check from "../images/check.png"
import { Product } from '../Data'

import MinusActive from "../images/minus-active.png"
const ShopCart = () => {
  const [total, setTotal] = useState(0);
  const [cashBack, setCashBack] = useState(0);
  const [pincode, setPincode] = useState(0);
  const [deliveryPrice, setDeliveryPrice] = useState(-1)
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [minEstimatedDays, setMinEstimatedDays] = useState(0);
  const [maxEstimatedDays, setMaxEstimatedDays] = useState(0);
     const [products, setProducts] = useState(Product)
    const [pin, setPin] = useState({
      "560066": {
        "deliveryPrice": 50,
        "cashOnDelivery": false,
        "estimatedDays": {
          "min": 2,
          "max": 5
        }
      },
      "560067": {
        "deliveryPrice": 0,
        "cashOnDelivery": true,
        "estimatedDays": {
          "min": 3,
          "max": 5
        }
      },
      "560068": {
        "deliveryPrice": 0,
        "cashOnDelivery": false,
        "estimatedDays": {
          "min": 5,
          "max": 5
        }
      }
    })
    useEffect(() => {
      let to =0;
      let cash =0;
          for(let i=0;i<products.length;i++){
            to=to+products[i].price*products[i].quantity;
            if(products[i].tagline){
              cash=cash+ parseInt(products[i].tagline.split(" ")[0]);
            }
          }
          setTotal(to);
          setCashBack(cash);
    }, [products])

    
    const plus =(id,e)=>{
      e.preventDefault();
      const pros = products.map(pro => {
        if (pro.id === id) {
          return {
            ...pro,
            quantity: pro.quantity +1,
          };
        } 
        return pro
      });
      setProducts(pros);
    }
    const minus =(id,e)=>{
      e.preventDefault();
      const pros = products.map(pro => {
        if (pro.id === id && pro.quantity>0) {
          return {
            ...pro,
            quantity: pro.quantity - 1,
          };
        } 
        return pro
      });
      setProducts(pros);
    }
 
    const deleteProduct =(id,e)=>{
      e.preventDefault();
      setProducts(
        products.filter(a => a.id !== id)
      );
    }

    useEffect(() => {
      for (const item in pin) {
        if(item==pincode){
          let val = pin[item];
          setDeliveryPrice(val.deliveryPrice);
          setCashOnDelivery(val.cashOnDelivery);
          setMinEstimatedDays(val.estimatedDays.min);
          setMaxEstimatedDays(val.estimatedDays.max);
          break;
        }else{
          setDeliveryPrice(0);
          setCashOnDelivery(0);
          setMinEstimatedDays(0);
          setMaxEstimatedDays(0);
        }
      }
    }, [pincode])
    
  return (
    <div className='outerShoppingCart'>
      <div className="innerShoppingCart">
        <h1>Shopping Cart</h1>
        <div className="shoppingCart">
          <div className="shopping_head">
            <div className="product">
              Product
            </div>
            <div className="price">
              Price
            </div>
            <div className="quality">
              Quality
            </div>
            <div className="subtotal">
              SubTotal
            </div>
            <div className="space">
              .
            </div>
          </div>
          <div className="products">
            {
              products.map((product)=>{
                 console.log(product.desc.split("\n\n")[0]+" "+product.desc.split("\n\n")[1]);
                return (
                  <div className="card">
                    <div className="image_card">
                      <img className='product_image' src={product.imageUrl} alt="" />
                      {product.gift?
                      <div className='gift_box'>
                       <h2>GIFT</h2>
                       <h4 className='gift'>{product.gift.name}</h4>
                      
                       <h3>{product.gift.desc}</h3>

                      </div>
                      
                      :
                      <div className="card_detail">
                      {
                        product.tagline?<h1 className='tagline'>{product.tagline.toUpperCase()}</h1>:<h3></h3>
                      }
                      <h3>{product.name}</h3>
                      <h4>{product.desc.includes("\n\n")?product.desc.split("\n\n")[0]:product.desc}</h4>
                      {
                       product.desc.split("\n\n").length>=2?<h5>{product.desc.split("\n\n")[1]}</h5>:<h6></h6>
                      }
                    </div>
                      }
                    </div>
                    <div className="price_detail">
                      <h3>{product.gift?product.gift.price:product.price} $</h3>
                    </div>
                    <div className="quality_detail">
                      {
                      product.gift?
                      <div className='gift_value'>
                        1
                      </div>:
                      <>
                      <button onClick={(e)=>minus(product.id,e)} className='button'>{product.quantity>0?<img src={MinusActive} alt="" />:<img src={Minus} alt="" />}</button>
                      <div className="num">
                        <h4>{product.quantity}</h4>
                      </div>
                      <button onClick={(e)=>plus(product.id,e)} className='button'><img src={Plus} alt="" /></button>
                      </>
                     }
                    </div>
                    <div className="subTotal_detail">
                      {
                      product.gift?"":<>
                      {product.tagline?product.price*product.quantity- parseInt(product.tagline.split(" ")[0]):product.price*product.quantity}
                      </>
                      }
                    </div>
                    {
                      product.gift?"":
                      <div className="del_bun">
                      <img onClick={(e)=>deleteProduct(product.id,e)} src={Delete} alt="" />
                      </div>
                    }
                  </div>
                )
              })
            }
          </div>
          <div className="price_total">
              <div className="delivery_box">
              <h2>Delivery Availability</h2>
              <div className='location_detail'>
                <img src={Location} alt="" />
                <input onChange={(e)=>setPincode(e.target.value)} type="text"  placeholder='11003' />
                <h3>CHANGE</h3>
              </div>
              <div className="delivery_detail">
                <div className="free">
                {
                  deliveryPrice>0 && pincode?<img src={Check} alt="" />:<img className='cross' src={Plus} alt="" />
                }
                <div>
                  <h3>Free</h3>
                  <h3>delivery</h3>
                </div>
                </div>
                <div className="free">
                {
                  cashOnDelivery && pincode?<img src={Check} alt="" />:<img className='cross' src={Plus} alt="" />
                }
                <div>
                  <h3>Cash on</h3>
                  <h3>delivery</h3>
                </div>
                </div>
                <div className="free">
                {
                  minEstimatedDays!=0 && maxEstimatedDays!=0 && pincode?<img src={Check} alt="" />:<img className='cross' src={Plus} alt="" />
                }
                  <div>
                  <h3>Estimated delivery</h3>
                  <h3>time is {minEstimatedDays}-{maxEstimatedDays} days</h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="order_summary">
              <h3 className='summ'>Order Summary {`(xx items)`}</h3>
              <div className="order_subtotal">
                <h3>Subtotal</h3>
                <h3>{total} $</h3>
              </div>
              <div className="order_subtotal">
                <h3>Total Discount</h3>
                <h3>-{cashBack} $</h3>
              </div>
              <div className="order_subtotal">
              <h3>Standard Shipping</h3>
                <h3>{deliveryPrice==0?"Free":deliveryPrice}</h3>
              </div>
              <div className="order_total">
                <h3>Order Total</h3>
                <h1>{deliveryPrice<=0?total-cashBack>5000?(total-cashBack)-(total-cashBack)/10:(total-cashBack):total-cashBack-deliveryPrice>5000?(total-cashBack-deliveryPrice)-(total-cashBack-deliveryPrice)/10:(total-cashBack-deliveryPrice)} $</h1>
              </div>
              <div className="continue">
                <h3>CONTINUE SHOPPING</h3>
                <button>CHECKOUT</button> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopCart