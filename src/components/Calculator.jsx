'use client'

import Example from "@/components/inputs/option";
import MyInput from "@/components/inputs/input";
import {useEffect, useState, useMemo, useCallback} from "react";

const Calculator = ({rates}) => {

    const toman = {
        "date": "1404/03/20",
        "time": "03:01",
        "time_unix": 1749511860,
        "symbol": "IRR",
        "name_en": "Toman",
        "name": "تومان",
        "price": 1,
        "change_value": -388,
        "change_percent": -0.47,
        "unit": "IRR"
    }
    const defaultDollar = rates.find(r => r.symbol === 'USD') || rates[0]

    const [fromRate, setFromRate] = useState(defaultDollar)  // ← USD
    const [toRate,   setToRate]   = useState(toman)
    const [amount,   setAmount]   = useState(1)



    const handleSwap = useCallback(() => {
        setFromRate(toRate)
        setToRate(fromRate)
    }, [fromRate, toRate])

    const ratio = useMemo(() => {
        if (toRate.symbol === 'IRR') return fromRate.price
        if (fromRate.symbol === 'IRR') return 1 / toRate.price
        return fromRate.price / toRate.price
    }, [fromRate, toRate])

    useEffect(() => {
        console.log(fromRate,toRate)
    }, []);

    const numericAmount = useMemo(() => {
        // رشته را از کاما خالی کن تا همیشه یک عدد خالص بماند
        const cleaned = String(amount).replace(/,/g, '');
        return Number(cleaned) || 0;
    }, [amount]);

    const converted = useMemo(() => numericAmount * ratio, [numericAmount, ratio]);

    return (
        <div className="App">
            <div className="calc">
                <h1>
                    تبدیل واحد دلار به ریال
                </h1>
                <div className="InputContainer">
                    <div className="firstInputContainer">
                        <Example rates={rates} value={fromRate} onChange={setFromRate} toman={toman}/>
                        <MyInput
                            placeholder="مقدار"
                            className="firstInput"
                            value={numericAmount}
                            onValueChange={setAmount}
                            ratio={ratio}
                        />
                    </div>
                    <div className="secInputContainer">
                        <Example rates={rates} value={toRate} onChange={setToRate} toman={toman} numberOfSelected={-1}/>
                        <MyInput
                            placeholder="معادل"
                            className="secInput"
                            readOnly
                            ratio={ratio}
                            value={numericAmount}
                        />
                    </div>
                    <button className="InputChanger" onClick={handleSwap}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-arrow-down-up" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5m-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </button>
                </div>
                <div className="resultContainer">
                    <h2>
                        {`هر ${amount} دلار آمریکا معادل ${amount * ratio} تومان`}
                    </h2>
                    <div className="firstResultContainer">

                    </div>
                    <div className="secResultContainer">

                    </div>
                </div>
            </div>
        </div>
    );
}
export default Calculator;