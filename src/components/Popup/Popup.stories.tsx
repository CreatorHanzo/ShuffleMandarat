import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Popup, PopupProps } from './Popup'

export default {
    title: 'Component/Popup',
    component: Popup,
} as Meta

const Template: Story<PopupProps> = (args) => <Popup {...args} />

export const Default = Template.bind({})
