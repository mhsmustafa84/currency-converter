import { useState, useEffect } from "react";
import Currency from "./Currency";
import ReverseIcon from "./ReverseIcon";
import "./App.css";

const BASE_URL = "https://free.currconv.com";
const API_KEY = "apiKey=65b88f35dcd432628875";



function App() {

    const [currenciesList, setCurrenciesList] = useState(null);
    const [value, setValue] = useState("");
    const [rate, setRate] = useState(0);
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [isMedium, setIsMedium] = useState(window.matchMedia("(max-width: 768px)").matches);

    useEffect(() => {

        fetch(`${BASE_URL}/api/v7/currencies?${API_KEY}`)
            .then((res) => res.json())
            .then((res) => {
                const data = res.results;
                const arr = [];
                for (const key in data) {
                    arr.push(data[key]);
                }
                setCurrenciesList(arr);
            })
            .catch((err) => console.error(err));

            fetch(`${BASE_URL}/others/usage?${API_KEY}`)
            .then((res) => res.json())
            .then((res) => {
                console.log("sasa >> .then >> res", res);
            })
            .catch((err) => console.error(err));
    }, []);

    useEffect(() => {
        console.log({ isMedium });
    }, [isMedium])

    useEffect(() => {

        if (value && from && to) {
            fetch(`${BASE_URL}/api/v7/convert?q=${from}_${to},${to}_${from}&compact=ultra&${API_KEY}`)
                .then((res) => res.json())
                .then((res) => {
                    setRate(res[`${from}_${to}`]);
                })
                .catch((err) => console.error(err));
        }

    }, [value, from, to]);

    const reverse = () => {
        setFrom(to);
        setTo(from);
    }

    return (
        <div className="App">
            <h1 className="text-3xl font-bold">Currency Converter App</h1>
            <div className={`flex ${isMedium ? "flex-col" : "flex-row"} gap-2 my-20`}>
                <div>
                    <p className="leading-10">Amount</p>
                    <input
                        type="text"
                        name="value"
                        value={value}
                        onChange={e => setValue(isNaN(e.target.value) ? 0 : +e.target.value)}
                        className="text-center focus:ring-indigo-500 focus:border-indigo-500 rounded-md border-gray-300 shadow-sm text-slate-900"
                        placeholder="0"
                    />
                </div>
                <div>
                    <p className="leading-10">From</p>
                    <Currency currenciesList={currenciesList} setCurrency={setFrom} currency={from} />
                </div>
                <div>
                    <button
                        className="border rounded p-2 shadow-md mt-10 custom-bg"
                        onClick={reverse}
                    >
                        <ReverseIcon />
                    </button>
                </div>
                <div>
                    <p className="leading-10">To</p>
                    <Currency currenciesList={currenciesList} setCurrency={setTo} currency={to} />
                </div>
            </div>
            <p className="border rounded shadow-md px-10 py-2 custom-bg w-96" >{value * rate} {to}</p>
            <div className="absolute left-10 top-10">
                <p>API free limit is 100 request per hour</p>
            </div>
        </div>
    );
}

export default App;
