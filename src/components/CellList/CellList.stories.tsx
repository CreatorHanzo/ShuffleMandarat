import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { CellList, CellListProps } from './CellList'
import { CellModel } from '../../models/CellModel'

export default {
    title: 'Component/CellList',
    component: CellList,
} as Meta

const cellModel: Array<CellModel> = [
    {
        id: 1,
        text: 'テキスト1',
    },
    {
        id: 2,
        text: 'テキスト2',
    },
    {
        id: 3,
        text: 'テキスト3',
    },
    {
        id: 4,
        text: 'テキスト4',
    },
    {
        id: 5,
        text: 'テキスト5',
    },
    {
        id: 6,
        text: 'テキスト6',
    },
]

const cellModel20: Array<CellModel> = [
    {
        id: 1,
        text: 'テキスト1',
    },
    {
        id: 2,
        text: 'テキスト2',
    },
    {
        id: 3,
        text: 'テキスト3',
    },
    {
        id: 4,
        text: 'テキスト4',
    },
    {
        id: 5,
        text: 'テキスト5',
    },
    {
        id: 6,
        text: 'テキスト6',
    },
]

const Template: Story<CellListProps> = (args) => <CellList {...args} />

// export const Default = Template.bind({})
// Default.args = {
//     list: cellModel,
// }

// export const Default20 = Template.bind({})
// Default20.args = {
//     list: cellModel20,
// }
