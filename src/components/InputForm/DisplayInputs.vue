<template>
    <div class="DisplayInputs">
        State: {{ userData.state }} <br/>
        Salary: {{ userData.salary }} <br/>
        Filing Status: {{ userData.filing_status }} <br/>
    </div>
</template>

<script>
    export default {
        props: {
            userData: Object
        },
    };
</script>
