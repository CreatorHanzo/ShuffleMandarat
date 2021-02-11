import React, { useEffect, useState } from 'react'
import {
    IonSearchbar,
    IonPage,
    IonList,
    IonContent,
    IonFabButton,
    IonIcon,
    IonModal,
    IonButton,
    IonAlert,
    IonItem,
    IonLabel,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import { add, chevronForwardOutline, trash } from 'ionicons/icons'
import Mandart from '../components/Mandarat/Mandarat'
import './Tab1.scss'
import { CellModel } from '../models/CellModel'
import { Plugins } from '@capacitor/core'
import { useDispatch, useSelector } from 'react-redux'
import Popup from '../components/Popup/Popup'
const { Storage } = Plugins

let list1: Array<CellModel> = []

const Tab1: React.FC = () => {
    const [list, setList] = useState<Array<CellModel>>([])
    const [searchText, setSearchText] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [name, setName] = useState('')
    const [index, setIndex] = useState(0)
    const [popup, setPopup] = useState(false)
    const [selectedId, setSelectedId] = useState<number>()

    const counter = useSelector(
        (state: {
            listReducer: CellModel[]
            mListReducer: { parent: CellModel; children: Array<CellModel> }
        }) => state
    )
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('レンダリングした(ホーム)')
        initialize()
    })

    const initialize = async () => {
        const allCellStr = await Storage.get({ key: 'allCell' })

        if (JSON.parse(allCellStr.value!)) {
            list1 = JSON.parse(allCellStr.value!)
            console.log('list1', list1)
        }
    }

    const addTopParent = async () => {
        // 現状のmaxId+1を設定する
        const maxIdStr = await Storage.get({ key: 'maxId' })
        console.log('追加前のmaxId', JSON.parse(maxIdStr.value!))
        let maxId = 1
        if (JSON.parse(maxIdStr.value!)) {
            maxId = JSON.parse(maxIdStr.value!) + 1
        }
        await Storage.set({
            key: 'maxId',
            value: JSON.stringify(maxId),
        })

        // 追加ボタンが押されたときに、トップレベルの親を作成
        const topParent: CellModel = {
            parentId: 0,
            id: maxId,
            text: 'New Mandarat',
        }
        list1.push(topParent)

        await Storage.set({
            key: 'allCell',
            value: JSON.stringify(list1),
        })
        dispatch({ type: 'ADD', parentId: 0, maxId: maxId })
        const listd1 = [...list]
        console.log(listd1)
        setList(listd1)
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

    return (
        <IonPage className="tab1-page">
            <IonToolbar className="list-toolbar" mode="ios">
                <IonTitle>HOME</IonTitle>
            </IonToolbar>
            <IonItem lines="none" className="list-search-item ion-no-padding">
                <IonSearchbar
                    className="list-search-bar ion-no-padding"
                    value={searchText}
                    onIonChange={(e) => setSearchText(e.detail.value!)}
                    type="tel"
                ></IonSearchbar>
            </IonItem>

            <IonContent className="tab1-content">
                <IonList>
                    {
                        // eslint-disable-next-line array-callback-return
                        list1.map((value, i) => {
                            const regexp = new RegExp(searchText, 'i')
                            if (regexp.test(value.text)) {
                                return (
                                    <IonItemSliding key={i.toString()}>
                                        <IonItemOptions side="end">
                                            <IonItemOption
                                                color="danger"
                                                onClick={async () => {
                                                    setSelectedId(value.id)
                                                    setPopup(true)
                                                }}
                                            >
                                                <IonIcon
                                                    slot="icon-only"
                                                    icon={trash}
                                                />
                                            </IonItemOption>
                                        </IonItemOptions>
                                        <IonItem className="yoso-item">
                                            <IonLabel
                                                key={i.toString()}
                                                onClick={() => {
                                                    setName(value.text)
                                                    setIndex(i)
                                                    setShowAlert(true)
                                                }}
                                            >
                                                {value.text}
                                            </IonLabel>
                                            <IonFabButton
                                                size="small"
                                                className="item-fab-button"
                                                onClick={() => {
                                                    let children1: Array<CellModel> = []
                                                    list1.forEach((child) => {
                                                        if (
                                                            child.parentId ===
                                                            value.id
                                                        ) {
                                                            children1.push(
                                                                child
                                                            )
                                                        }
                                                    })
                                                    dispatch({
                                                        type: 'moveChild',
                                                        parent: value,
                                                        children: children1,
                                                    })
                                                    console.log(
                                                        '子要素へ移動',
                                                        counter.listReducer
                                                    )
                                                    setShowModal(true)
                                                }}
                                            >
                                                <IonIcon
                                                    icon={chevronForwardOutline}
                                                />
                                            </IonFabButton>
                                        </IonItem>
                                    </IonItemSliding>
                                )
                            }
                        })
                    }
                </IonList>
                <IonItem lines="none" />
            </IonContent>
            <IonModal
                isOpen={showModal}
                cssClass="my-custom-class"
                onDidDismiss={() => setShowModal(false)}
            >
                {/* <CustomMandarat parent={parent} list={children} /> */}
                <Mandart />
                <IonButton fill="clear" onClick={() => setShowModal(false)}>
                    Back Home
                </IonButton>
            </IonModal>
            <IonButton
                className="add-button"
                shape="round"
                mode="ios"
                onClick={addTopParent}
            >
                <IonIcon slot="start" icon={add} />
                Add new Mandarat
            </IonButton>
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
                    console.log('削除')
                }}
            />
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                cssClass="my-class"
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
                        handler: () => {
                            console.log('Confirm Cancel')
                        },
                    },
                    {
                        text: 'Ok',
                        handler: async (data) => {
                            list1[index].text = data.name
                            // setList(list1)
                            dispatch({ type: 'CHANGE', list: list1 })
                            console.log('変更後', counter.mListReducer.children)
                            await Storage.set({
                                key: 'allCell',
                                value: JSON.stringify(list1),
                            })
                        },
                    },
                ]}
            />
        </IonPage>
    )
}

export default Tab1