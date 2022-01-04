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
import { add, chevronBack, chevronForwardOutline, trash } from 'ionicons/icons'
import Mandart from '../components/Mandarat/Mandarat'
import './Home.scss'
import { CellModel } from '../models/CellModel'
import { Plugins } from '@capacitor/core'
import { useDispatch, useSelector } from 'react-redux'
import Popup from '../components/Popup/Popup'
const { Storage } = Plugins

let list1: Array<CellModel> = [];

const Home: React.FC = () => {
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
        console.log(counter)
        initialize();
    })

    const initialize = async () => {
        const allCellStr = await Storage.get({ key: 'allCell' })
        if (JSON.parse(allCellStr.value!)) {
            list1 = JSON.parse(allCellStr.value!)
        }
    }

    const addTopParent = async () => {
        const maxIdStr = await Storage.get({ key: 'maxId' })
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
            text: 'New',
        }
        list1.push(topParent)

        await Storage.set({
            key: 'allCell',
            value: JSON.stringify(list1),
        })
        dispatch({ type: 'ADD', parentId: 0, maxId: maxId })
        const listd1 = [...list]
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
        <IonPage className="ShufflePage-page">
            <IonToolbar className="list-toolbar" mode="ios">
                <IonTitle>HOME</IonTitle>
            </IonToolbar>
            <IonItem lines="none" className="list-search-item ion-no-padding">
                <IonSearchbar
                    className="list-search-bar ion-no-padding"
                    value={searchText}
                    onIonChange={(e) => setSearchText(e.detail.value!)}
                    type="text"
                ></IonSearchbar>
            </IonItem>
            <IonContent className="ShufflePage-content">
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
                <Mandart />
                <IonButton fill="clear" onClick={() => setShowModal(false)}>
                    <IonIcon slot="start" icon={chevronBack} />
                    Home
                </IonButton>
            </IonModal>
            <IonButton
                className="add-button"
                shape="round"
                mode="ios"
                onClick={addTopParent}
            >
                <IonIcon slot="start" icon={add} />
                Add Mandarat
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
                        handler: () => {},
                    },
                    {
                        text: 'Ok',
                        handler: async (data) => {
                            list1[index].text = data.name
                            dispatch({ type: 'CHANGE', list: list1 })
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

export default Home
