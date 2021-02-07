import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { ListPage, ListPageProps } from './ListPage'
import { CellModel } from '../../models/CellModel'

export default {
    title: 'Pages/ListPage',
    component: ListPage,
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
        text: 'TExt',
    },
    {
        id: 5,
        text: 'TEXT',
    },
    {
        id: 6,
        text: 'Text',
    },
    {
        id: 7,
        text: 'text',
    },
    {
        id: 8,
        text: 'テキスト8',
    },
    {
        id: 9,
        text: 'テキスト9',
    },
    {
        id: 10,
        text: 'テキスト10',
    },
    {
        id: 11,
        text: 'テキスト11',
    },
    {
        id: 12,
        text: 'テキスト12',
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

const Template: Story<ListPageProps> = (args) => <ListPage {...args} />

export const Default = Template.bind({})
Default.args = {
    list: cellModel,
}

export const Default20 = Template.bind({})
Default20.args = {
    list: cellModel20,
}
