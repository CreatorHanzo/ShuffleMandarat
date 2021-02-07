import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Mandarat, MandaratProps } from './Mandarat'
import { CellModel } from '../../models/CellModel'

export default {
    title: 'Component/普通のマンダラート',
    component: Mandarat,
} as Meta

const cellModel20: Array<CellModel> = [
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
    {
        id: 9,
        text: 'テキスト6',
    },
]

const Template: Story<MandaratProps> = (args) => <Mandarat {...args} />

export const One = Template.bind({})
// One.args = {
//     // yoso: cellModel20,
// }
