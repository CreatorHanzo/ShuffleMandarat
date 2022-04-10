import React, { useEffect } from 'react'
import { IonCol, IonGrid, IonRow } from '@ionic/react'
import './M99.scss'
import M33 from '../M33/M33'
import { useDispatch, useSelector } from 'react-redux'
import { CellModel } from '../../models/CellModel'
// import { Plugins } from '@capacitor/core'

// const { Storage } = Plugins
import { Storage } from '@capacitor/storage'

export interface M99Props {}
let list1: Array<CellModel> = []

export const M99: React.FC<M99Props> = () => {
    const counter = useSelector(
        (state: {
            mListReducer: { parent: CellModel; children: Array<CellModel> }
            m99creator: Array<{ parent: CellModel; children: Array<CellModel> }>
            modal99Reducer: boolean
        }) => state
    )
    const dispatch = useDispatch()

    useEffect(() => {
        initialize()
    })
    const initialize = async () => {
        const allCellStr = await Storage.get({ key: 'allCell' })
        if (JSON.parse(allCellStr.value!)) {
            list1 = JSON.parse(allCellStr.value!)
        }
    }

    const move33 = (moveIndex: number) => {
        let moveChildren: Array<CellModel> = []
        if (counter.mListReducer.children[moveIndex]) {
            list1.forEach((child) => {
                if (
                    child.parentId ===
                    counter.mListReducer.children[moveIndex]?.id
                ) {
                    moveChildren.push(child)
                }
            })
            dispatch({
                type: 'moveChild',
                parent: counter.mListReducer.children[moveIndex],
                children: moveChildren,
            })
            dispatch({
                type: 'modal99Colse',
            })
        }
    }

    return (
        <IonGrid className="grid99">
            <IonRow>
                <IonCol onClick={() => move33(0)}>
                    {(() => {
                        if (counter.mListReducer.children[0]) {
                            return <M33 yoso={counter.m99creator[0]} />
                        } else {
                            return <M33 yoso={undefined} />
                        }
                    })()}
                </IonCol>
                <IonCol onClick={() => move33(1)}>
                    {(() => {
                        if (counter.mListReducer.children[1]) {
                            return <M33 yoso={counter.m99creator[1]} />
                        } else {
                            return <M33 yoso={undefined} />
                        }
                    })()}
                </IonCol>
                <IonCol onClick={() => move33(2)}>
                    {(() => {
                        if (counter.mListReducer.children[2]) {
                            return <M33 yoso={counter.m99creator[2]} />
                        } else {
                            return <M33 yoso={undefined} />
                        }
                    })()}
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol onClick={() => move33(3)}>
                    {(() => {
                        if (counter.mListReducer.children[3]) {
                            return <M33 yoso={counter.m99creator[3]} />
                        } else {
                            return <M33 yoso={undefined} />
                        }
                    })()}
                </IonCol>
                <IonCol
                    onClick={() => {
                        dispatch({
                            type: 'modal99Colse',
                        })
                    }}
                >
                    {(() => {
                        if (counter.mListReducer.parent) {
                            return <M33 yoso={counter.mListReducer} />
                        } else {
                            return <M33 yoso={undefined} />
                        }
                    })()}
                </IonCol>
                <IonCol onClick={() => move33(4)}>
                    {(() => {
                        if (counter.mListReducer.children[4]) {
                            return <M33 yoso={counter.m99creator[4]} />
                        } else {
                            return <M33 yoso={undefined} />
                        }
                    })()}
                </IonCol>
            </IonRow>
            <IonRow>
                <IonCol onClick={() => move33(5)}>
                    {(() => {
                        if (counter.mListReducer.children[5]) {
                            return <M33 yoso={counter.m99creator[5]} />
                        } else {
                            return <M33 yoso={undefined} />
                        }
                    })()}
                </IonCol>
                <IonCol onClick={() => move33(6)}>
                    {(() => {
                        if (counter.mListReducer.children[6]) {
                            return <M33 yoso={counter.m99creator[6]} />
                        } else {
                            return <M33 yoso={undefined} />
                        }
                    })()}
                </IonCol>
                <IonCol onClick={() => move33(7)}>
                    {(() => {
                        if (counter.mListReducer.children[7]) {
                            return <M33 yoso={counter.m99creator[7]} />
                        } else {
                            return <M33 yoso={undefined} />
                        }
                    })()}
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}

export default M99
