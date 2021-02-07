import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Cell, CellProps } from './Cell'

export default {
    title: 'Component/Cell',
    component: Cell,
} as Meta

const Template: Story<CellProps> = (args) => <Cell {...args} />

export const One = Template.bind({})
One.args = {
    text: 'Default',
}
