import { shallowMount } from '@vue/test-utils'
import OpportunityForm from "@/components/OpportunityForm";

describe('OpportunityForm', () => {
    it('should render to a snapshot when list is empty', () => {
        const propsData = { todos: [] }
        const wrapper = shallowMount(OpportunityForm, { propsData })
        expect(wrapper.element).toMatchSnapshot()
    })

    it('should render to a snapshot when list has items', () => {
        const propsData = { todos: [{ id: 1, text: 'Todo #1' }] }
        const wrapper = shallowMount(OpportunityForm, { propsData })
        expect(wrapper.element).toMatchSnapshot()
    })
})
