import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { PopupMenuButton, PopupMenuButtonProps } from './PopupMenuButton'

export default {
    title: 'Component/PopupMenuButton',
    component: PopupMenuButton,
} as Meta

const Template: Story<PopupMenuButtonProps> = (args) => (
    <PopupMenuButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
    list: [2, 3, 4, 5, 6, 7, 8, 9],
}
