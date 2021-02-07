import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { CustomMandarat, CustomMandaratProps } from './CustomMandarat'
import { CellModel } from '../../models/CellModel'

export default {
    title: 'Component/CustomMandarat',
    component: CustomMandarat,
} as Meta

const yoso1: Array<CellModel> = [
    {
        id: 1,
        text: 'ああああああああああ',
    },
    {
        id: 2,
        text: 'あああああああああああああああああああああああああ',
    },
    {
        id: 3,
        text: 'ああああああああああああああああああああああああああああああ',
    },
    {
        id: 4,
        text:
            'ああああああああああああああああああああああああああああああああああああああああ',
    },
    {
        id: 5,
        text:
            'あああああああああああああああああああああああああああああああああああ',
    },
    {
        id: 6,
        text: 'テキスト6',
    },
]

const yoso2: Array<CellModel> = [
    {
        id: 1,
        text: 'テキスト1いいいいいいいいいいいいい',
    },
    {
        id: 2,
        text: 'テキスト2いいいいいいいいいいいいい',
    },
    {
        id: 3,
        text: 'テキスト3んんんんん',
    },
    {
        id: 4,
        text: 'テキスト4',
    },
    {
        id: 5,
        text: 'テキスト5おおおおおおおおおおおおおお',
    },
    {
        id: 6,
        text: 'テキスト6',
    },
    {
        id: 7,
        text: 'テキスト6',
    },
    {
        id: 8,
        text: 'テキスト6',
    },
]

const parent = { id: 0, text: '親' }

const Template: Story<CustomMandaratProps> = (args) => (
    <CustomMandarat {...args} />
)

export const Default = Template.bind({})
Default.args = {
    yoso: yoso1,
}

export const Default20 = Template.bind({})
Default20.args = {
    yoso: yoso2,
}
