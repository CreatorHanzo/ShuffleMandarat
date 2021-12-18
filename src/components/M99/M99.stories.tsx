import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { M99, M99Props } from './M99'

export default {
    title: 'Component/9×9表示',
    component: M99,
} as Meta

const Template: Story<M99Props> = (args) => <M99 {...args} />

export const One = Template.bind({})
One.args = {}
