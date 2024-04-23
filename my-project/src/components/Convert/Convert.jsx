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
  const [status1, setStatus1] = useState(false);
  const [status2, setStatus2] = useState(false);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");
  const select1 = document.querySelector("form select#of");
  const select2 = document.querySelector("form select#toward");


  const onSubmitHandler = async(e) => {
    e.preventDefault();
    getExchangeRate();
  }

  const toggleExchangeRate = () =>{
    console.log('test');
     const lastToCurrencyCountry = toCurrencyCountry;
    // console.log(lastToCurrencyCountry);
     const lastOfCurrencyCountry = OfCurrencyCountry;
   //  console.log(lastOfCurrencyCountry);
    // setOfCurrencyCountry(lastToCurrencyCountry);
   
    select1.value === lastToCurrencyCountry ?  select1.value == lastOfCurrencyCountry :  select1.value == lastToCurrencyCountry;
    select2.value === lastToCurrencyCountry ?  select2.value == lastOfCurrencyCountry : select2.value == lastToCurrencyCountry;
   //  setToCurrencyCountry(lastOfCurrencyCountry);
    //select2.value = lastOfCurrencyCountry;
  }


  

  useEffect(() => {
    let url1 = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${OfCurrencyCountry}`;
    let url2 = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${toCurrencyCountry}`;

    axios.all([
      axios.get(url1), 
      axios.get(url2)
    ])
    .then(axios.spread((res1, res2) => {
       console.log("u1",res1.data);
      // console.log("u1",res1.data.conversion_rates[toCurrencyCountry]);
         setExchangeRate(res1.data.conversion_rates[toCurrencyCountry]); // taux de change
         setTotalExRate((amount * res1.data.conversion_rates[toCurrencyCountry]));
         setStatus1(true);
       console.log("u2",res2.data);
     //  console.log("u2",res2.data.conversion_rates[OfCurrencyCountry]);
        setExchangeRate2(res2.data.conversion_rates[OfCurrencyCountry]); // taux de change
        setTotalExRate2((amount * res2.data.conversion_rates[OfCurrencyCountry]));
        setStatus2(true);
    })) .catch((err1, err2) => {
       console.log(err1.message);
       setError1(err1.message || 'error')
       console.log(err2);
       setError2(err2.message || 'error')
     });;
  }, []);


  const  getExchangeRate = () =>{
   
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
           setStatus1(true);
         console.log("u2",res2.data);
       //  console.log("u2",res2.data.conversion_rates[OfCurrencyCountry]);
          setExchangeRate2(res2.data.conversion_rates[OfCurrencyCountry]); // taux de change
          setTotalExRate2((amount * res2.data.conversion_rates[OfCurrencyCountry]));
          setStatus2(true);
      })) .catch((err1, err2) => {
         console.log(err1.message);
         setError1(err1.message || 'error')
         console.log(err2);
         setError2(err2.message || 'error')
       });;
  }




  return (
    <div className="Convert">
      <form onSubmit={onSubmitHandler}>
       <div className="convert-inputs flex">
             <div className="cvrt amount">
                 <label htmlFor="amount">Amount</label>
                 <input id='amount' type="text" value={amount} onChange={(e)=>setAmount(e.target.value, 10)}/>
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
                 <div className="btn-transact" onClick={()=>{toggleExchangeRate()}}>
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
       {
        status1 === true ?
        <div className="convert-results">
           <div className="line1">{amount} {OfCurrencyCountry} = </div>
           <div className="line2">
           <span className="nb1">{totalExRate.toFixed(8).toString().split('.')[0]},</span>
           <span className="nb2">{totalExRate.toFixed(8).toString().split('.')[1]}  </span>
           <span className="nb3">{toCurrencyCountry}</span>
           </div>
            { status2 === true ? 
              <div className="line3">{amount} {toCurrencyCountry} =  {totalExRate2.toFixed(8)} {OfCurrencyCountry} </div>
              : null
            }
         </div> 
          : null
       }
       {
        error1 ? 
        <div className="convert-results">
           <div className="error">Something went wrong! please retry</div>
        </div> : null
       }
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
