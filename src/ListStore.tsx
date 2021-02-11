import { CellModel } from './models/CellModel'

const allData: {
    initList: Array<CellModel>
    mList: { parent: CellModel; children: Array<CellModel> }
    randomList: Array<CellModel>
} = {
    initList: [],
    mList: {
        parent: { id: 0, text: '' },
        children: [],
    },
    randomList: [],
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
        text: 'New Mandarat',
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
        // 配列からランダムな要素を選ぶ
        const rand = Math.floor(Math.random() * action.originList.length)
        // 選んだ要素を別の配列に登録する
        randomList.push(action.originList[rand])
        // もとの配列からは削除する
        action.originList.splice(rand, 1)
    }
    return randomList
}
