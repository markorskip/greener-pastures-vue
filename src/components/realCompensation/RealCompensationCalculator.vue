<template>
    <div class="salaryVsSelfEmployed">
        <b-card>
            <b-card-title>What is my real compensation?</b-card-title>
            <b-row class="my-1" v-for="item in form" :key="item.name">
                <b-col>
                    <label :for="`type-${item.name}`">{{ item.display }}:</label>
                </b-col>
                <b-col>
                    <b-form-input :id="`type-${item.name}`" v-model="item.value" :placeholder="item.placeholder"></b-form-input>
                </b-col>
            </b-row>
            <b-table-simple>
               <b-row>
                   <b-col>Current Salary</b-col>
                   <b-col>{{ display(salary) }}</b-col>
               </b-row>
                <b-row>
                    <b-col>Currently Hourly Before Employer Portion:</b-col>
                    <b-col>{{ display(currentHourly) }}</b-col>
                </b-row>
                <b-row>
                    <b-col>401k Contribution:</b-col>
                    <b-col>{{ display(comp) }}</b-col>
                </b-row>
                <b-row>
                    <b-col>Working Hours After Time Off:</b-col>
                    <b-col>{{ workingHours }}</b-col>
                </b-row>
                <b-row>
                    <b-col>Employer Paid FICA:</b-col>
                    <b-col>{{ display(employerFica) }}</b-col>
                </b-row>
                <b-row>
                    <b-col>Benefits Value:</b-col>
                    <b-col>{{ display(computeBenefits) }}</b-col>
                </b-row>
                <b-row>
                    <b-col>Other Expenses Paid By Employer:</b-col>
                    <b-col>{{ display(expenses) }}</b-col>
                </b-row>
                <h3>
                <b-row>

                    <b-col>Total Compensation:</b-col>
                    <b-col>{{ display(totalCompensation) }}</b-col>
                </b-row>
               <b-row variant="primary">

                   <b-col>Real Hourly Pay:</b-col>
                   <b-col>{{ display(realHourlyPay) }}</b-col>
               </b-row>
                </h3>
            </b-table-simple>
        </b-card>
    </div>
</template>

<script>
    import {thousandsSeparators} from "@/utilities/formattingUtilities";

    export default {
        data() {
            return {
                form: [
                    {display: 'Yearly Salary', name: 'salary', category: 'salary', value: null, placeholder: 'add in any compensation on paycheck (bonuses, etc..)' },
                    {display: '401k Match', name: 'comp', category: 'comp', value: null, placeholder: 'Amount you plan on receiving (usually full match)' },
                    {display: 'Days of Vacations and Sick', name: 'vacation_and_sick', category: 'paid_day', value: null, placeholder: 'If hours convert to days - 8 hours is one day' },
                    {display: '# of Paid Holidays', name: 'holidays', category: 'paid_day', value: null, placeholder: "Usually 10 - 12" },
                    {display: 'Yearly Value of Healthcare', name: 'healthcare', category: 'benefit', value: null, placeholder: 'Employer average for family is 12k'},
                    {display: 'Yearly other Benefits', name: 'other', category: 'benefit', value: null, placeholder: 'Life insurance, workers comp, disablity insurance, etc...' },
                    {display: 'Office and Equipment that benefit you', name: 'office', category: 'expense', value: null, placeholder: 'Employer paid cell phone, ergonomic equipment, etc....' },
                    {display: 'Education Expenses', name: 'education', category: 'expense', value: null, placeholder: 'Employer paid training that benefits your skillset' },
                    {display: 'Other', name: 'other2', category: 'benefit', value: null , placeholder: 'Paid lunches, annual retreats, any other benefit'},
                ]
            }
        },
        methods: {
            display(string) {
                return thousandsSeparators(string);
            },
            accumulate(category) {
                let result = 0;
                this.form.forEach(function(item) {
                    console.log(item);
                    if (item.category === category) {
                        result += (item.value * 1);
                    }
                });
                return result;
            }
        },
        computed: {
            salary() {
                return this.accumulate('salary')
            },
            computeBenefits() {
                return this.accumulate('benefit')
            },
            employerSocialSecurity() {
                let ficaSalary = this.salary;
                if (this.salary > 137700) ficaSalary = 137700;
                return ficaSalary * .062;
            },
            employerMedicare() {
                return this.salary * .0145;
            },
            employerFica() {
                return this.employerMedicare + this.employerSocialSecurity
            },
            expenses() {
                return this.accumulate('expense')
            },
            currentHourly() {
                return this.salary / 2080;
            },
            calculateTotalPaidDays() {
                return this.accumulate('paid_day')
            },
            comp() {
                return this.accumulate('comp')
            },
            totalCompensation() {
                return this.salary + this.employerFica + this.computeBenefits + this.expenses + this.comp;
            },
            workingHours() {
                let hours = this.calculateTotalPaidDays * 8;
                return 2080 - hours;
            },
            realHourlyPay() {
                return this.totalCompensation / this.workingHours;
            }
        }
    };
</script>
