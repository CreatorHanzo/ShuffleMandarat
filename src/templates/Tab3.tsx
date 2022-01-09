import React, { useState } from 'react'
import {
    IonPage,
    IonItem,
    IonContent,
    IonFabButton,
    IonIcon,
    IonItemOption,
    IonItemOptions,
    IonItemSliding,
    IonLabel,
    IonList,
    IonSearchbar,
    IonTitle,
    IonToolbar,
} from '@ionic/react'
import { trash, chevronForwardOutline } from 'ionicons/icons'
import { CellModel } from '../models/CellModel'

const Tab3: React.FC = () => {
    const [list, setList] = useState<Array<CellModel>>([])
    const [searchText, setSearchText] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [name, setName] = useState('')
    const [index, setIndex] = useState(0)
    const [popup, setPopup] = useState(false)
    const [selectedId, setSelectedId] = useState<number>()
    const list1: Array<CellModel> = [
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
        </IonPage>
    )
}

export default Tab3
