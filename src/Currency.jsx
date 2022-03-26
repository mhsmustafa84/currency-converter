import React from "react"

function Currency({ currenciesList, setCurrency, currency }) {
    return (
        <div>
            <select
                name="currency"
                className="focus:ring-indigo-500 focus:border-indigo-500 text-gray-500 rounded-md shadow-md"
                onChange={e => setCurrency(e.target.value)}
                value={currency}
            >
                <option>Select</option>
                {
                    currenciesList &&
                    currenciesList.map(currency => (
                        <option key={currency.id} value={currency.id}>
                            {currency.currencySymbol} {currency.id} - {currency.currencyName}
                        </option>
                    ))
                }
            </select>
        </div>
    );
}

export default Currency;
