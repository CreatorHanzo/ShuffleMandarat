import {
    IonAlert,
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonIcon,
    IonModal,
    IonRow,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import React, { useEffect, useState } from 'react'
import './Mandarat.scss'
import { CellModel } from '../../models/CellModel'
import { Plugins } from '@capacitor/core'
import { useDispatch, useSelector } from 'react-redux'
import { Popver } from '../Popver/Popver'
import { ChildPopover } from '../Popver/ChildPopover'
import { Popup } from '../Popup/Popup'
import { add, chevronBack, chevronForward } from 'ionicons/icons'
import { M99 } from '../M99/M99'

const { Storage } = Plugins
let list1: Array<CellModel> = []

export interface MandaratProps {}

export const Mandarat: React.FC<MandaratProps> = () => {
    const [popoverState, setShowPopover] = useState({
        showPopover: false,
        event: undefined,
    })
    const [childPopoverState, setChildShowPopover] = useState({
        showPopover: false,
        event: undefined,
    })
    const [selectedId, setSelecterId] = useState<number>()
    const [moveChild, setmoveChild] = useState<CellModel>()
    const [popup, setPopup] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [name, setName] = useState('')
    const [index, setIndex] = useState(0)
    const [list, setList] = useState<Array<CellModel>>([])
    const counter = useSelector(
        (state: {
            mListReducer: { parent: CellModel; children: Array<CellModel> }
            m99creator: Array<{ parent: CellModel; children: Array<CellModel> }>
            modal99Reducer: boolean
        }) => state
    )
    const dispatch = useDispatch()

    useEffect(() => {
        console.log(list)
        initialize()
    })
    const initialize = async () => {
        const allCellStr = await Storage.get({ key: 'allCell' })
        if (JSON.parse(allCellStr.value!)) {
            list1 = JSON.parse(allCellStr.value!)
        }
    }

    const addChild = async () => {
        // 現状のmaxId+1を設定する
        const maxIdStr = await Storage.get({ key: 'maxId' })
        let maxId = 1
        if (JSON.parse(maxIdStr.value!)) {
            maxId = JSON.parse(maxIdStr.value!) + 1
        }
        await Storage.set({
            key: 'maxId',
            value: JSON.stringify(maxId),
        })

        dispatch({
            type: 'ADD',
            parentId: counter.mListReducer.parent.id,
            maxId: maxId,
        })
        // 追加ボタンが押されたときに、トップレベルの親を作成
        const topParent: CellModel = {
            parentId: counter.mListReducer.parent.id,
            id: maxId,
            text: '',
        }
        list1.push(topParent)
        await Storage.set({
            key: 'allCell',
            value: JSON.stringify(list1),
        })
        let children1: Array<CellModel> = []
        list1.forEach((child) => {
            if (child.parentId === counter.mListReducer.parent.id) {
                children1.push(child)
            }
        })
        // カスタムマンダラートで表示する要素を更新
        // これがないと、値を編集しても画面が更新されない
        dispatch({
            type: 'moveChild',
            parent: counter.mListReducer.parent,
            children: children1,
        })
    }

    const deleteChild = async (deleteId: number | undefined) => {
        dispatch({
            type: 'DELETE',
            list: list1,
            delIndex: deleteId,
        })
        for (let i = list1.length - 1; i >= 0; i--) {
            if (deleteId === list1[i].parentId) {
                await deleteChild(list1[i].id)
                list1.splice(i, 1)
            }
        }
        await Storage.set({
            key: 'allCell',
            value: JSON.stringify(list1),
        })
        setList(list1)
    }
    const editChild = async () => {
        await Storage.set({
            key: 'allCell',
            value: JSON.stringify(list1),
        })
        let editedChildren: CellModel[] = []
        let editedParent!: CellModel

        list1.forEach((child) => {
            if (child.parentId === counter.mListReducer.parent.id) {
                editedChildren.push(child)
            } else if (child.id === counter.mListReducer.parent.id) {
                editedParent = child
            }
        })

        // カスタムマンダラートで表示する要素を更新
        // これがないと、値を編集しても画面が更新されない
        dispatch({
            type: 'moveChild',
            parent: editedParent,
            children: editedChildren,
        })
        setChildShowPopover({
            showPopover: false,
            event: undefined,
        })
        setShowPopover({
            showPopover: false,
            event: undefined,
        })
    }
    const moveParent = () => {
        let moveChildren: Array<CellModel> = []
        list1.forEach((child) => {
            if (child.parentId === moveChild?.id) {
                moveChildren.push(child)
            }
        })
        dispatch({
            type: 'moveChild',
            parent: moveChild,
            children: moveChildren,
        })
    }
    return (
        <IonContent className="mandarat-content">
            <IonToolbar className="mardarat-toolbar" mode="ios">
                <IonTitle>Mandarat</IonTitle>
            </IonToolbar>
            <IonButton
                fill="clear"
                expand="full"
                onClick={() => {
                    let list99: Array<{
                        parent: CellModel
                        children: Array<CellModel>
                    }> = []
                    for (let i = 0; i < 8; i++) {
                        if (counter.mListReducer.children[i]) {
                            let children1: Array<CellModel> = []
                            list1.forEach((child) => {
                                if (
                                    child.parentId ===
                                    counter.mListReducer.children[i].id
                                ) {
                                    children1.push(child)
                                }
                            })
                            list99.push({
                                parent: counter.mListReducer.children[i],
                                children: children1,
                            })
                        } else {
                            list99.push()
                        }
                    }
                    console.log(counter.modal99Reducer)
                    dispatch({ type: 'm99create', list99: list99 })
                    dispatch({
                        type: 'modal99Show',
                    })
                }}
            >
                <IonIcon slot="end" icon={chevronForward} />9 × 9
            </IonButton>
            <IonModal
                isOpen={counter.modal99Reducer}
                onDidDismiss={() => {
                    dispatch({
                        type: 'modal99Colse',
                    })
                }}
            >
                <IonButton
                    fill="clear"
                    onClick={() =>
                        dispatch({
                            type: 'modal99Colse',
                        })
                    }
                >
                    <IonIcon slot="start" icon={chevronBack} />3 × 3
                </IonButton>
                <M99 />
            </IonModal>
            <IonGrid className="mandarat-grid ion-no-padding">
                <IonRow className="ion-no-padding">
                    {(() => {
                        if (counter.mListReducer.children[0]) {
                            return (
                                <IonCol
                                    id="animated-example1"
                                    className="animated text-col"
                                    key={0}
                                    onClick={(e: any) => {
                                        setSelecterId(
                                            counter.mListReducer.children[0].id
                                        )
                                        setmoveChild(
                                            counter.mListReducer.children[0]
                                        )
                                        setName(
                                            counter.mListReducer.children[0]
                                                .text
                                        )
                                        list1.forEach((value, i) => {
                                            if (
                                                value.id ===
                                                counter.mListReducer.children[0]
                                                    .id
                                            ) {
                                                setIndex(i)
                                            }
                                        })
                                        e.persist()
                                        setChildShowPopover({
                                            showPopover: true,
                                            event: e,
                                        })
                                    }}
                                >
                                    {counter.mListReducer.children[0].text}
                                </IonCol>
                            )
                        } else {
                            return (
                                <IonCol
                                    id="animated-example1"
                                    className="animated"
                                    key={0}
                                ></IonCol>
                            )
                        }
                    })()}
                    {(() => {
                        if (counter.mListReducer.children[1]) {
                            return (
                                <IonCol
                                    id="animated-example2"
                                    className="animated text-col"
                                    key={1}
                                    onClick={(e: any) => {
                                        setSelecterId(
                                            counter.mListReducer.children[1].id
                                        )
                                        setmoveChild(
                                            counter.mListReducer.children[1]
                                        )
                                        setName(
                                            counter.mListReducer.children[1]
                                                .text
                                        )
                                        list1.forEach((value, i) => {
                                            if (
                                                value.id ===
                                                counter.mListReducer.children[1]
                                                    .id
                                            ) {
                                                setIndex(i)
                                            }
                                        })
                                        e.persist()
                                        setChildShowPopover({
                                            showPopover: true,
                                            event: e,
                                        })
                                    }}
                                >
                                    {counter.mListReducer.children[1].text}
                                </IonCol>
                            )
                        } else {
                            return (
                                <IonCol
                                    id="animated-example2"
                                    className="animated"
                                    key={1}
                                ></IonCol>
                            )
                        }
                    })()}
                    {(() => {
                        if (counter.mListReducer.children[2]) {
                            return (
                                <IonCol
                                    id="animated-example"
                                    className="animated text-col"
                                    key={2}
                                    onClick={(e: any) => {
                                        setSelecterId(
                                            counter.mListReducer.children[2].id
                                        )
                                        setmoveChild(
                                            counter.mListReducer.children[2]
                                        )

                                        setName(
                                            counter.mListReducer.children[2]
                                                .text
                                        )
                                        list1.forEach((value, i) => {
                                            if (
                                                value.id ===
                                                counter.mListReducer.children[2]
                                                    .id
                                            ) {
                                                setIndex(i)
                                            }
                                        })
                                        e.persist()
                                        setChildShowPopover({
                                            showPopover: true,
                                            event: e,
                                        })
                                    }}
                                >
                                    {counter.mListReducer.children[2].text}
                                </IonCol>
                            )
                        } else {
                            return (
                                <IonCol
                                    id="animated-example3"
                                    className="animated3"
                                    key={2}
                                ></IonCol>
                            )
                        }
                    })()}
                </IonRow>
                <IonRow className="ion-no-padding">
                    {(() => {
                        if (counter.mListReducer.children[3]) {
                            return (
                                <IonCol
                                    id="animated-example4"
                                    className="animated text-col"
                                    key={3}
                                    onClick={(e: any) => {
                                        setSelecterId(
                                            counter.mListReducer.children[3].id
                                        )
                                        setmoveChild(
                                            counter.mListReducer.children[3]
                                        )

                                        setName(
                                            counter.mListReducer.children[3]
                                                .text
                                        )
                                        list1.forEach((value, i) => {
                                            if (
                                                value.id ===
                                                counter.mListReducer.children[3]
                                                    .id
                                            ) {
                                                setIndex(i)
                                            }
                                        })
                                        e.persist()
                                        setChildShowPopover({
                                            showPopover: true,
                                            event: e,
                                        })
                                    }}
                                >
                                    {counter.mListReducer.children[3].text}
                                </IonCol>
                            )
                        } else {
                            return (
                                <IonCol
                                    id="animated-example4"
                                    className="animated"
                                    key={3}
                                ></IonCol>
                            )
                        }
                    })()}
                    <IonCol
                        id="animated-example5"
                        className="animated parent-col"
                        key={10}
                        onClick={(e: any) => {
                            let parent
                            list1.forEach((child) => {
                                if (
                                    child.id ===
                                    counter.mListReducer.parent?.parentId
                                ) {
                                    parent = child
                                }
                            })
                            setSelecterId(counter.mListReducer.parent.id)
                            setName(counter.mListReducer.parent.text)
                            list1.forEach((value, i) => {
                                if (
                                    value.id === counter.mListReducer.parent.id
                                ) {
                                    setIndex(i)
                                }
                            })
                            setmoveChild(parent)
                            e.persist()
                            setShowPopover({ showPopover: true, event: e })
                        }}
                    >
                        {counter.mListReducer.parent.text}
                    </IonCol>
                    <Popver
                        parentId={counter.mListReducer.parent.parentId}
                        event={popoverState.event}
                        isOpen={popoverState.showPopover}
                        setShowPopover={() => {
                            setShowPopover({
                                showPopover: false,
                                event: undefined,
                            })
                        }}
                        moveParent={() => {
                            moveParent()
                            setShowPopover({
                                showPopover: false,
                                event: undefined,
                            })
                        }}
                        editParent={() => {
                            setShowAlert(true)
                        }}
                    />
                    {(() => {
                        if (counter.mListReducer.children[4]) {
                            return (
                                <IonCol
                                    id="animated-example"
                                    className="animated6 text-col"
                                    key={4}
                                    onClick={(e: any) => {
                                        setSelecterId(
                                            counter.mListReducer.children[4].id
                                        )
                                        setmoveChild(
                                            counter.mListReducer.children[4]
                                        )

                                        setName(
                                            counter.mListReducer.children[4]
                                                .text
                                        )
                                        list1.forEach((value, i) => {
                                            if (
                                                value.id ===
                                                counter.mListReducer.children[4]
                                                    .id
                                            ) {
                                                setIndex(i)
                                            }
                                        })
                                        e.persist()
                                        setChildShowPopover({
                                            showPopover: true,
                                            event: e,
                                        })
                                    }}
                                >
                                    {counter.mListReducer.children[4].text}
                                </IonCol>
                            )
                        } else {
                            return (
                                <IonCol
                                    id="animated-example6"
                                    className="animated"
                                    key={4}
                                ></IonCol>
                            )
                        }
                    })()}
                </IonRow>
                <IonRow className="ion-no-padding">
                    {(() => {
                        if (counter.mListReducer.children[5]) {
                            return (
                                <IonCol
                                    id="animated-example7"
                                    className="animated text-col"
                                    key={5}
                                    onClick={(e: any) => {
                                        setSelecterId(
                                            counter.mListReducer.children[5].id
                                        )
                                        setmoveChild(
                                            counter.mListReducer.children[5]
                                        )

                                        setName(
                                            counter.mListReducer.children[5]
                                                .text
                                        )
                                        list1.forEach((value, i) => {
                                            if (
                                                value.id ===
                                                counter.mListReducer.children[5]
                                                    .id
                                            ) {
                                                setIndex(i)
                                            }
                                        })
                                        e.persist()
                                        setChildShowPopover({
                                            showPopover: true,
                                            event: e,
                                        })
                                    }}
                                >
                                    {counter.mListReducer.children[5].text}
                                </IonCol>
                            )
                        } else {
                            return (
                                <IonCol
                                    id="animated-example7"
                                    className="animated"
                                    key={5}
                                ></IonCol>
                            )
                        }
                    })()}
                    {(() => {
                        if (counter.mListReducer.children[6]) {
                            return (
                                <IonCol
                                    id="animated-example8"
                                    className="animated text-col"
                                    key={6}
                                    onClick={(e: any) => {
                                        setSelecterId(
                                            counter.mListReducer.children[6].id
                                        )
                                        setmoveChild(
                                            counter.mListReducer.children[6]
                                        )

                                        setName(
                                            counter.mListReducer.children[6]
                                                .text
                                        )
                                        list1.forEach((value, i) => {
                                            if (
                                                value.id ===
                                                counter.mListReducer.children[6]
                                                    .id
                                            ) {
                                                setIndex(i)
                                            }
                                        })
                                        e.persist()
                                        setChildShowPopover({
                                            showPopover: true,
                                            event: e,
                                        })
                                    }}
                                >
                                    {counter.mListReducer.children[6].text}
                                </IonCol>
                            )
                        } else {
                            return (
                                <IonCol
                                    id="animated-example8"
                                    className="animated"
                                    key={6}
                                ></IonCol>
                            )
                        }
                    })()}
                    {(() => {
                        if (counter.mListReducer.children[7]) {
                            return (
                                <IonCol
                                    id="animated-example"
                                    className="animated text-col"
                                    key={7}
                                    onClick={(e: any) => {
                                        setSelecterId(
                                            counter.mListReducer.children[7].id
                                        )
                                        setmoveChild(
                                            counter.mListReducer.children[7]
                                        )
                                        setName(
                                            counter.mListReducer.children[7]
                                                .text
                                        )
                                        list1.forEach((value, i) => {
                                            if (
                                                value.id ===
                                                counter.mListReducer.children[7]
                                                    .id
                                            ) {
                                                setIndex(i)
                                            }
                                        })
                                        e.persist()
                                        setChildShowPopover({
                                            showPopover: true,
                                            event: e,
                                        })
                                    }}
                                >
                                    {counter.mListReducer.children[7].text}
                                </IonCol>
                            )
                        } else {
                            return (
                                <IonCol
                                    id="animated-example9"
                                    className="animated"
                                    key={7}
                                ></IonCol>
                            )
                        }
                    })()}
                </IonRow>

                <ChildPopover
                    event={childPopoverState.event}
                    isOpen={childPopoverState.showPopover}
                    setShowPopover={() => {
                        setChildShowPopover({
                            showPopover: false,
                            event: undefined,
                        })
                    }}
                    moveChild={() => {
                        for (let i = 1; i <= 8; i++) {
                            // const ae = document.getElementById(`animated-example${i}`);
                            document
                                .getElementById(`animated-example${i}`)
                                ?.classList.add('flipInX2')
                            document
                                .getElementById(`animated-example${i}`)
                                ?.addEventListener('animationend', () => {
                                    document
                                        .getElementById(`animated-example${i}`)
                                        ?.classList.remove('flipInX2')
                                })
                        }
                        let moveChildren: Array<CellModel> = []
                        list1.forEach((child) => {
                            if (child.parentId === moveChild?.id) {
                                moveChildren.push(child)
                            }
                        })
                        dispatch({
                            type: 'moveChild',
                            parent: moveChild,
                            children: moveChildren,
                        })
                        setChildShowPopover({
                            showPopover: false,
                            event: undefined,
                        })
                    }}
                    editChild={() => {
                        setShowAlert(true)
                    }}
                    deleteChild={async () => {
                        setPopup(true)
                    }}
                />
                <Popup
                    name="name"
                    isOpen={popup}
                    header="直下の要素も削除されますがよろしいですか？"
                    buttonText1="キャンセル"
                    buttonText2="削除"
                    showAlert={() => {
                        setPopup(false)
                    }}
                    processing={async () => {
                        for (let i = list1.length - 1; i >= 0; i--) {
                            if (selectedId === list1[i].id) {
                                list1.splice(i, 1)
                            }
                        }
                        await deleteChild(selectedId)
                        dispatch({
                            type: 'deleteChild',
                            list: counter.mListReducer.children,
                            delIndex: selectedId,
                        })
                        setChildShowPopover({
                            showPopover: false,
                            event: undefined,
                        })
                    }}
                />
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    cssClass="my-alert-class"
                    header={'編集'}
                    inputs={[
                        {
                            name: 'name',
                            value: name,
                            type: 'text',
                            attributes: {
                                maxlength: 35,
                            },
                        },
                    ]}
                    buttons={[
                        {
                            text: 'Cancel',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => {},
                        },
                        {
                            text: 'Ok',
                            handler: async (data) => {
                                list1[index].text = data.name
                                await editChild()
                            },
                        },
                    ]}
                />
            </IonGrid>
            <IonButton
                className="add-element"
                shape="round"
                mode="ios"
                disabled={counter.mListReducer.children.length >= 8}
                onClick={addChild}
            >
                <IonIcon slot="start" icon={add} />
                Add element
            </IonButton>
        </IonContent>
    )
}
export default Mandarat
