import { calculatePayAfterCostOfLiving, findValueOfADollarByState, displayMedianRentByState }from '@/utilities/costOfLiving.js';

describe("Cost of Living Service", function() {

    it("calculates the right cost of living for Florida", function () {
        let state = 'FL';
        let afterTaxIncome = "100000";
        let adjPay = calculatePayAfterCostOfLiving(state, afterTaxIncome);
        expect(adjPay).toBe("100000.00");
    }),
    it("Calculates the correct value of a dollar", function () {
        let state = 'CA';
        let valueOfDollar = findValueOfADollarByState(state);
        expect(valueOfDollar).toBe("0.8");
    }),
    it("Calculates the correct rent by state", function () {
        let state = "CA";
        let adjPay = displayMedianRentByState(state);
        expect(adjPay).toBe("$2,518");
    })
});
