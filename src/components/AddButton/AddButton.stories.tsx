import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { AddButton, AddButtonProps } from './AddButton'

export default {
    title: 'Component/AddButton',
    component: AddButton,
} as Meta

const Template: Story<AddButtonProps> = (args) => <AddButton {...args} />

export const Default = Template.bind({})
