import React, { useState, useEffect } from 'react';
import './Convert.css';
import country_list from '../../utils/country-list';
import country_code from '../../utils/country-code';
import API_KEY from '../../utils/api-key';
import axios from 'axios';



const Convert = () => {
  const [indCountry, setIndCountry] = useState(47);
  const [indCountry2, setIndCountry2] = useState(149);
  const [OfCurrencyCountry, setOfCurrencyCountry] = useState("USD");
  const [toCurrencyCountry, setToCurrencyCountry] = useState("EUR");
  const [amount, setAmount] = useState(1);


  const onSubmitHandler = async(e) => {
    e.preventDefault();
    getExchangeRate();
  }

  const  getExchangeRate = () =>{
    const exchangeRateTxt = document.querySelector("form .convert-results");
    let amountVal = amount;
    exchangeRateTxt.innerText = "Getting exchange rate...";

    let urls = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${OfCurrencyCountry}`;

    axios
      .get(urls)
      .then((res) => {
        console.log("u++++++++++",res.data);
        console.log("u++++++++++",res.data.conversion_rates[toCurrencyCountry]);
        const exchangeRate = res.data.conversion_rates[toCurrencyCountry]; // taux de change
        const totalExRate = (amountVal * exchangeRate).toFixed(2);
        exchangeRateTxt.innerText = `${amountVal} ${OfCurrencyCountry} = ${totalExRate} ${toCurrencyCountry}`;
      })
      .catch((err) => {
        exchangeRateTxt.innerText = "Something went wrong";
        console.log(err);
      });
  }




  return (
    <div className="Convert">
      <form onSubmit={onSubmitHandler}>
       <div className="convert-inputs flex">
             <div className="cvrt amount">
                 <label htmlFor="amount">Amount</label>
                 <input id='amount' type="text" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
             </div>
              <div className="cvrt of">
                 <label htmlFor="of">Of</label>
                 <div className="contains-of">
                     <img src={"https://flagcdn.com/48x36/"+country_code[indCountry2].toLowerCase()+".png"} alt="flag" />
                     <select id='of' defaultValue={OfCurrencyCountry} onChange={(e)=>setOfCurrencyCountry(e.target.value)}>
                       {
                         Object.keys(country_list).map((currency_code, i)=>{
                             return (
                               <option key={currency_code} value={currency_code} onClick={()=>{setIndCountry2(i)}}>{currency_code}</option>
                             );
                         })
                       }
                     </select>
                 </div>
              </div>
              <div className="btn-ctn">
                 <div className="btn-transact">
                     <img src="../src/assets/transfert.svg" alt="" />
                 </div>
              </div>
             <div className="cvrt toward">
                 <label htmlFor="toward">towards</label>
                 <div className="contain-toward">
                 <img src={"https://flagcdn.com/48x36/"+country_code[indCountry].toLowerCase()+".png"} alt="flag" />
               <select id='toward' defaultValue={toCurrencyCountry} onChange={(e)=>setToCurrencyCountry(e.target.value)}>
                  {
                    Object.keys(country_list).map((currency_code, i)=>{
                        return (
                          <>
                          <option key={currency_code} value={currency_code} onClick={()=>{setIndCountry(i)}} >{currency_code}</option>
                          </>
                        );
                    })
                  }
               </select>
                 </div>
             </div>
       </div>
       <div className="convert-results">
         <div className="line1">1.00 United States Dollar = </div>
         <div className="line2">
           <span className="nb1">0.93</span>
           <span className="nb2">847853  </span>
           <span className="nb3">Euro</span>
         </div>
         <div className="line3">1 EUR = 1.06527 USD </div>
       </div>
       <div className="convert-actions">
         <div className="notify">
            <div className="notify-icon">
             <img src="../src/assets/infos.svg" alt="" />
            </div>
            <div className="notify-resume">
            We use the mid-market rate for our converter. 
            The rate is given for information purposes only. 
            You will not benefit from this rate when sending money.
            <a href='#' className='notify-link'> Check shipping rates.</a>
            </div>
         </div>
         <div className="validate-btn">
            <button>Convert</button>
         </div>
       </div>
      </form>
    </div>
  );
};

export default Convert;
