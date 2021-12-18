import { CellModel } from './models/CellModel'

const allData: {
    initList: Array<CellModel>
    mList: { parent: CellModel; children: Array<CellModel> }
    randomList: Array<CellModel>
    m99list: Array<{ parent: CellModel; children: Array<CellModel> }>
    modal99: boolean
} = {
    initList: [],
    mList: {
        parent: { id: 0, text: '' },
        children: [],
    },
    randomList: [],
    m99list: [],
    modal99: false,
}

export const listReducer = (state = allData.initList, action: any) => {
    switch (action.type) {
        case 'CHANGE':
            return changeReduce(state, action)
        case 'ADD':
            return addReduce(state, action)
        case 'DELETE':
            return deleteReduce(state, action)
        default:
            return state
    }
}

export const changeReduce = (
    state: CellModel[],
    action: { type: string; list: CellModel[] }
) => {
    let children = action.list.slice()
    return children
}

export const addReduce = (
    state: CellModel[],
    action: { type: string; parentId: number; maxId: number }
) => {
    const topParent: CellModel = {
        parentId: action.parentId,
        id: action.maxId,
        text: 'New',
    }
    let newList = state.slice()
    newList.push(topParent)
    return newList
}

export const deleteReduce = (
    state: CellModel[],
    action: { type: any; list: CellModel[]; delIndex: number }
) => {
    let newList = action.list.slice()
    return newList
}

export const mListReducer = (state = allData.mList, action: any) => {
    switch (action.type) {
        case 'moveChild':
            return setMListReducer(state, action)
        case 'deleteChild':
            return deleteMListReducer(state, action)
        default:
            return state
    }
}

export const setMListReducer = (
    state: { parent: CellModel; children: Array<CellModel> },
    action: { type: string; parent: CellModel; children: CellModel[] }
) => {
    const parent = action.parent
    let children = action.children.slice()
    return { parent, children }
}

export const deleteMListReducer = (
    state: { parent: CellModel; children: Array<CellModel> },
    action: { type: any; delIndex: number }
) => {
    const parent = state.parent
    let children = state.children.slice()
    for (let i = 0; i < children.length; i++) {
        if (action.delIndex === children[i].id) {
            children.splice(i, 1)
        }
    }
    return { parent, children }
}

export const randomListReducer = (state = allData.randomList, action: any) => {
    switch (action.type) {
        case 'createRandomlist':
            return createRandomList(state, action)
        default:
            return state
    }
}

export const createRandomList = (
    state: CellModel[],
    action: { originList: Array<CellModel>; num: number }
) => {
    let randomList = []
    while (randomList.length < action.num && action.originList.length > 0) {
        const rand = Math.floor(Math.random() * action.originList.length)
        randomList.push(action.originList[rand])
        action.originList.splice(rand, 1)
    }
    return randomList
}

export const m99creator = (state = allData.m99list, action: any) => {
    switch (action.type) {
        case 'm99create':
            return create99(state, action)
        default:
            return state
    }
}

export const create99 = (
    state: Array<{ parent: CellModel; children: Array<CellModel> }>,
    action: {
        list99: Array<{ parent: CellModel; children: Array<CellModel> }>
    }
) => {
    let randomList = []
    randomList = [...action.list99]
    return randomList
}

export const modal99Reducer = (
    state = allData.modal99,
    action: { type: string }
) => {
    switch (action.type) {
        case 'modal99Show':
            return modal99Show(state, action)
        case 'modal99Colse':
            return modal99Close(state, action)
        default:
            return state
    }
}

export const modal99Show = (state: boolean, action: { type: string }) => {
    return true
}

export const modal99Close = (state: boolean, action: { type: string }) => {
    return false
}
