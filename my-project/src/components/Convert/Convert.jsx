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
  const [exchangeRate, setExchangeRate] = useState(0);
  const [totalExRate, setTotalExRate] = useState(0);
  const [exchangeRate2, setExchangeRate2] = useState(0);
  const [totalExRate2, setTotalExRate2] = useState(0);


  const onSubmitHandler = async(e) => {
    e.preventDefault();
    getExchangeRate();
  }

  const  getExchangeRate = () =>{
   // const exchangeRateTxt = document.querySelector("form .convert-results");
   // exchangeRateTxt.innerText = "Getting exchange rate...";

    let url1 = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${OfCurrencyCountry}`;
    let url2 = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${toCurrencyCountry}`;

  /*  axios
      .get(url1)
      .then((res) => {
        console.log("u++++++++++",res.data);
        console.log("u++++++++++",res.data.conversion_rates[toCurrencyCountry]);
        setExchangeRate(res.data.conversion_rates[toCurrencyCountry]); // taux de change
        setTotalExRate((amount * exchangeRate));
      })
      .catch((err) => {
       // exchangeRateTxt.innerText = "Something went wrong";
        console.log(err);
      }); */


      axios.all([
        axios.get(url1), 
        axios.get(url2)
      ])
      .then(axios.spread((res1, res2) => {
         console.log("u1",res1.data);
        // console.log("u1",res1.data.conversion_rates[toCurrencyCountry]);
           setExchangeRate(res1.data.conversion_rates[toCurrencyCountry]); // taux de change
           setTotalExRate((amount * res1.data.conversion_rates[toCurrencyCountry]));
           console.log('444', totalExRate);
         console.log("u2",res2.data);
       //  console.log("u2",res2.data.conversion_rates[OfCurrencyCountry]);
          setExchangeRate2(res2.data.conversion_rates[OfCurrencyCountry]); // taux de change
          setTotalExRate2((amount * res2.data.conversion_rates[OfCurrencyCountry]));
      })) .catch((err1, err2) => {
         console.log(err1);
         console.log(err2);
       });;
  }




  return (
    <div className="Convert">
      <form onSubmit={onSubmitHandler}>
       <div className="convert-inputs flex">
             <div className="cvrt amount">
                 <label htmlFor="amount">Amount</label>
                 <input id='amount' type="number" value={amount} onChange={(e)=>setAmount(e.target.value)}/>
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
         <div className="line1">{amount} {OfCurrencyCountry} = </div>
         <div className="line2">
           <span className="nb1">{totalExRate.toFixed(8).toString().split('.')[0]}.</span>
           <span className="nb2">{totalExRate.toFixed(8).toString().split('.')[1]}  </span>
           <span className="nb3">{toCurrencyCountry}</span>
         </div>
         <div className="line3">{amount} {toCurrencyCountry} =  {totalExRate2.toFixed(8)} {OfCurrencyCountry} </div>
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
