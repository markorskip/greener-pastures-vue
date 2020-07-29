<template>
    <div>
        <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
                    id="input-group-1"
                    label="Email address:"
                    label-for="input-1"
                    description="We'll never share your email with anyone else."
            >
                <b-form-input
                        id="input-1"
                        v-model="emailAddress"
                        type="email"
                        required
                        placeholder="Enter email"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="First Name:" label-for="input-2">
                <b-form-input
                        id="input-2"
                        v-model="firstName"
                        placeholder="First Name"
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Last Name:" label-for="input-2">
                <b-form-input
                        id="input-3"
                        v-model="lastName"
                        placeholder="Last Name"
                ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
    </div>
</template>

<script>


    import axios from "axios";

    export default {
        data() {
            return {
                emailAddress: '',
                firstName: '',
                lastName: ''
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                axios({
                    method: 'post',
                    headers: {
                        'Access-Control-Allow-Origin':'*'
                    },
                    data: {
                        emailAddress: this.emailAddress,
                        firstName: this.firstName,
                        lastName: this.lastName
                    },
                    url: "https://best-opportunity.heorkuiapp.com/subscribe" // TODO make this a property depending on where it is deployed
                })
                    .then(response => {
                        console.log(response)
                        if (response.data.emailAddress != null) {
                            alert("Thank you for subscribing!");
                            this.onReset(evt);
                        }
                    })
                    .catch( e => console.log(e))
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.emailAddress = ''
                this.firstName = ''
                this.lastName = ''
            }
        }
    }
</script>
