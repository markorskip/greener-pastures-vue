<template>
    <div class="CalculateCOL">
        <br/>
        A dollar in {{ state }} is worth {{ this.multiplier }}<br/><br/>
        Your after tax pay is worth: <br/>
        <h1><b> {{ this.afterTaxWorth }}</b></h1>
        <br/>
    </div>
</template>

<script>


    // https://www.patriotsoftware.com/blog/accounting/average-cost-living-by-state/
    import {thousandsSeparators} from "currency-thousand-separator";

    let colMapping = {
        "AL":"1.1",
        "AK":"0.9",
        "AZ":"1.0",
        "AR":"1.1",
        "CA":"0.8",
        "CO":"0.97",
        "CT":"0.92",
        "DE":"1.00",
        "FL":"1.00",
        "GA":"1.09",
        "HI":"0.84",
        "ID":"1.08",
        "IL":"1.01",
        "IN":"1.11",
        "IA":"1.11",
        "KS":"1.10",
        "KY":"1.14",
        "LA":"1.11",
        "ME":"1.02",
        "MD":"0.91",
        "MA":"0.93",
        "MI":"1.07",
        "MN":"1.03",
        "MS":"1.16",
        "MO":"1.12",
        "MT":"1.06",
        "NE":"1.10",
        "NV":"1.03",
        "NH":"0.94",
        "NJ":"0.88",
        "NM":"1.07",
        "NY":"0.87",
        "NC":"1.10",
        "ND":"1.09",
        "OH":"1.12",
        "OK":"1.12",
        "OR":"1.00",
        "PA":"1.02",
        "RI":"1.00",
        "SC":"1.11",
        "SD":"1.13",
        "TN":"1.11",
        "TX":"1.03",
        "UT":"1.03",
        "VT":"0.98",
        "VA":"0.98",
        "WA":"0.95",
        "WV":"1.14",
        "WI":"1.08",
        "WY":"1.03"

    };

    export default {
        props: {
            state: String,
            afterTaxIncome: Number,
        },
        computed: {
            multiplier: function() {
                return colMapping[this.state];
            },
            afterTaxWorth: function() {
                const afterTax = (this.afterTaxIncome * this.multiplier).toFixed(2);
                if (isNaN(afterTax))  return null;
                else return "$" + thousandsSeparators(afterTax);
            }
        }
    };
</script>
