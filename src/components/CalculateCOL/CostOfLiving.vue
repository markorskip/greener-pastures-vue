<template>
    <div class="CalculateCOL">
        <br/>
        Total Cost of Living: {{ totalCol }}
        <br/>
    </div>
</template>

<script>
    export default {
        props: {
            totalCol: Number
        },
    };
</script>
