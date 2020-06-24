<template>
    <div class="Display">
        <br/>
       <b> Take Home Pay: {{ takeHomePay }}</b>
        <br/>
    </div>
</template>

<script>
    export default {
        props: {
            salary: Number,
            totalTax: Number,
            totalCol: Number
        },
        computed: {
            takeHomePay() {
                const netPay = this.salary - this.totalTax - this.totalCol;
                if (isNaN(netPay)) return ''
                else return netPay;
            }
        }
    }
</script>
