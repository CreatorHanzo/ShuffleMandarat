import React, { useEffect, useState } from 'react'
import {
    IonSearchbar,
    IonPage,
    IonList,
    IonContent,
    IonFab,
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
    IonHeader,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import {
    add,
    chevronForwardOutline,
    removeOutline,
    trash,
} from 'ionicons/icons'
import CellList from '../components/CellList/CellList'
import Mandart from '../components/Mandarat/Mandarat'
import './Tab1.scss'
import { CellModel } from '../models/CellModel'
import { Plugins } from '@capacitor/core'
import { useDispatch, useSelector } from 'react-redux'
const { Storage } = Plugins

let list1: Array<CellModel> = []

const Tab1: React.FC = () => {
    const [list, setList] = useState<Array<CellModel>>([])
    const [searchText, setSearchText] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [children, setChildren] = useState<Array<CellModel>>([])
    const [showAlert, setShowAlert] = useState(false)
    const [name, setName] = useState('')
    const [index, setIndex] = useState(0)
    const [parent, setParent] = useState<CellModel>(list1[0])

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
            text: '新しい要素',
        }
        list1.push(topParent)

        await Storage.set({
            key: 'allCell',
            value: JSON.stringify(list1),
        })
        dispatch({ type: 'ADD', parentId: 0, maxId: maxId })
        // list1.push({ id: maxId, text: 'a' })
        const listd1 = [...list]
        console.log(listd1)
        setList(listd1)
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
                                                    dispatch({
                                                        type: 'DELETE',
                                                        list: list1,
                                                        delIndex: i,
                                                    })
                                                    for (
                                                        let i = 0;
                                                        i < list1.length;
                                                        i++
                                                    ) {
                                                        if (
                                                            value.id ===
                                                            list1[i].id
                                                        ) {
                                                            list1.splice(i, 1)
                                                        }
                                                    }
                                                    await Storage.set({
                                                        key: 'allCell',
                                                        value: JSON.stringify(
                                                            list1
                                                        ),
                                                    })
                                                    setList(list1)
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
                                                    setParent(value)
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
                                                    setChildren(children1)
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
